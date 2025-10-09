# Personal Tools Website with n8n

A dockerized personal website featuring a collection of mini tools and n8n workflow automation platform.

## 🏃‍♂️ Quick Start for Local Development

**TL;DR - Just want to run it locally?**

1. Make sure Docker Desktop is running
2. Clone this repo and navigate to the folder
3. Run: `docker-compose -f docker-compose.prod.yml up --build -d`
4. Access:
   - Personal Tools: http://localhost:3000
   - n8n Workflows: http://localhost:5678 (admin/password)

That's it! The main `docker-compose.yml` is for production with SSL certificates.

## 🚀 Features

### Mini Tools Collection
- **JSON Beautifier/Minifier** - Format and compress JSON data with syntax validation
- **Text Utilities** - Case conversion, word counting, character analysis
- **URL Encoder/Decoder** - URL encoding/decoding utilities
- **Responsive Design** - Works on desktop and mobile devices

### n8n Workflow Automation
- Full n8n workflow automation platform
- Visual workflow builder
- 200+ integrations available
- Persistent data storage
- Web-based interface

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
  - Download from: https://www.docker.com/products/docker-desktop
  - Minimum version: Docker 20.10+
- **Docker Compose** (usually included with Docker Desktop)
- **Git** (optional, for cloning)

### Verify Installation
```bash
# Check Docker version
docker --version

# Check Docker Compose version
docker-compose --version

# Verify Docker is running
docker info
```

## 🛠️ Setup Instructions

### Local Development (Recommended)

The main `docker-compose.yml` is configured for production with SSL certificates. For local development, use one of these approaches:

#### Option 1: Simple Direct Access (Easiest)
```bash
# Uses docker-compose.prod.yml without nginx proxy
docker-compose -f docker-compose.prod.yml up --build -d
```
**Access URLs:**
- Personal Tools: http://localhost:3000
- n8n Workflows: http://localhost:5678

#### Option 2: Local Development with Nginx
```bash
# Uses docker-compose.local.yml with local nginx config
docker-compose -f docker-compose.local.yml up --build -d
```
**Access URLs:**
- Personal Tools: http://localhost
- n8n Workflows: http://localhost:5678

#### Option 3: Minimal Setup (No Nginx)
```bash
# Uses docker-compose.dev.yml - direct container access
docker-compose -f docker-compose.dev.yml up --build -d
```
**Access URLs:**
- Personal Tools: http://localhost:3000
- n8n Workflows: http://localhost:5678

### Production Deployment

1. **Clone or download the project files**
   ```bash
   git clone <your-repo-url>
   cd personal-tools-website
   ```

2. **Start Docker Desktop**
   - Launch Docker Desktop application
   - Wait for it to fully start (Docker icon appears in system tray)

3. **Build and run all services (production)**
   ```bash
   docker-compose up --build -d
   ```
   > ⚠️ **Note:** This requires SSL certificates and domain configuration

4. **Verify services are running**
   ```bash
   docker-compose ps
   ```

### Quick Start Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-tools-website
   ```

2. **Start Docker Desktop**
   - Launch Docker Desktop and wait for it to fully start

3. **Choose your setup method**
   ```bash
   # For local development (recommended)
   docker-compose -f docker-compose.prod.yml up --build -d
   
   # OR for production (requires SSL setup)
   docker-compose up --build -d
   ```

4. **Verify everything is running**
   ```bash
   docker-compose ps
   ```

## 🎯 Usage

### Accessing Applications

#### Local Development URLs

| Setup Method | Personal Tools | n8n Workflows | Notes |
|-------------|---------------|---------------|-------|
| **Option 1** (prod.yml) | http://localhost:3000 | http://localhost:5678 | Direct access, no nginx |
| **Option 2** (local.yml) | http://localhost | http://localhost:5678 | With nginx proxy |
| **Option 3** (dev.yml) | http://localhost:3000 | http://localhost:5678 | Minimal setup |

#### Production URLs
| Service | URL | Purpose |
|---------|-----|---------|
| Personal Tools | https://lihsheng.space | Main website with mini tools |
| n8n Workflows | https://n8n.lihsheng.space | Workflow automation platform |

### n8n Default Credentials
- **Username:** `admin`
- **Password:** `password`

> ⚠️ **Security Note:** Change these credentials in production by modifying the environment variables in `docker-compose.yml`

### Using the Tools

1. **JSON Tools**
   - Paste JSON in the input area
   - Click "Beautify" to format with proper indentation
   - Click "Minify" to compress JSON
   - Error messages appear for invalid JSON

2. **Text Tools**
   - Enter text in the input area
   - Convert to UPPERCASE or lowercase
   - Get word count, character count statistics

3. **URL Tools**
   - Enter URLs or text to encode/decode
   - Handles special characters and spaces

## 🔧 Docker Commands Reference

### Local Development Commands
```bash
# Start local development (recommended)
docker-compose -f docker-compose.prod.yml up --build -d

# Start with nginx proxy
docker-compose -f docker-compose.local.yml up --build -d

# Start minimal setup
docker-compose -f docker-compose.dev.yml up --build -d

# View running containers
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs

# Stop services
docker-compose -f docker-compose.prod.yml down
```

### Production Commands
```bash
# Start production services
docker-compose up --build -d

# View running containers
docker-compose ps

# View logs
docker-compose logs

# View logs for specific service
docker-compose logs website
docker-compose logs n8n
docker-compose logs nginx

# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes n8n data)
docker-compose down -v
```

### Development Commands
```bash
# Rebuild specific service
docker-compose build website

# Restart specific service
docker-compose restart website

# Execute command in running container
docker-compose exec website sh
docker-compose exec n8n sh

# View container resource usage
docker stats
```

### Troubleshooting Commands
```bash
# Check container health
docker-compose ps

# View detailed logs
docker-compose logs -f

# Restart all services
docker-compose restart

# Clean rebuild (removes cached layers)
docker-compose build --no-cache

# Remove unused Docker resources
docker system prune
```

## 🏗️ Architecture

### Services Overview
- **Website Container**: Node.js/Express server serving the tools interface
- **n8n Container**: Workflow automation platform with persistent storage
- **Nginx Container**: Reverse proxy routing traffic between services

### Port Configuration
- **Port 80**: Nginx reverse proxy (main entry point)
- **Port 3000**: Website direct access
- **Port 5678**: n8n direct access

### Data Persistence
- n8n workflows and data are stored in Docker volume `n8n_data`
- Website files are mounted for development (hot reload)

## 🔧 Development

### Adding New Tools

1. **Backend API** (`website/server.js`)
   ```javascript
   app.post('/api/new-tool/action', (req, res) => {
     // Your tool logic here
     res.json({ result: processedData });
   });
   ```

2. **Frontend UI** (`website/public/index.html`)
   ```html
   <div id="new-tool" class="tool-section">
     <!-- Your tool interface -->
   </div>
   ```

3. **Styling** (`website/public/styles.css`)
   ```css
   #new-tool {
     /* Your tool styles */
   }
   ```

4. **JavaScript** (`website/public/script.js`)
   ```javascript
   async function newToolFunction() {
     // Your tool functionality
   }
   ```

### Customizing n8n

Modify environment variables in `docker-compose.yml`:
```yaml
environment:
  - N8N_BASIC_AUTH_USER=your_username
  - N8N_BASIC_AUTH_PASSWORD=your_secure_password
  - N8N_HOST=your-domain.com
  - N8N_PROTOCOL=https
```

### File Structure
```
personal-tools-website/
├── docker-compose.yml          # Main orchestration file
├── README.md                   # This documentation
├── website/                    # Personal tools website
│   ├── Dockerfile             # Website container definition
│   ├── package.json           # Node.js dependencies
│   ├── server.js              # Express backend server
│   └── public/                # Frontend static files
│       ├── index.html         # Main HTML interface
│       ├── styles.css         # CSS styling
│       └── script.js          # JavaScript functionality
└── nginx/                     # Reverse proxy configuration
    └── nginx.conf             # Nginx routing rules
```

## 🚨 Troubleshooting

### Common Local Development Issues

1. **"nginx: [emerg] cannot load certificate" or SSL errors**
   ```
   Problem: Using production docker-compose.yml locally
   Solution: Use docker-compose -f docker-compose.prod.yml up -d instead
   ```

2. **Port already in use (80, 3000, or 5678)**
   ```
   Error: Port is already allocated
   Solution: Stop other services or use different compose file
   Windows: netstat -ano | findstr :80
   Linux/Mac: lsof -i :80
   ```

3. **Docker Desktop not running**
   ```
   Error: Cannot connect to Docker daemon
   Solution: Start Docker Desktop and wait for it to fully load
   ```

4. **n8n not accessible**
   ```
   Check: docker-compose -f docker-compose.prod.yml logs n8n
   Solution: Wait for n8n to fully initialize (can take 30-60 seconds)
   ```

5. **Website not loading**
   ```
   Check: docker-compose -f docker-compose.prod.yml ps
   Solution: Ensure all containers are running and healthy
   ```

### Configuration Files Explained

- `docker-compose.yml` - Production setup with SSL and domain names
- `docker-compose.prod.yml` - Simple setup, perfect for local development
- `docker-compose.local.yml` - Local development with nginx proxy
- `docker-compose.dev.yml` - Minimal setup without nginx

### Getting Help
```bash
# Check service status
docker-compose ps

# View all logs
docker-compose logs

# Check Docker system info
docker info

# Test connectivity
curl http://localhost
curl http://localhost:5678
```

## 🔒 Security Considerations

### Production Deployment
- Change default n8n credentials
- Use HTTPS with SSL certificates
- Configure firewall rules
- Regular security updates
- Backup n8n data volume

### Environment Variables
Create `.env` file for sensitive data:
```env
N8N_BASIC_AUTH_USER=your_secure_username
N8N_BASIC_AUTH_PASSWORD=your_secure_password
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).