// environment.ts
export const environment = {
  production: false,
  apiUrl: '${API_URL_LOCAL}',
  keycloak: {
    issuer: '${KEYCLOAK_ISSUER_URI_LOCAL}',
    clientId: '${KEYCLOAK_CLIENT_ID_LOCAL}',
    // Changez cette ligne pour spécifier l'URL complète au lieu de window.location.origin
    redirectUri: '${FRONTEND_URL_LOCAL}',
  },
};
