import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/core/http/user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  showError = false;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.showError = false;
      this.showSuccess = false;

      // this.userService.forgotPassword(this.forgotPasswordForm.get('email')?.value).subscribe({
      //   next: () => {
      //     this.isLoading = false;
      //     this.showSuccess = true;
      //   },
      //   error: () => {
      //     this.isLoading = false;
      //     this.showError = true;
      //   }
      // });
    }
  }
}
