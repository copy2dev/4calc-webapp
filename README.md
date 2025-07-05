# 4Calc - ศูนย์รวมเครื่องคิดเลขครบครัน

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Status](https://img.shields.io/badge/status-production%20ready-green.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

เว็บแอปพลิเคชันที่รวบรวมเครื่องคิดเลขต่างๆ ไว้ในที่เดียว รองรับภาษาไทยและอังกฤษ พร้อมใช้งานบนทุกอุปกรณ์

## ✨ Features

- 🌐 **Multi-language**: ภาษาไทย (default) และภาษาอังกฤษ
- 🧮 **Calculator Hub**: รวมเครื่องคิดเลขหลากหลายประเภท
- 🔍 **Search & Filter**: ค้นหาและกรองตามหมวดหมู่
- 📱 **Responsive**: ใช้งานได้ทุกอุปกรณ์
- ⚡ **Fast**: โหลดเร็ว < 2 วินาที
- 🎨 **Modern UI**: ดีไซน์ทันสมัยและใช้งานง่าย

## 🚀 Quick Start

### Development
```bash
# Start development server
node server.js

# Access at http://localhost:3000
```

### Production Build
```bash
# Build for production
node build.js

# Deploy
cd dist
./docker-build.sh
./deploy.sh
```

### Release Management
```bash
# Create new release
node release.js patch "Bug fixes"
node release.js minor "New features"
node release.js major "Breaking changes"
```

## 📋 Available Calculators

| Calculator | Description | Status |
|------------|-------------|--------|
| 🚇 MRT Time | เวลาเดินทาง MRT | ✅ Ready |
| 🚕 Taxi Fare | ค่าแท็กซี่ | 🚧 Planned |
| 🤱 Pregnancy | อายุครรภ์ | 🚧 Planned |
| 💰 Interest | ดอกเบี้ย | 🚧 Planned |
| ❄️ BTU | เครื่องปรับอากาศ | 🚧 Planned |
| 📍 Distance | ระยะทาง | 🚧 Planned |

## 🔧 Project Structure

```
4calc-webapp/
├── index.html              # Main application
├── server.js               # Development server
├── build.js                # Production build script
├── release.js              # Release management
├── config.js               # Configuration management
├── VERSION.md              # Current version info
├── CHANGELOG.md            # Version history
├── DEPLOYMENT.md           # Deployment guide
├── deployment/             # Deployment configs
│   ├── docker/            # Docker configurations
│   └── nginx/             # Nginx configurations
└── dist/                  # Production build output
```

## 🌍 Deployment Options

### Option 1: Docker (Recommended)
```bash
docker run -p 3000:3000 4calc:latest
```

### Option 2: Static Hosting
Upload `dist/` folder to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### Option 3: Traditional Server
```bash
pm2 start server.js --name "4calc"
```

## 📊 Version Management

### Current Version: 1.0.0
- **Type**: Initial Release
- **Date**: 2024-07-05
- **Status**: Production Ready

### Release Process
1. ✅ Development completed
2. ✅ Testing completed
3. ✅ Documentation updated
4. 🔄 Stakeholder approval (pending)
5. ⏳ Production deployment (pending)

## 🔒 Security Features

- ✅ No external dependencies
- ✅ Client-side only processing
- ✅ No data collection
- ✅ HTTPS ready
- ✅ Security headers configured

## 📈 Performance

- **Load time**: < 2 seconds
- **Bundle size**: < 2MB
- **Browser support**: All modern browsers
- **Mobile optimized**: Yes
- **SEO friendly**: Yes

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Styling**: Tailwind CSS
- **Fonts**: Noto Sans Thai, Inter
- **Server**: Node.js (development)
- **Deployment**: Docker, Nginx

## 📞 Support & Documentation

### Documentation Files
- [`DEPLOYMENT.md`](DEPLOYMENT.md) - Complete deployment guide
- [`VERSION.md`](VERSION.md) - Current version details
- [`CHANGELOG.md`](CHANGELOG.md) - Version history
- [`.env.example`](.env.example) - Environment configuration

### Quick Commands
```bash
# Health check
curl http://localhost:3000/health

# View logs (Docker)
docker logs 4calc-webapp

# View logs (PM2)
pm2 logs 4calc

# Restart application
docker restart 4calc-webapp
# or
pm2 restart 4calc
```

## 🚀 Deployment Checklist

### Pre-deployment
- [ ] Code review completed
- [ ] Tests passing
- [ ] Performance acceptable
- [ ] Security review done
- [ ] Documentation updated

### Production Deployment
- [ ] Environment configured
- [ ] SSL certificate ready
- [ ] Domain pointed correctly
- [ ] Monitoring setup
- [ ] Backup plan ready

### Post-deployment
- [ ] Application accessible
- [ ] All features working
- [ ] Mobile responsiveness
- [ ] Language switching
- [ ] Performance monitoring

## 📝 License

MIT License - see LICENSE file for details

---

**🔗 Quick Links:**
- [Live Demo](http://localhost:3000) (when running)
- [Deployment Guide](DEPLOYMENT.md)
- [Version History](CHANGELOG.md)
- [Current Version](VERSION.md)

**🚀 Ready for Production Deployment!**