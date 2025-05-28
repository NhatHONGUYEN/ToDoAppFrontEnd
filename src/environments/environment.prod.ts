export const environment = {
  production: true,
  apiUrl: 'https://todoappbackend-production-3438.up.railway.app/api/tasks',
  keycloak: {
    issuer:
      'https://todoappkeycloak-production.up.railway.app/realms/todo-backend',
    clientId: 'todo-backend-client',
    redirectUri: 'https://todoappnhat.netlify.app',
    clientSecret: '48X6oHEI8EFSaCVYVBYy3FtAWnYswMnE',
  },
};
