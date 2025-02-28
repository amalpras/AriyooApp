import { Component } from '@angular/core';
import { NewsletterService } from 'src/core/http/newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {
  constructor(private readonly newsletterService:NewsletterService){};

  addNewsletter(email: string) {
    this.newsletterService.addNewsletter(email).subscribe({
      next: (response) => {
        alert('You have been subscribed to our newsletter');
      },
      error: (error) => {
        alert('There was an error subscribing to our newsletter');  
    }});
  }

}
