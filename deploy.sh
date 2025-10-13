#!/bin/bash

# Build the static export
npm run build

# Create deployment package
tar -czf dev-tools.tar.gz out/

echo "Static files built and packaged as dev-tools.tar.gz"
echo ""
echo "To deploy to EC2:"
echo "1. Upload dev-tools.tar.gz to your EC2 instance"
echo "2. Extract: tar -xzf dev-tools.tar.gz"
echo "3. Serve with nginx or apache pointing to the 'out' directory"