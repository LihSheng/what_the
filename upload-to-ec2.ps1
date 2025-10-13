# PowerShell script for Windows deployment to EC2
# Configuration - UPDATE THESE VALUES
$EC2_IP = "your-ec2-ip-address"
$KEY_PATH = "path\to\your-key.pem"
$EC2_USER = "ec2-user"  # or ubuntu for Ubuntu instances

Write-Host "Building the project..." -ForegroundColor Green
npm run build

Write-Host "Creating deployment package..." -ForegroundColor Green
Compress-Archive -Path "out\*", "nginx.conf" -DestinationPath "dev-tools-build.zip" -Force

Write-Host "Uploading to EC2..." -ForegroundColor Green
scp -i $KEY_PATH dev-tools-build.zip "${EC2_USER}@${EC2_IP}:/home/${EC2_USER}/"

Write-Host "Connecting to EC2 for deployment..." -ForegroundColor Green
Write-Host "Run the following commands on your EC2 instance:" -ForegroundColor Yellow
Write-Host "ssh -i $KEY_PATH ${EC2_USER}@${EC2_IP}" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then on EC2:" -ForegroundColor Yellow
Write-Host "unzip dev-tools-build.zip" -ForegroundColor Cyan
Write-Host "sudo cp nginx.conf /etc/nginx/sites-available/default" -ForegroundColor Cyan
Write-Host "sudo nginx -t" -ForegroundColor Cyan
Write-Host "sudo systemctl restart nginx" -ForegroundColor Cyan
Write-Host ""
Write-Host "Deployment package uploaded successfully!" -ForegroundColor Green