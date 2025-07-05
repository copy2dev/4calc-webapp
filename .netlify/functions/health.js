exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      status: 'healthy',
      version: '1.0.0',
      buildDate: '2025-07-05T01:35:09.503Z',
      environment: 'production',
      branch: 'main',
      commit: 'local',
      timestamp: new Date().toISOString()
    })
  };
};