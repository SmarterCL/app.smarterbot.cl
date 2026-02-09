#!/bin/bash

# Create secrets directory if it doesn't exist
mkdir -p secrets

# Generate strong passwords/secrets if they don't exist
if [ ! -f secrets/postgres_password ]; then
  echo "$(openssl rand -base64 16)" > secrets/postgres_password
  echo "Generated new postgres_password"
fi

if [ ! -f secrets/n8n_password ]; then
  echo "$(openssl rand -base64 16)" > secrets/n8n_password
  echo "Generated new n8n_password"
fi

if [ ! -f secrets/jwt_secret ]; then
  echo "$(openssl rand -base64 32)" > secrets/jwt_secret
  echo "Generated new jwt_secret"
fi

if [ ! -f secrets/database_url ]; then
  DB_PASS=$(cat secrets/postgres_password)
  echo "postgresql://postgres:${DB_PASS}@db:5432/postgres" > secrets/database_url
  echo "Generated new database_url"
fi

chmod 600 secrets/*
echo "Security: Secrets initialized and secured."
