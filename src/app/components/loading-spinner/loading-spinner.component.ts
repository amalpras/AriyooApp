import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="relative">
        <div class="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <div class="mt-4 text-white text-center">Loading...</div>
      </div>
    </div>
  `
})
export class LoadingSpinnerComponent {}