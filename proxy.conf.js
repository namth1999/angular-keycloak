const PROXY_CONFIG = [
  {
    context: [
      '/api/products',
      '/api/upload',
    ],
    target: "http://localhost:8083",
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  },
  {
    context: [
      '/preview',
    ],
    target: "http://localhost:8084",
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  },
  {
    context: [
      '/keycloak/users',
    ],
    target: "http://localhost:8080/auth/admin/realms/test-keycloak",
    secure: false,
    logLevel: "debug",
    changeOrigin: true,
    pathRewrite: {'^/keycloak' : ''}
  }
]
module.exports = PROXY_CONFIG;
