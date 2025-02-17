import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  service = inject(AuthService);
  form : FormGroup = new FormGroup({
    user : new FormControl('', [Validators.required, Validators.minLength(3)]),
    password : new FormControl('', [Validators.required, Validators.minLength(2)])
  });

  

  onSubmit(){
      const userName = this.form.controls['user']?.value;
      const password = this.form.controls['password']?.value;
      const session = this.service.login(userName, password)
      this.service.redirectToRoleBasedPage();

  }
}
