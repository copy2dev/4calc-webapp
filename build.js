#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Build configuration
const BUILD_CONFIG = {
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'production',
  outputDir: 'dist'
};

console.log('🚀 Starting 4Calc Production Build...');
console.log(`📦 Version: ${BUILD_CONFIG.version}`);
console.log(`📅 Build Date: ${BUILD_CONFIG.buildDate}`);
console.log(`🌍 Environment: ${BUILD_CONFIG.environment}`);

// Create output directory
if (fs.existsSync(BUILD_CONFIG.outputDir)) {
  fs.rmSync(BUILD_CONFIG.outputDir, { recursive: true });
}
fs.mkdirSync(BUILD_CONFIG.outputDir, { recursive: true });

// Copy main files
console.log('📄 Copying main files...');
const filesToCopy = [
  'index.html',
  'server.js',
  'package.json',
  'VERSION.md',
  'CHANGELOG.md'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(BUILD_CONFIG.outputDir, file));
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ⚠️  ${file} not found`);
  }
});

// Process HTML file for production
console.log('🔧 Processing HTML for production...');
let htmlContent = fs.readFileSync(path.join(BUILD_CONFIG.outputDir, 'index.html'), 'utf8');

// Add build info to HTML
const buildInfo = `
<!-- 4Calc v${BUILD_CONFIG.version} -->
<!-- Built: ${BUILD_CONFIG.buildDate} -->
<!-- Environment: ${BUILD_CONFIG.environment} -->
`;

htmlContent = htmlContent.replace('</head>', `${buildInfo}</head>`);

// Minify inline JavaScript (basic)
if (BUILD_CONFIG.environment === 'production') {
  // Remove console.log statements
  htmlContent = htmlContent.replace(/console\.log\([^)]*\);?\s*/g, '');
  
  // Remove extra whitespace in script tags
  htmlContent = htmlContent.replace(/<script>([\s\S]*?)<\/script>/g, (match, script) => {
    const minified = script
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .trim();
    return `<script>${minified}</script>`;
  });
}

fs.writeFileSync(path.join(BUILD_CONFIG.outputDir, 'index.html'), htmlContent);

// Update server.js for production
console.log('🔧 Processing server.js for production...');
let serverContent = fs.readFileSync(path.join(BUILD_CONFIG.outputDir, 'server.js'), 'utf8');

// Add production configuration
const productionConfig = `
// Production Configuration
const PRODUCTION_CONFIG = {
  version: '${BUILD_CONFIG.version}',
  buildDate: '${BUILD_CONFIG.buildDate}',
  environment: '${BUILD_CONFIG.environment}',
  enableLogging: ${BUILD_CONFIG.environment !== 'production'}
};

`;

serverContent = serverContent.replace('const http = require(\'http\');', 
  `const http = require('http');\n${productionConfig}`);

// Add health check endpoint
const healthCheck = `
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'healthy',
      version: PRODUCTION_CONFIG.version,
      buildDate: PRODUCTION_CONFIG.buildDate,
      uptime: process.uptime()
    }));
    return;
`;

serverContent = serverContent.replace('  } else {', healthCheck + '  } else {');

fs.writeFileSync(path.join(BUILD_CONFIG.outputDir, 'server.js'), serverContent);

// Create production package.json
console.log('📦 Creating production package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const prodPackageJson = {
  name: packageJson.name,
  version: BUILD_CONFIG.version,
  description: packageJson.description,
  main: 'server.js',
  scripts: {
    start: 'node server.js',
    health: 'curl -f http://localhost:3000/health || exit 1'
  },
  engines: {
    node: '>=16.0.0'
  },
  dependencies: {} // No dependencies for production
};

fs.writeFileSync(
  path.join(BUILD_CONFIG.outputDir, 'package.json'), 
  JSON.stringify(prodPackageJson, null, 2)
);

// Create deployment scripts
console.log('🚀 Creating deployment scripts...');

// Docker build script
const dockerBuildScript = `#!/bin/bash
echo "🐳 Building Docker image for 4Calc v${BUILD_CONFIG.version}..."

# Build image
docker build -f deployment/docker/Dockerfile -t 4calc:${BUILD_CONFIG.version} -t 4calc:latest .

# Tag for registry (update with your registry)
# docker tag 4calc:${BUILD_CONFIG.version} your-registry.com/4calc:${BUILD_CONFIG.version}

echo "✅ Docker image built successfully!"
echo "🚀 To run: docker run -p 3000:3000 4calc:latest"
`;

fs.writeFileSync(path.join(BUILD_CONFIG.outputDir, 'docker-build.sh'), dockerBuildScript);
fs.chmodSync(path.join(BUILD_CONFIG.outputDir, 'docker-build.sh'), '755');

// Quick deploy script
const deployScript = `#!/bin/bash
echo "🚀 Deploying 4Calc v${BUILD_CONFIG.version}..."

# Stop existing container
docker stop 4calc-webapp 2>/dev/null || true
docker rm 4calc-webapp 2>/dev/null || true

# Run new container
docker run -d \\
  --name 4calc-webapp \\
  --restart unless-stopped \\
  -p 3000:3000 \\
  -e NODE_ENV=production \\
  4calc:latest

echo "✅ 4Calc deployed successfully!"
echo "🌐 Access at: http://localhost:3000"
`;

fs.writeFileSync(path.join(BUILD_CONFIG.outputDir, 'deploy.sh'), deployScript);
fs.chmodSync(path.join(BUILD_CONFIG.outputDir, 'deploy.sh'), '755');

// Create build manifest
const buildManifest = {
  version: BUILD_CONFIG.version,
  buildDate: BUILD_CONFIG.buildDate,
  environment: BUILD_CONFIG.environment,
  files: fs.readdirSync(BUILD_CONFIG.outputDir),
  size: calculateDirectorySize(BUILD_CONFIG.outputDir),
  checksum: generateChecksum(BUILD_CONFIG.outputDir)
};

fs.writeFileSync(
  path.join(BUILD_CONFIG.outputDir, 'build-manifest.json'), 
  JSON.stringify(buildManifest, null, 2)
);

console.log('✅ Build completed successfully!');
console.log(`📁 Output directory: ${BUILD_CONFIG.outputDir}`);
console.log(`📊 Total size: ${(buildManifest.size / 1024).toFixed(2)} KB`);
console.log(`🔒 Checksum: ${buildManifest.checksum}`);
console.log('');
console.log('🚀 Next steps:');
console.log('1. cd dist');
console.log('2. ./docker-build.sh  # Build Docker image');
console.log('3. ./deploy.sh        # Deploy to production');

function calculateDirectorySize(dir) {
  let totalSize = 0;
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  });
  
  return totalSize;
}

function generateChecksum(dir) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  
  const files = fs.readdirSync(dir).sort();
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      const content = fs.readFileSync(filePath);
      hash.update(content);
    }
  });
  
  return hash.digest('hex').substring(0, 8);
}