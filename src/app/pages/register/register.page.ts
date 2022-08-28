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

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('repeatPassword').value
    ? null : { match : true };
  }

  ngOnInit() {
  }

  navigateBack() {
    this.navController.navigateBack('home');
  }


  async onSubmit() {
    if(this.registerForm.valid) {
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;

      await this.authService.signUp(email, password);
    }
  }
}
