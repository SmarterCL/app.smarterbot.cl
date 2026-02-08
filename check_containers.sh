#!/bin/bash

echo "Checking Docker containers for SmarterOS..."
echo "=========================================="

echo ""
echo "1. Checking running containers:"
docker ps

echo ""
echo "2. Looking specifically for SmarterOS containers:"
docker ps | grep smarteros || echo "No SmarterOS containers are currently running"

echo ""
echo "3. Checking all containers (including stopped ones):"
docker ps -a | grep smarteros

echo ""
echo "4. If the orchestrator is not running, checking its logs:"
docker logs smarteros-orchestrator 2>&1 | tail -20 || echo "Could not find logs for smarteros-orchestrator (container may not exist)"

echo ""
echo "5. Checking if port 8000 is in use on the host:"
lsof -i :8000 || echo "Port 8000 is not in use on the host"

echo ""
echo "6. Rebuilding and restarting the Docker setup (force rebuild):"
echo "Stopping all SmarterOS containers..."
docker-compose down

echo ""
echo "Starting all containers with force build..."
docker-compose up -d --build

echo ""
echo "7. Waiting 10 seconds for services to start..."
sleep 10

echo ""
echo "8. Checking container status again:"
docker ps | grep smarteros

echo ""
echo "9. Checking the orchestrator logs after restart:"
docker logs smarteros-orchestrator 2>&1 | tail -10 || echo "Could not retrieve orchestrator logs"

echo ""
echo "Check complete. Please share any error messages you see above."