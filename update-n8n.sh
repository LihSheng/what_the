#!/bin/bash
# Bash script to update n8n to the latest version
# Usage: ./update-n8n.sh

echo "🔄 Updating n8n to latest version..."

# Pull the latest n8n image
echo "📥 Pulling latest n8n image..."
docker-compose pull n8n

if [ $? -eq 0 ]; then
    echo "✅ Successfully pulled latest n8n image"
    
    # Restart n8n service with new image
    echo "🔄 Restarting n8n service..."
    docker-compose up -d n8n
    
    if [ $? -eq 0 ]; then
        echo "✅ n8n updated and restarted successfully!"
        echo "🌐 Access n8n at: http://localhost:5678"
        
        # Show the new version
        echo "📋 Checking n8n version..."
        docker-compose exec n8n n8n --version
    else
        echo "❌ Failed to restart n8n service"
    fi
else
    echo "❌ Failed to pull latest n8n image"
fi

echo ""
echo "🔍 Current container status:"
docker-compose ps