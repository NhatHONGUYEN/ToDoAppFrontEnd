export const environment = {
  production: true,
  keycloak: {
    // Si votre backend Render gère aussi Keycloak ou si vous avez une API pour l'authentification
    issuer: 'https://todoappbackend-13go.onrender.com/realms/ToDoApp', // à ajuster selon votre configuration
    clientId: 'todo-app-client',
    redirectUri: window.location.origin,
  },
};
