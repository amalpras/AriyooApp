import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent {
  isNavbarVisible = false;

  constructor(private router: Router) {}

  toggleNavbar(): void {
    this.isNavbarVisible = !this.isNavbarVisible;
  }

  closeNavbar(): void {
    this.isNavbarVisible = false;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeNavbar();
  }
}