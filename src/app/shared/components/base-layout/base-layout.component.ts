import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  template: `
    <div class="page-container">
      <ng-content></ng-content>
      
      <!-- Background effects -->
      <div class="floating-background">
        <svg viewBox="0 0 1024 1024" class="absolute left-0 top-0 -z-10 h-[100vh] w-[100vw] opacity-30"
            aria-hidden="true">
            <circle cx="512" cy="212" r="412" fill="url(#gradient1)" fill-opacity="0.4">
                <animate attributeName="cy" values="212;612;212" dur="20s" repeatCount="indefinite" />
            </circle>
            <defs>
                <radialGradient id="gradient1" cx="0" cy="0" r="1"
                    gradientUnits="userSpaceOnUse" gradientTransform="rotate(45)">
                    <stop stop-color="#3498db"></stop>
                    <stop offset="1" stop-color="#2980b9" stop-opacity="0"></stop>
                </radialGradient>
            </defs>
        </svg>
      </div>
    </div>
  `
})
export class BaseLayoutComponent {}