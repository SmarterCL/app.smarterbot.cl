#!/bin/bash
# Script to generate secure secrets for SmarterOS deployment

set -e

echo "Generating secure secrets for SmarterOS..."

# Create secrets directory if it doesn't exist
mkdir -p ./secrets

# Generate secure random passwords
POSTGRES_PASSWORD=$(openssl rand -hex 32)
N8N_PASSWORD=$(openssl rand -hex 32)
JWT_SECRET=$(openssl rand -hex 64)

# Generate database URL
DB_USERNAME="postgres"
DB_NAME="postgres"
DB_HOST="db"
DB_PORT="5432"
DATABASE_URL="postgresql://${DB_USERNAME}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

# Write secrets to files
echo "$POSTGRES_PASSWORD" > ./secrets/postgres_password
echo "$N8N_PASSWORD" > ./secrets/n8n_password
echo "$JWT_SECRET" > ./secrets/jwt_secret
echo "$DATABASE_URL" > ./secrets/database_url

# Set secure permissions
chmod 600 ./secrets/*

echo "Generated secrets:"
echo "- PostgreSQL password: Generated and saved to ./secrets/postgres_password"
echo "- n8n password: Generated and saved to ./secrets/n8n_password" 
echo "- JWT secret: Generated and saved to ./secrets/jwt_secret"
echo "- Database URL: Generated and saved to ./secrets/database_url"

echo ""
echo "To use these secrets with Docker:"
echo "docker-compose --secrets-dir ./secrets up"
echo ""
echo "For environment variables in development, create a .env.local file with:"
echo "FLOW_API_KEY=your_real_flow_api_key"
echo "FLOW_SECRET_KEY=your_real_flow_secret_key"
echo "MAILGUN_API_KEY=your_real_mailgun_api_key"
echo ""

echo "Secret generation completed!"