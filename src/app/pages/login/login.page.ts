import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Login form validation schema
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navController: NavController
  ) { }

  ngOnInit() {
  }
  // Navigate back to the home screen
  navigateBack() {
    this.navController.navigateBack('home');
  }

  // Handle login form on submission
  async onSubmit() {
    // Check if the form is valid
    if(this.loginForm.valid) {
      // Get the login values
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      // Sign in with firebase auth or be send back to home
      await this.authService.signIn(email, password);
    }
  }
}
