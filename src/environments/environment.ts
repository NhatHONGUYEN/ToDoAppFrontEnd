// environment.ts
export const environment = {
  production: false,
  keycloak: {
    issuer: 'http://localhost:8082/realms/master',
    clientId: 'ToDoApp-realm',
    redirectUri: window.location.origin,
  },
};
