# Personal Tools Website with n8n

A dockerized personal website featuring a collection of mini tools and n8n workflow automation platform.

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

### Method 1: Quick Start (Recommended)

1. **Clone or download the project files**
   ```bash
   git clone <your-repo-url>
   cd personal-tools-website
   ```

2. **Start Docker Desktop**
   - Launch Docker Desktop application
   - Wait for it to fully start (Docker icon appears in system tray)

3. **Build and run all services**
   ```bash
   docker-compose up --build -d
   ```

4. **Verify services are running**
   ```bash
   docker-compose ps
   ```

5. **Access your applications**
   - Personal Tools: http://localhost
   - n8n Workflows: http://localhost:5678

### Method 2: Step-by-Step Build

1. **Build the website image**
   ```bash
   docker build -t personal-tools-website ./website
   ```

2. **Pull required images**
   ```bash
   docker pull n8nio/n8n:latest
   docker pull nginx:alpine
   ```

3. **Start services individually**
   ```bash
   # Start n8n first
   docker-compose up -d n8n
   
   # Start website
   docker-compose up -d website
   
   # Start nginx proxy
   docker-compose up -d nginx
   ```

## 🎯 Usage

### Accessing Applications

| Service | URL | Purpose |
|---------|-----|---------|
| Personal Tools | http://localhost | Main website with mini tools |
| n8n Workflows | http://localhost:5678 | Workflow automation platform |
| Website Direct | http://localhost:3000 | Direct access (bypasses nginx) |

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

### Basic Operations
```bash
# Start all services (detached mode)
docker-compose up -d

# Start with rebuild
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

### Common Issues

1. **Docker Desktop not running**
   ```
   Error: Cannot connect to Docker daemon
   Solution: Start Docker Desktop and wait for it to fully load
   ```

2. **Port already in use**
   ```
   Error: Port 80 is already allocated
   Solution: Stop other services using port 80 or change ports in docker-compose.yml
   ```

3. **n8n not accessible**
   ```
   Check: docker-compose logs n8n
   Solution: Wait for n8n to fully initialize (can take 30-60 seconds)
   ```

4. **Website not loading**
   ```
   Check: docker-compose ps
   Solution: Ensure all containers are running and healthy
   ```

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