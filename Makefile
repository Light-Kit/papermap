# papermap — common developer tasks
.PHONY: help install dev test serve docker-build docker-up docker-down clean

help:
	@echo "Targets:"
	@echo "  install      pip install ."
	@echo "  dev          pip install -e .[dev]"
	@echo "  test         pytest"
	@echo "  serve        papermap serve examples"
	@echo "  docker-build docker build -t papermap:dev ."
	@echo "  docker-up    docker compose up -d --build"
	@echo "  docker-down  docker compose down"
	@echo "  clean        remove build / cache artifacts"

install:
	pip install .

dev:
	pip install -e ".[dev]"

test:
	pytest -q

serve:
	papermap serve examples

docker-build:
	docker build -t papermap:dev .

docker-up:
	docker compose up -d --build

docker-down:
	docker compose down

clean:
	rm -rf build dist *.egg-info .pytest_cache .ruff_cache .mypy_cache
	find . -type d -name __pycache__ -exec rm -rf {} +
