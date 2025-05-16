export const environment = {
  production: true,
  keycloak: {
    issuer: 'https://todoappnhat.netlify.app/realms/ToDoApp',
    clientId: 'todo-frontend-client',
    redirectUri: window.location.origin,
  },
};
