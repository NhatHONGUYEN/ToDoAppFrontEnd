import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private keycloak: KeycloakService) {}

  async ngOnInit() {
    this.isAdmin = await this.keycloak.isUserInRole('ADMIN');
  }

  logout(): Promise<void> {
    return this.keycloak.logout(window.location.origin);
  }
}
