# papermap — local web view
FROM python:3.12-slim

WORKDIR /app

# Install package + deps in one layer; uses pyproject + setuptools.
COPY pyproject.toml README.md LICENSE ./
COPY papermap ./papermap
RUN pip install --no-cache-dir .

# Default mount point for user corpora.
VOLUME ["/corpora"]
EXPOSE 8000

CMD ["papermap", "serve", "/corpora", "--host", "0.0.0.0", "--port", "8000", "--no-browser"]
