import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="admin-dashboard">
      <h1>Administration</h1>
      <p>Bienvenue dans l'interface d'administration</p>

      <div class="user-info" *ngIf="username">
        <h2>Informations utilisateur</h2>
        <p>Connecté en tant que: {{ username }}</p>
        <p>Rôles: {{ userRoles.join(', ') }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-dashboard {
        padding: 20px;
      }

      .user-info {
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    `,
  ],
})
export class AdminDashboardComponent implements OnInit {
  username: string = '';
  userRoles: string[] = [];

  constructor(private keycloakService: KeycloakService) {}

  async ngOnInit() {
    const userProfile = await this.keycloakService.loadUserProfile();
    this.username = userProfile.username || '';

    const roles = await this.keycloakService.getUserRoles();
    this.userRoles = roles;
  }
}
