import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  template: `
    <div 
      *ngIf="show"
      class="fixed top-4 right-4 max-w-sm bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/10 p-4 transform transition-transform duration-300"
      [class.translate-x-0]="show"
      [class.translate-x-full]="!show">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-white">{{message}}</p>
        </div>
        <button 
          (click)="onClose()"
          class="ml-4 text-gray-400 hover:text-white">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  `
})
export class NotificationComponent {
  @Input() message = '';
  @Input() show = false;

  onClose(): void {
    this.show = false;
  }
}