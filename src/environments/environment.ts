// environment.ts
export const environment = {
  production: false,
  keycloak: {
    issuer: 'http://localhost:8080/realms/ToDoApp',
    clientId: 'todo-app-client',
    redirectUri: window.location.origin,
  },
};
