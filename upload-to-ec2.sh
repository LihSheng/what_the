#!/bin/bash

# Configuration - UPDATE THESE VALUES
EC2_IP="your-ec2-ip-address"
KEY_PATH="path/to/your-key.pem"
EC2_USER="ec2-user"  # or ubuntu for Ubuntu instances

echo "Building the project..."
npm run build

echo "Creating deployment package..."
tar -czf dev-tools-build.tar.gz out/

echo "Uploading to EC2..."
scp -i "$KEY_PATH" dev-tools-build.tar.gz "$EC2_USER@$EC2_IP:/home/$EC2_USER/"

echo "Setting up on EC2..."
ssh -i "$KEY_PATH" "$EC2_USER@$EC2_IP" << 'EOF'
    # Extract files
    tar -xzf dev-tools-build.tar.gz
    
    # Install nginx if not installed
    sudo apt update
    sudo apt install nginx -y
    
    # Setup web directory
    sudo mkdir -p /var/www/dev-tools
    sudo cp -r out/* /var/www/dev-tools/
    sudo chown -R www-data:www-data /var/www/dev-tools
    sudo chmod -R 755 /var/www/dev-tools
    
    # Start nginx
    sudo systemctl enable nginx
    sudo systemctl start nginx
    
    echo "Deployment complete! Your site should be available at http://$(curl -s ifconfig.me)"
EOF

echo "Done! Don't forget to configure nginx with your domain/IP"