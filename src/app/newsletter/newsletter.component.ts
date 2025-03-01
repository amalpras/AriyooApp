import { Component } from '@angular/core';
import { NewsletterService } from 'src/core/http/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  isLoading = false;
  showSuccess = false;

  constructor(private readonly newsletterService: NewsletterService) {}

  addNewsletter(email: string) {
    if (!email) return;
    
    this.isLoading = true;
    this.newsletterService.addNewsletter(email).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 3000);
      },
      error: (error) => {
        this.isLoading = false;
        alert('There was an error subscribing to our newsletter');
    }});
  }
}
