#!/bin/bash

echo "Starting UNF Career Hub V2 Backend Server..."
echo "=================================="

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Warning: .env file not found. Using default configuration."
    echo "Please copy .env.example to .env and configure your settings."
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start the server
echo "Starting server on port 3001..."
echo "Access the application at: http://localhost:3001"
echo "API health check: http://localhost:3001/api/health"
echo "Press Ctrl+C to stop the server"
echo "=================================="

npm start