export const environment = {
  production: true,
  keycloak: {
    issuer: 'https://todoappnhat.netlify.app/realms/ToDoApp',
    clientId: 'ToDoApp-realm',
    redirectUri: window.location.origin,
  },
};
