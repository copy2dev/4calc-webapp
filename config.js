/**
 * 4Calc Configuration Management
 * Handles environment-specific settings and configuration
 */

require('dotenv').config();

const config = {
  // Application
  app: {
    name: process.env.APP_NAME || '4Calc',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  },

  // Server
  server: {
    port: parseInt(process.env.PORT) || 3000,
    host: process.env.HOST || '0.0.0.0'
  },

  // Domain
  domain: {
    primary: process.env.DOMAIN || 'localhost',
    ssl: process.env.SSL_ENABLED === 'true'
  },

  // Security
  security: {
    headers: process.env.SECURITY_HEADERS !== 'false',
    rateLimiting: process.env.RATE_LIMITING !== 'false',
    maxRequestsPerMinute: parseInt(process.env.MAX_REQUESTS_PER_MINUTE) || 60
  },

  // Monitoring
  monitoring: {
    healthCheck: process.env.HEALTH_CHECK_ENABLED !== 'false',
    logging: process.env.LOGGING_ENABLED !== 'false',
    logLevel: process.env.LOG_LEVEL || 'info'
  },

  // Performance
  performance: {
    gzip: process.env.GZIP_ENABLED !== 'false',
    cacheStaticAssets: process.env.CACHE_STATIC_ASSETS !== 'false',
    cacheMaxAge: parseInt(process.env.CACHE_MAX_AGE) || 31536000
  },

  // Analytics
  analytics: {
    googleAnalytics: process.env.GOOGLE_ANALYTICS_ID || null,
    facebookPixel: process.env.FACEBOOK_PIXEL_ID || null
  },

  // CDN
  cdn: {
    enabled: process.env.CDN_ENABLED === 'true',
    url: process.env.CDN_URL || null
  }
};

// Validation
function validateConfig() {
  const errors = [];

  // Required fields
  if (!config.app.name) errors.push('APP_NAME is required');
  if (!config.app.version) errors.push('APP_VERSION is required');
  
  // Port validation
  if (config.server.port < 1 || config.server.port > 65535) {
    errors.push('PORT must be between 1 and 65535');
  }

  // Environment validation
  const validEnvironments = ['development', 'staging', 'production'];
  if (!validEnvironments.includes(config.app.environment)) {
    errors.push(`NODE_ENV must be one of: ${validEnvironments.join(', ')}`);
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
}

// Get configuration for specific environment
function getEnvironmentConfig() {
  const baseConfig = { ...config };
  
  switch (config.app.environment) {
    case 'development':
      return {
        ...baseConfig,
        security: {
          ...baseConfig.security,
          rateLimiting: false
        },
        monitoring: {
          ...baseConfig.monitoring,
          logLevel: 'debug'
        }
      };
      
    case 'staging':
      return {
        ...baseConfig,
        security: {
          ...baseConfig.security,
          maxRequestsPerMinute: 120
        }
      };
      
    case 'production':
      return {
        ...baseConfig,
        monitoring: {
          ...baseConfig.monitoring,
          logging: true,
          logLevel: 'warn'
        }
      };
      
    default:
      return baseConfig;
  }
}

// Initialize and validate
try {
  validateConfig();
  module.exports = getEnvironmentConfig();
} catch (error) {
  console.error('❌ Configuration Error:', error.message);
  process.exit(1);
}