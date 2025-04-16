# Stage 1: Build frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Backend (PyTorch base)
FROM pytorch/pytorch:2.1.0-cuda12.1-cudnn8-runtime AS backend
WORKDIR /app

# Create non-root user for security
RUN adduser --disabled-password --gecos "" appuser

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
    && pip install uvicorn sse-starlette

# Copy application code
COPY --chown=appuser:appuser main.py inference.py ./

# Copy frontend build from previous stage
COPY --from=frontend-build --chown=appuser:appuser /app/frontend/dist /app/static

# Set environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PORT=8000

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:${PORT}/ || exit 1

EXPOSE ${PORT}
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
