// Cette importation est dépréciée, mais sûre à utiliser pour le moment
import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        // on découpe l'issuer pour récupérer baseUrl + realm
        url: environment.keycloak.issuer.replace(/\/realms\/.*$/, ''),
        realm: environment.keycloak.issuer.split('/').pop()!,
        clientId: environment.keycloak.clientId,
      },
      initOptions: {
        onLoad: 'login-required',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: [
        // Exclure tout ce qui est assets ou routes publiques
        '/assets',
        '/favicon.ico',
      ],
    });
}
