# PowerShell script to update n8n to the latest version
# Usage: .\update-n8n.ps1

Write-Host "🔄 Updating n8n to latest version..." -ForegroundColor Green

# Pull the latest n8n image
Write-Host "📥 Pulling latest n8n image..."
docker-compose pull n8n

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pulled latest n8n image" -ForegroundColor Green
    
    # Restart n8n service with new image
    Write-Host "🔄 Restarting n8n service..."
    docker-compose up -d n8n
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ n8n updated and restarted successfully!" -ForegroundColor Green
        Write-Host "🌐 Access n8n at: http://localhost:5678" -ForegroundColor Cyan
        
        # Show the new version
        Write-Host "📋 Checking n8n version..."
        docker-compose exec n8n n8n --version
    } else {
        Write-Host "❌ Failed to restart n8n service" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Failed to pull latest n8n image" -ForegroundColor Red
}

Write-Host "`n🔍 Current container status:"
docker-compose ps