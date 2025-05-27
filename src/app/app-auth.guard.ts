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
    try {
      // Vérifier l'authentification
      const isAuth = await this.keycloak.isLoggedIn();

      if (!isAuth) {
        await this.keycloak.login({
          redirectUri: window.location.origin + state.url,
        });
        return false;
      }

      // Vérifier les rôles si spécifiés
      const requiredRoles = route.data?.['roles'] as string[];

      if (requiredRoles && requiredRoles.length > 0) {
        const hasRole = requiredRoles.some((role) => {
          const hasThisRole = this.keycloak.isUserInRole(role);

          return hasThisRole;
        });

        if (!hasRole) {
          this.router.navigate(['/access-denied']); // Créer cette page
          return false;
        }
      }

      return true;
    } catch (error) {
      this.router.navigate(['/']);
      return false;
    }
  }
}
