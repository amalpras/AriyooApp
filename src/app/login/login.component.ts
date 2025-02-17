import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/http/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe(
        response => {
          console.log('Login successful', response);
          localStorage.setItem('loggedin_user',JSON.stringify(response)); 

          this.router.navigate(['/']); // Navigate to /home route
        },
        error => {
          console.error('Login failed', error);
          this.error = true;
        }
      );
    } else {
      this.error = true;
    }
  }
}
