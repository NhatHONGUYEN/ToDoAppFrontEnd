import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TodoAppFrontEnd';

  constructor(private keycloak: KeycloakService) {}

  /** Déclenche la déconnexion et redirige vers la home du front */
  logout(): Promise<void> {
    return this.keycloak.logout(window.location.origin);
  }
}
