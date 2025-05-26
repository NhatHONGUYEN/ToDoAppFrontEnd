export const environment = {
  production: true,
  apiUrl: 'https://todoappbackend-production-3438.up.railway.app/api/tasks',
  keycloak: {
    issuer:
      'https://todoappkeycloak-production.up.railway.app/realms/todo-realm',
    clientId: 'todo-frontend-client',
    redirectUri: window.location.origin,
  },
};
