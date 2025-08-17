import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="min-h-[60vh] flex items-center justify-center text-center">
      <div>
        <h1 class="text-4xl font-bold text-white mb-2">404</h1>
        <p class="text-gray-300 mb-6">The page you are looking for does not exist.</p>
        <a routerLink="/" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go Home</a>
      </div>
    </div>
  `
})
export class NotFoundComponent {}