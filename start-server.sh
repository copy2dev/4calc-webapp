#!/bin/bash
echo "Starting 4Calc Development Server..."
echo "======================================="

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null

# Wait a moment
sleep 2

# Start the development server
echo "Starting server on port 3000..."
npm run dev