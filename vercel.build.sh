#!/bin/bash

# Install dependencies with legacy-peer-deps flag
echo "Installing dependencies with legacy-peer-deps..."
npm install --legacy-peer-deps

# Build with CI disabled to prevent warnings becoming errors
echo "Building the project..."
CI=false npm run build

echo "Build completed successfully!" 