export const environment = {
  production: true,
  apiUrl: '${API_URL}',
  keycloak: {
    issuer: '${KEYCLOAK_ISSUER_URI}',
    clientId: '${KEYCLOAK_CLIENT_ID}',
    redirectUri: '${FRONTEND_URL}',
  },
};
