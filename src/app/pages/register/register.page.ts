import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  // Register form validation schema
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    repeatPassword: ['', [Validators.required]],
  }, { validators: this.passwordMatchValidator });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navController: NavController
  ) { }

  // Check if the pasword and repeat password are matching
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repeatPassword').value
    ? null : { match : true };
  }

  ngOnInit() {
  }

  // Navigate back to the home screen
  navigateBack() {
    this.navController.navigateBack('home');
  }

  // Handle register form on submission
  async onSubmit() {
    // Check if register form is valid
    if(this.registerForm.valid) {
      // Get the values
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      // register new user and navigate to characters screen
      await this.authService.signUp(email, password);
    }
  }
}
