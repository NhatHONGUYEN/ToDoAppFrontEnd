import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AppAuthGuard implements CanActivate {
  constructor(private keycloak: KeycloakService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const isAuth = await this.keycloak.isLoggedIn();
    if (!isAuth) {
      await this.keycloak.login({
        redirectUri: window.location.origin + this.router.url,
      });
    }
    return isAuth;
  }
}
