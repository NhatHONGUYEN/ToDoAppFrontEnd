export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/tasks',
  keycloak: {
    issuer: 'http://localhost:81/realms/todo-backend-local',
    clientId: 'todo-backend-local',
    redirectUri: 'http://localhost:4200',
  },
};
