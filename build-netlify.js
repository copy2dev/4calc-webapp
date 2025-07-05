#!/usr/bin/env node

/**
 * Netlify-specific build script for 4Calc
 * This script prepares the application for Netlify deployment
 */

const fs = require('fs');
const path = require('path');

console.log('🌐 Building 4Calc for Netlify deployment...');

// Build configuration for Netlify
const BUILD_CONFIG = {
  version: process.env.npm_package_version || '1.0.0',
  buildDate: new Date().toISOString(),
  environment: process.env.NODE_ENV || 'production',
  commit: process.env.COMMIT_REF || 'local',
  branch: process.env.BRANCH || 'main'
};

console.log(`📦 Version: ${BUILD_CONFIG.version}`);
console.log(`🌍 Environment: ${BUILD_CONFIG.environment}`);
console.log(`🌿 Branch: ${BUILD_CONFIG.branch}`);
console.log(`📝 Commit: ${BUILD_CONFIG.commit.substring(0, 8)}`);

// Read the main HTML file
let htmlContent = fs.readFileSync('index.html', 'utf8');

// Add Netlify-specific optimizations
console.log('🔧 Applying Netlify optimizations...');

// Add build info as HTML comments
const buildInfo = `
<!-- 4Calc v${BUILD_CONFIG.version} -->
<!-- Built: ${BUILD_CONFIG.buildDate} -->
<!-- Environment: ${BUILD_CONFIG.environment} -->
<!-- Branch: ${BUILD_CONFIG.branch} -->
<!-- Commit: ${BUILD_CONFIG.commit} -->
<!-- Deployed on Netlify -->
`;

htmlContent = htmlContent.replace('</head>', `${buildInfo}</head>`);

// Add Netlify-specific analytics (if in production)
if (BUILD_CONFIG.environment === 'production') {
  const netlifyAnalytics = `
  <!-- Netlify Analytics -->
  <script defer src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
  `;
  
  htmlContent = htmlContent.replace('</body>', `${netlifyAnalytics}</body>`);
}

// Optimize for production
if (BUILD_CONFIG.environment === 'production') {
  console.log('⚡ Applying production optimizations...');
  
  // Remove console.log statements
  htmlContent = htmlContent.replace(/console\.log\([^)]*\);?\s*/g, '');
  
  // Minify inline JavaScript
  htmlContent = htmlContent.replace(/<script>([\s\S]*?)<\/script>/g, (match, script) => {
    const minified = script
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
      .replace(/\/\/.*$/gm, '') // Remove line comments
      .replace(/\s+/g, ' ') // Replace multiple spaces
      .trim();
    return `<script>${minified}</script>`;
  });
}

// Add Netlify Forms support (for future contact/feedback forms)
htmlContent = htmlContent.replace(
  'REQUEST_CALCULATOR_FORM_PLACEHOLDER',
  `
  <form name="calculator-request" method="POST" data-netlify="true" class="space-y-4">
    <input type="hidden" name="form-name" value="calculator-request" />
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Calculator Type:</label>
      <input type="text" name="calculator-type" required class="w-full px-3 py-2 border border-gray-300 rounded-lg" />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Description:</label>
      <textarea name="description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
    </div>
    <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Submit Request
    </button>
  </form>
  `
);

// Create _redirects file for Netlify
const redirectsContent = `# Netlify redirects for 4Calc

# Health check endpoint
/health    /.netlify/functions/health    200

# API endpoints (for future use)
/api/*     /.netlify/functions/:splat    200

# SPA fallback
/*         /index.html                   200
`;

fs.writeFileSync('_redirects', redirectsContent);

// Create _headers file for Netlify
const headersContent = `# Security and performance headers for 4Calc

/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css  
  Cache-Control: public, max-age=31536000, immutable
`;

fs.writeFileSync('_headers', headersContent);

// Write the optimized HTML
fs.writeFileSync('index.html', htmlContent);

// Create a simple health check function for Netlify
const functionsDir = '.netlify/functions';
if (!fs.existsSync(functionsDir)) {
  fs.mkdirSync(functionsDir, { recursive: true });
}

const healthFunction = `exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      status: 'healthy',
      version: '${BUILD_CONFIG.version}',
      buildDate: '${BUILD_CONFIG.buildDate}',
      environment: '${BUILD_CONFIG.environment}',
      branch: '${BUILD_CONFIG.branch}',
      commit: '${BUILD_CONFIG.commit}',
      timestamp: new Date().toISOString()
    })
  };
};`;

fs.writeFileSync('.netlify/functions/health.js', healthFunction);

// Create build manifest
const buildManifest = {
  version: BUILD_CONFIG.version,
  buildDate: BUILD_CONFIG.buildDate,
  environment: BUILD_CONFIG.environment,
  commit: BUILD_CONFIG.commit,
  branch: BUILD_CONFIG.branch,
  platform: 'Netlify',
  size: calculateFileSize('index.html'),
  files: [
    'index.html',
    '_redirects', 
    '_headers',
    '.netlify/functions/health.js'
  ]
};

fs.writeFileSync('build-manifest.json', JSON.stringify(buildManifest, null, 2));

console.log('✅ Netlify build completed successfully!');
console.log(`📊 Main file size: ${(buildManifest.size / 1024).toFixed(2)} KB`);
console.log('📁 Files created:');
console.log('  - index.html (optimized)');
console.log('  - _redirects (Netlify routing)');
console.log('  - _headers (Security headers)');
console.log('  - .netlify/functions/health.js (Health check API)');
console.log('  - build-manifest.json (Build info)');
console.log('');
console.log('🚀 Ready for Netlify deployment!');

function calculateFileSize(filename) {
  try {
    const stats = fs.statSync(filename);
    return stats.size;
  } catch (e) {
    return 0;
  }
}