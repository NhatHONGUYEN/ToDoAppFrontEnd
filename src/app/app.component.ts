import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatIconModule],
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
