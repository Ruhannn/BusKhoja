FROM python:3.11-slim

WORKDIR /app


COPY pyproject.toml uv.lock ./
RUN pip install uv


COPY . .

EXPOSE 8000


CMD ["uv", "run", "main.py"]
