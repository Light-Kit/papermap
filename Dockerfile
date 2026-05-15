# papermap — local web view
FROM python:3.12-slim

WORKDIR /app

# Install package + deps in one layer; uses pyproject + setuptools.
COPY pyproject.toml README.md LICENSE ./
COPY papermap ./papermap
RUN pip install --no-cache-dir .

# Bake the example corpora into the image so the deployed site has content.
# Mount a volume at /corpora to add your own corpora at runtime.
COPY examples /corpora
VOLUME ["/corpora"]
EXPOSE 8000

CMD ["papermap", "serve", "/corpora", "--host", "0.0.0.0", "--port", "8000", "--no-browser"]
