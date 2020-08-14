import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { UserRegister } from '@app/models/user';
import { Router } from '@angular/router';
import { Utils } from '@app/utils/utils';
import { FormsValidator } from '@app/utils/forms-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public utils: Utils = new Utils();
  public failedToRegister: boolean = false;

  ngOnInit(): void {
    this.checkLogin();
    this.createRegisterForm();
  }

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {

  }

  checkLogin() {
    sessionStorage.getItem('user');
  }

  register() {
    this.failedToRegister = false;

    if(!this.registerForm.valid){
      return;
    }
    
    let forms = this.registerForm.value;
    let user: UserRegister = {
      name: forms.name,
      lastName: forms.lastName,
      email: forms.email,
      password: forms.password
    }
    this.userService.Register(user).subscribe(response => {
      this.router.navigate(["login"]);
    }, error => {
      this.failedToRegister = true;
      this.registerForm.get('email').setValue('');
      this.registerForm.get('email').setErrors({wrongData: true});
      this.registerForm.get('email').setErrors({required: false});
    })
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, FormsValidator.emptyString, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, FormsValidator.emptyString]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required]]
    }, { validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation') })
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
        passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
        return passwordConfirmationInput.setErrors(null);
      }
    }
  }
}