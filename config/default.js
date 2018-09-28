module.exports = {
  toggles: {
    login: { enabled: true },
    insurer: { stars: false },
    screenlayout: { notification: false },
  },
  API_URL: process.env.API_URL || 'http://localhost:4000',
  server: {
    host: process.env.TEST_HOST || '0.0.0.0',
    port: process.env.TEST_PORT || 5000,
  },
  logger: {
    transport: 'console',
    include: [
      'tracer',
      'timestamp',
      'level',
      'message',
      'error.message',
      'error.code',
      'error.stack',
      'request.url',
      'request.headers',
      'request.params',
      'request.method',
      'response.statusCode',
      'response.headers',
      'response.time',
      'process',
      'system',
      'package.name',
      'service',
    ],
    exclude: ['password', 'secret', 'token', 'request.headers.cookie', 'dependencies', 'devDependencies'],
  },
  routes: {
    api: {
      API_URL: process.env.API_URL || 'http://localhost:4000',
      toggles: {
        login: { enabled: true },
      },
    },
  },
};
