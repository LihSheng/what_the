# Project Deployment Guide

## Overview
This project includes automated deployment scripts for EC2 instances with nginx configuration.

## Prerequisites
- AWS EC2 instance with SSH access
- nginx installed on the EC2 instance
- SSH key pair for EC2 access

## Deployment Steps

### 1. Build and Package
The project includes scripts to create a deployment package:

```bash
# Option A: Use the deploy script (creates tar.gz)
./deploy.sh

# Option B: Manual zip creation
npm run build
zip -r dev-tools-build.zip out/ nginx.conf

# Option C: Manual tar creation  
npm run build
tar -czf dev-tools-build.tar.gz out/ nginx.conf
```

### 2. Upload to EC2

#### Option A: Using Shell Script (Linux/Mac)
**First, update the configuration in `upload-to-ec2.sh`:**
- Set `EC2_IP` to your instance's public IP
- Set `KEY_PATH` to your SSH key file path
- Set `EC2_USER` (usually `ec2-user` or `ubuntu`)

```bash
chmod +x upload-to-ec2.sh
./upload-to-ec2.sh
```

#### Option B: Using PowerShell Script (Windows)
**First, update the configuration in `upload-to-ec2.ps1`:**
- Set `$EC2_IP` to your instance's public IP  
- Set `$KEY_PATH` to your SSH key file path
- Set `$EC2_USER` (usually `ec2-user` or `ubuntu`)

```powershell
.\upload-to-ec2.ps1
```

#### Option C: Manual SCP Upload
```bash
# Upload zip file
scp -i /path/to/your-key.pem dev-tools-build.zip ec2-user@YOUR_EC2_IP:/home/ec2-user/

# Or upload tar.gz file
scp -i /path/to/your-key.pem dev-tools-build.tar.gz ec2-user@YOUR_EC2_IP:/home/ec2-user/
```

### 3. Deploy on EC2
SSH into your EC2 instance and run the deployment:

```bash
ssh -i /path/to/your-key.pem ec2-user@YOUR_EC2_IP
```

Then on the EC2 instance:
```bash
# Extract the deployment package (choose based on file type)
unzip dev-tools-build.zip
# OR
tar -xzf dev-tools-build.tar.gz

# Set up web directory
sudo mkdir -p /var/www/dev-tools
sudo cp -r out/* /var/www/dev-tools/
sudo chown -R www-data:www-data /var/www/dev-tools
sudo chmod -R 755 /var/www/dev-tools

# Copy nginx configuration (choose one)
sudo cp nginx.conf /etc/nginx/sites-available/default  # For Ubuntu/Debian
# OR
sudo cp nginx.conf /etc/nginx/nginx.conf  # For Amazon Linux/CentOS

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check nginx status
sudo systemctl status nginx
```

### 4. Access Your Application
- Get your EC2 public IP: `curl http://169.254.169.254/latest/meta-data/public-ipv4`
- Access via browser: `http://YOUR_PUBLIC_IP`

## Security Group Configuration
Ensure your EC2 security group allows:
- Port 22 (SSH) from your IP
- Port 80 (HTTP) from 0.0.0.0/0
- Port 443 (HTTPS) from 0.0.0.0/0 (if using SSL)

## Troubleshooting
- Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Verify nginx is listening: `sudo netstat -tlnp | grep nginx`
- Test configuration: `sudo nginx -t`

## Files Included
- `deploy.sh` - Main deployment script
- `upload-to-ec2.sh` - Linux/Mac upload script
- `upload-to-ec2.ps1` - Windows PowerShell upload script
- `nginx.conf` - nginx configuration file
- `dev-tools-build.zip` - Deployment package