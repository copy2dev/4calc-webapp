# 4Calc Deployment Guide

## 🚀 Production Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker 20.10+ installed
- Docker Compose 2.0+ installed
- Domain name configured (optional)

#### Quick Start
```bash
# 1. Build production version
node build.js

# 2. Build Docker image
cd dist
./docker-build.sh

# 3. Deploy
./deploy.sh

# 4. Access your application
open http://localhost:3000
```

#### Custom Domain Deployment
```bash
# 1. Update environment variables
cp .env.example .env
nano .env  # Configure your domain and settings

# 2. Use Docker Compose with Nginx
cd deployment/docker
docker-compose --profile production up -d

# 3. Configure DNS
# Point your domain to your server IP
```

---

### Option 2: Traditional Server Deployment

#### Prerequisites
- Node.js 16+ installed
- PM2 (Process Manager)
- Nginx (Reverse Proxy)

#### Steps
```bash
# 1. Install PM2
npm install -g pm2

# 2. Build and deploy
node build.js
cd dist

# 3. Start with PM2
pm2 start server.js --name "4calc"
pm2 startup
pm2 save

# 4. Configure Nginx
sudo cp ../deployment/nginx/nginx.conf /etc/nginx/sites-available/4calc
sudo ln -s /etc/nginx/sites-available/4calc /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Option 3: Static Hosting (GitHub Pages, Netlify, Vercel)

Since 4Calc is a static web application, you can deploy it to static hosting services:

#### Netlify Deployment
```bash
# 1. Build static version
node build.js

# 2. Deploy to Netlify
# - Upload dist folder to Netlify
# - Or connect GitHub repository
# - Set build command: "node build.js"
# - Set publish directory: "dist"
```

#### Vercel Deployment
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

#### GitHub Pages
```bash
# 1. Build static version
node build.js

# 2. Copy dist contents to gh-pages branch
# 3. Enable GitHub Pages in repository settings
```

---

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Essential settings
NODE_ENV=production
PORT=3000
DOMAIN=your-domain.com

# Security (recommended)
SSL_ENABLED=true
RATE_LIMITING=true
SECURITY_HEADERS=true
```

### Optional Settings
```bash
# Analytics
GOOGLE_ANALYTICS_ID=GA-XXXXX-X
FACEBOOK_PIXEL_ID=XXXXXXXXX

# Performance
GZIP_ENABLED=true
CACHE_STATIC_ASSETS=true
CDN_ENABLED=false

# Monitoring
LOGGING_ENABLED=true
HEALTH_CHECK_ENABLED=true
```

---

## 🔒 SSL/HTTPS Setup

### Let's Encrypt with Certbot
```bash
# 1. Install certbot
sudo apt install certbot python3-certbot-nginx

# 2. Generate SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 3. Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Easy option)
1. Add your domain to Cloudflare
2. Update DNS records
3. Enable SSL in Cloudflare dashboard
4. Use "Flexible" or "Full" SSL mode

---

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```bash
# Check application health
curl http://localhost:3000/health

# Expected response:
{
  "status": "healthy",
  "version": "1.0.0",
  "buildDate": "2024-07-05T...",
  "uptime": 3600
}
```

### PM2 Monitoring
```bash
# View application status
pm2 status

# View logs
pm2 logs 4calc

# Monitor resources
pm2 monit

# Restart if needed
pm2 restart 4calc
```

### Docker Health Checks
```bash
# Check container health
docker ps
# Look for "healthy" status

# View logs
docker logs 4calc-webapp

# Restart container
docker restart 4calc-webapp
```

---

## 🔄 Deployment Workflow

### 1. Pre-deployment Checklist
- [ ] Code reviewed and approved
- [ ] All tests passing
- [ ] VERSION.md updated
- [ ] CHANGELOG.md updated
- [ ] Environment variables configured
- [ ] SSL certificates ready (if applicable)
- [ ] Backup current version (if replacing)

### 2. Deployment Steps
```bash
# 1. Build production version
node build.js

# 2. Test build locally
cd dist
node server.js
# Test at http://localhost:3000

# 3. Deploy to production
./docker-build.sh
./deploy.sh

# 4. Verify deployment
curl http://your-domain.com/health
```

### 3. Post-deployment Verification
- [ ] Application loads correctly
- [ ] All calculators work
- [ ] Language switching works
- [ ] Mobile responsiveness
- [ ] SSL certificate valid
- [ ] Performance acceptable (< 2s load time)
- [ ] Health check endpoint responds

### 4. Rollback Plan (if needed)
```bash
# Docker rollback
docker stop 4calc-webapp
docker run -d --name 4calc-webapp -p 3000:3000 4calc:previous-version

# PM2 rollback
pm2 stop 4calc
# Replace files with previous version
pm2 start 4calc
```

---

## 🌍 Multi-Environment Setup

### Development
```bash
NODE_ENV=development
PORT=3000
LOGGING_ENABLED=true
RATE_LIMITING=false
```

### Staging
```bash
NODE_ENV=staging
PORT=3000
DOMAIN=staging.4calc.com
LOGGING_ENABLED=true
RATE_LIMITING=true
```

### Production
```bash
NODE_ENV=production
PORT=3000
DOMAIN=4calc.com
SSL_ENABLED=true
LOGGING_ENABLED=true
RATE_LIMITING=true
SECURITY_HEADERS=true
```

---

## 📈 Performance Optimization

### Nginx Caching
```nginx
# Add to nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### CDN Setup (Optional)
1. Configure CDN (CloudFlare, AWS CloudFront)
2. Update CDN_ENABLED=true in environment
3. Set CDN_URL to your CDN domain

### Gzip Compression
Automatically enabled in production build.

---

## 🚨 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

#### Docker Issues
```bash
# View container logs
docker logs 4calc-webapp

# Restart container
docker restart 4calc-webapp

# Rebuild image
docker build --no-cache -t 4calc:latest .
```

#### SSL Certificate Issues
```bash
# Renew Let's Encrypt certificate
sudo certbot renew

# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

### Performance Issues
```bash
# Check server resources
htop
df -h

# Monitor application
pm2 monit
docker stats
```

---

## 📞 Support

For deployment issues:
1. Check logs: `pm2 logs 4calc` or `docker logs 4calc-webapp`
2. Verify health endpoint: `curl http://localhost:3000/health`
3. Check environment configuration
4. Review nginx/proxy configuration
5. Verify SSL certificates

---

## 🔄 Version Management

### Releasing New Version
1. Update VERSION.md
2. Update CHANGELOG.md
3. Build: `node build.js`
4. Test locally
5. Deploy to staging
6. Get approval
7. Deploy to production
8. Tag release: `git tag v1.0.0`

### Hotfix Process
1. Create hotfix branch
2. Apply fix
3. Update version (patch)
4. Build and deploy
5. Merge back to main branch