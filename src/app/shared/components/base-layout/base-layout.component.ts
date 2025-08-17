import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent {
  isNavbarVisible = false;
  isDark = false;

  constructor(private router: Router) {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      this.isDark = true;
      document.documentElement.classList.add('dark');
    }
  }

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

  toggleTheme(): void {
    this.isDark = !this.isDark;
    if (this.isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }
}