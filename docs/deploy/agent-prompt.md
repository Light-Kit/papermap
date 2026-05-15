# Deploying papermap

You are deploying the Light-Kit/papermap server, a small Flask app that serves
a browser UI over a directory of YAML corpora.

## Repo

- URL: <https://github.com/Light-Kit/papermap>
- Default branch: `main`
- Container build is the only supported deployment path. Do not run setuptools
  install on the host.

## What the container exposes

- TCP port `8000`.
- Endpoint `GET /healthz` → `200 OK`, body `ok`. Use this as the platform health probe.
- Endpoint `GET /` → the multi-view UI shell (Stats, Browse, Map, Table, Topics & People, Timeline).
- Endpoint `GET /api/corpora` → JSON listing of the corpora directory.
- Endpoint `GET /api/state/<filename>` → full parsed corpus as JSON.
- Endpoint `GET /download/<filename>` → standalone HTML rendering of the map.
- The container expects a directory of YAML corpora mounted at `/corpora`
  (read-only). The shipped `docker-compose.yml` mounts `./examples` there.

## Image build

```bash
docker build -t papermap:latest .
```

The Dockerfile is `python:3.12-slim` based; final image ~150 MB.

## Runtime

```bash
docker run --rm -p 8000:8000 -v /path/to/corpora:/corpora:ro papermap:latest
```

Or via compose:

```bash
docker compose up -d --build
```

## Recommended hosting

In order of preference for a first deploy:

1. **Fly.io** — free TLS, deploy from Dockerfile, persistent volume for corpora.
2. **Railway** — easiest Dockerfile auto-detect; ~$5/mo.
3. **Render** — same as Railway, slightly cheaper at the entry tier.
4. **Cloudflare Containers** — pair with R2 if you want the corpora directory in object storage.

Use Fly.io unless the user has another preference. Fly.io setup:

```bash
flyctl launch --dockerfile Dockerfile --name lightkit-papermap
flyctl volumes create papermap_corpora --size 1
flyctl deploy
```

Mount the volume at `/corpora` in `fly.toml`. The corpora files come from the
user — coordinate to upload them via `flyctl ssh sftp shell` or commit them
into a small data branch.

## Optional environment

| Variable          | Default       | Effect                                  |
|-------------------|---------------|-----------------------------------------|
| `PAPERMAP_TITLE`  | `papermap`    | Sets the `<title>` of the page          |

Set via your platform's env-var UI; the app reads them via `os.environ`.

## Domain

If a domain is available under the Light-Kit project, attach it:

- Preferred: `papermap.lightkit.dev`
- Fallback: the platform's auto-issued `*.fly.dev` / `*.up.railway.app` URL.

## Verification (you must do this before reporting success)

After deployment, verify:

```bash
curl -fsS https://<live-url>/healthz
# expected: ok

curl -fsS https://<live-url>/ | head -c 200
# expected: HTML with <title>papermap</title>

curl -fsS https://<live-url>/api/corpora
# expected: JSON array; at least one corpus
```

Report the live URL and the three curl outputs back to the user.

## Constraints

- Read-only viewer. Do not expose any write endpoint, do not run as root, do
  not configure auth (none is needed; there is no mutable state).
- Do not bundle the corpora directory into the image. It is always a mount.
- Logs are stdout; let the platform aggregate them. No log files on disk.

## If something goes wrong

- If `/healthz` returns 500: the app failed to start. Inspect logs for
  ImportError on `flask` / `plotly` / `pyyaml`. Rebuild the image.
- If `/api/corpora` returns `[]`: the mount is empty or the path is wrong.
  `flyctl ssh console` and `ls /corpora` to verify.
- If a corpus shows `invalid:` in the sidebar: that's data, not infra — leave
  it for the user, don't try to fix the YAML yourself.

## Alternative: static-site deploy

If the user has a single corpus and doesn't need the live picker, the
`papermap export` command emits a fully static folder:

```bash
papermap export examples/fm-to-virtual-cells.yaml -o site/
```

That folder can be uploaded to GitHub Pages, Cloudflare Pages, Netlify, or
any static host — no container required. Use this path if the user explicitly
asks for static hosting; otherwise default to the Fly.io live-server path.
