import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AppAuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Vérifier l'authentification
    const isAuth = await this.keycloak.isLoggedIn();
    if (!isAuth) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
      return false;
    }

    // Vérifier les rôles si spécifiés
    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const hasRole = requiredRoles.some((role) =>
        this.keycloak.isUserInRole(role)
      );

      if (!hasRole) {
        // Rediriger vers une page d'accès refusé ou page d'accueil
        this.router.navigate(['/']);
        return false;
      }
    }

    return true;
  }
}
