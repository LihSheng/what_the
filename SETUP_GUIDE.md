# Platform-Specific Setup Guide

This guide provides detailed setup instructions for different operating systems.

## 🪟 Windows Setup

### Prerequisites Installation

1. **Install Docker Desktop for Windows**
   ```powershell
   # Download from: https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe
   # Or use winget (Windows Package Manager)
   winget install Docker.DockerDesktop
   ```

2. **Enable WSL 2 (if not already enabled)**
   ```powershell
   # Run as Administrator
   wsl --install
   # Restart computer if prompted
   ```

3. **Verify Installation**
   ```powershell
   docker --version
   docker-compose --version
   ```

### Running the Project

1. **Open PowerShell or Command Prompt**
   ```powershell
   # Navigate to project directory
   cd C:\path\to\your\project
   
   # Start Docker Desktop first (wait for it to fully load)
   # Then run:
   docker-compose up --build -d
   ```

2. **Check Status**
   ```powershell
   docker-compose ps
   ```

### Windows-Specific Commands
```powershell
# View logs
docker-compose logs

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Clean up
docker system prune -f
```

## 🐧 Linux Setup

### Prerequisites Installation

#### Ubuntu/Debian
```bash
# Update package index
sudo apt update

# Install Docker
sudo apt install docker.io docker-compose

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
newgrp docker

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker
```

#### CentOS/RHEL/Fedora
```bash
# Install Docker
sudo dnf install docker docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

#### Arch Linux
```bash
# Install Docker
sudo pacman -S docker docker-compose

# Start Docker service
sudo systemctl start docker
sudo systemctl enable docker

# Add user to docker group
sudo usermod -aG docker $USER
newgrp docker
```

### Running the Project

```bash
# Clone and navigate
git clone <your-repo>
cd personal-tools-website

# Build and run
docker-compose up --build -d

# Check status
docker-compose ps
```

## 🍎 macOS Setup

### Prerequisites Installation

#### Method 1: Docker Desktop (Recommended)
```bash
# Download from: https://desktop.docker.com/mac/main/amd64/Docker.dmg
# Or use Homebrew
brew install --cask docker
```

#### Method 2: Homebrew (CLI only)
```bash
# Install Docker and Docker Compose
brew install docker docker-compose

# Install Docker Machine (for VM management)
brew install docker-machine
```

### Running the Project

```bash
# Open Terminal
cd /path/to/your/project

# Start Docker Desktop (if using GUI version)
# Then run:
docker-compose up --build -d

# Check status
docker-compose ps
```

## 🔧 Build Commands Reference

### Complete Build Process

1. **Clean Build (removes all cached layers)**
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

2. **Rebuild Specific Service**
   ```bash
   # Rebuild only the website
   docker-compose build --no-cache website
   docker-compose up -d website
   ```

3. **Force Recreate Containers**
   ```bash
   docker-compose up --build --force-recreate -d
   ```

### Image Management

```bash
# List all images
docker images

# Remove unused images
docker image prune

# Remove specific image
docker rmi what_the-website

# Pull latest base images
docker-compose pull
```

### Volume Management

```bash
# List volumes
docker volume ls

# Inspect n8n data volume
docker volume inspect what_the_n8n_data

# Backup n8n data
docker run --rm -v what_the_n8n_data:/data -v $(pwd):/backup alpine tar czf /backup/n8n-backup.tar.gz -C /data .

# Restore n8n data
docker run --rm -v what_the_n8n_data:/data -v $(pwd):/backup alpine tar xzf /backup/n8n-backup.tar.gz -C /data
```

## 🐳 Docker Compose Commands

### Service Management
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d website

# Stop all services
docker-compose down

# Stop specific service
docker-compose stop website

# Restart services
docker-compose restart

# Remove services and networks
docker-compose down --remove-orphans
```

### Monitoring and Debugging
```bash
# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f website
docker-compose logs -f n8n
docker-compose logs -f nginx

# Execute commands in running container
docker-compose exec website sh
docker-compose exec website npm install new-package

# View resource usage
docker stats $(docker-compose ps -q)
```

### Development Workflow
```bash
# 1. Make code changes
# 2. Rebuild and restart
docker-compose build website
docker-compose up -d website

# Or rebuild everything
docker-compose up --build -d

# 3. View logs to check for errors
docker-compose logs -f website
```

## 🚀 Production Deployment

### Environment Configuration
```bash
# Create production environment file
cat > .env << EOF
NODE_ENV=production
N8N_BASIC_AUTH_USER=your_secure_username
N8N_BASIC_AUTH_PASSWORD=your_secure_password
N8N_HOST=your-domain.com
N8N_PROTOCOL=https
EOF
```

### Production Docker Compose
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  website:
    build: ./website
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  n8n:
    image: n8nio/n8n:latest
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=${N8N_BASIC_AUTH_USER}
      - N8N_BASIC_AUTH_PASSWORD=${N8N_BASIC_AUTH_PASSWORD}
      - N8N_HOST=${N8N_HOST}
      - N8N_PROTOCOL=${N8N_PROTOCOL}
    restart: unless-stopped
```

### Production Commands
```bash
# Deploy to production
docker-compose -f docker-compose.prod.yml up --build -d

# Update production deployment
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 🔍 Troubleshooting by Platform

### Windows Issues
```powershell
# WSL 2 not enabled
wsl --set-default-version 2

# Docker Desktop not starting
# Check Windows features: Hyper-V, WSL 2
# Restart Docker Desktop as Administrator

# Port conflicts
netstat -ano | findstr :80
# Kill process using port 80
taskkill /PID <process_id> /F
```

### Linux Issues
```bash
# Permission denied
sudo chmod 666 /var/run/docker.sock
# Or add user to docker group
sudo usermod -aG docker $USER

# Service not starting
sudo systemctl status docker
sudo systemctl restart docker

# Port conflicts
sudo netstat -tulpn | grep :80
sudo fuser -k 80/tcp
```

### macOS Issues
```bash
# Docker Desktop not starting
# Check System Preferences > Security & Privacy
# Allow Docker Desktop

# Port conflicts
lsof -i :80
kill -9 <process_id>

# Permission issues
sudo chown -R $(whoami) ~/.docker
```

## 📊 Performance Optimization

### Resource Limits
```yaml
# Add to docker-compose.yml services
deploy:
  resources:
    limits:
      memory: 512M
      cpus: '0.5'
    reservations:
      memory: 256M
      cpus: '0.25'
```

### Monitoring
```bash
# Monitor resource usage
docker stats

# Monitor specific containers
docker stats what_the-website-1 what_the-n8n-1

# System resource usage
docker system df
```

This comprehensive setup guide should help users on any platform get your personal tools website with n8n up and running successfully!