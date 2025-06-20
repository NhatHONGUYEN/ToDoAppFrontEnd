// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/tasks',
  keycloak: {
    issuer: 'http://localhost:8180/realms/todo-backend-local',
    clientId: 'todo-backend-local',
    // Changez cette ligne pour spécifier l'URL complète au lieu de window.location.origin
    redirectUri: 'http://localhost:4200',
  },
};
