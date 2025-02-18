import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUser } from '../models/tag.model';
import { AuthService } from 'src/core/http/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  flname: string = '';
  confirmPassword: string = '';


  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const newUser:RegisterUser = {  
      email: this.email,
      password: this.password,
      flname: this.flname,
      isSeeker: true,
      isSolver: false
    }

    this.authService.register(newUser).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      error => {
        alert('Registration failed: ' + error.message);
      }
    );
    
    
  }
}
