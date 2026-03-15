FROM python:3.14-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ./app ./app
COPY ./bin/google-stitch-mcp.py /app/google-stitch-mcp.py

EXPOSE 8000

CMD ["python", "google-stitch-mcp.py"]
