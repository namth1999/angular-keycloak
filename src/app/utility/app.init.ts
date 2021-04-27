import {KeycloakService} from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/auth',
        realm: 'test-keycloak',
        clientId: 'demo-app',
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
        checkLoginIframeInterval: 25
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      loadUserProfileAtStartUp: true
    });
}
