#!/bin/bash

echo "🚀 Setting up 4Calc for GitHub + Netlify deployment"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed. Please install git first.${NC}"
    exit 1
fi

# Get GitHub username
echo -e "${BLUE}📝 Please enter your GitHub username:${NC}"
read -p "GitHub username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ GitHub username is required${NC}"
    exit 1
fi

# Update package.json with GitHub username
echo -e "${YELLOW}📝 Updating package.json with your GitHub info...${NC}"
sed -i "s/YOUR_USERNAME/$GITHUB_USERNAME/g" package.json

# Check if already a git repository
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📂 Initializing git repository...${NC}"
    git init
    
    echo -e "${YELLOW}➕ Adding files to git...${NC}"
    git add .
    
    echo -e "${YELLOW}💾 Creating initial commit...${NC}"
    git commit -m "Initial commit: 4Calc v1.0.0

✨ Features:
- Multi-language support (Thai/English)
- MRT Time Calculator
- Search and category filtering
- Responsive design
- Production-ready build system

🚀 Ready for Netlify deployment"

    echo -e "${YELLOW}🔗 Adding GitHub remote...${NC}"
    git remote add origin "https://github.com/$GITHUB_USERNAME/4calc-webapp.git"
    
    echo -e "${YELLOW}🌿 Setting main branch...${NC}"
    git branch -M main
    
    echo -e "${GREEN}✅ Git repository initialized successfully!${NC}"
else
    echo -e "${YELLOW}📂 Git repository already exists${NC}"
    
    echo -e "${YELLOW}➕ Adding new changes...${NC}"
    git add .
    
    echo -e "${YELLOW}💾 Committing changes...${NC}"
    git commit -m "Setup: Configure for GitHub + Netlify deployment

- Add netlify.toml configuration
- Add .gitignore for Node.js projects  
- Add Netlify-specific build script
- Add deployment documentation
- Update package.json with repository info"
fi

echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "${YELLOW}1.${NC} Create a new repository on GitHub:"
echo -e "   ${BLUE}https://github.com/new${NC}"
echo -e "   Repository name: ${GREEN}4calc-webapp${NC}"
echo -e "   Description: ${GREEN}4Calc - ศูนย์รวมเครื่องคิดเลขครบครัน${NC}"
echo ""
echo -e "${YELLOW}2.${NC} Push your code to GitHub:"
echo -e "   ${BLUE}git push -u origin main${NC}"
echo ""
echo -e "${YELLOW}3.${NC} Setup Netlify:"
echo -e "   - Go to ${BLUE}https://netlify.com${NC}"
echo -e "   - Sign in with GitHub"
echo -e "   - Click 'New site from Git'"
echo -e "   - Select your ${GREEN}4calc-webapp${NC} repository"
echo -e "   - Netlify will auto-detect the build settings from netlify.toml"
echo ""
echo -e "${YELLOW}4.${NC} Your site will be available at:"
echo -e "   ${GREEN}https://[random-name].netlify.app${NC}"
echo -e "   (You can change the name in Netlify settings)"
echo ""
echo -e "${GREEN}🚀 Auto-deployment is ready!${NC}"
echo -e "Every time you push to GitHub, Netlify will automatically deploy your changes."
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo -e "- Full setup guide: ${GREEN}GITHUB_SETUP.md${NC}"
echo -e "- Deployment guide: ${GREEN}DEPLOYMENT.md${NC}"
echo -e "- Project overview: ${GREEN}README.md${NC}"