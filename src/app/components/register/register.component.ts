import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { UserRegister } from '@app/models/user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  ngOnInit(): void {
    this.checkLogin();
    this.createRegisterForm();
  }

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) {

  }

  checkLogin(){
    sessionStorage.getItem('user');
  }

  register() {
    let forms = this.registerForm.value;
    let user: UserRegister = {
      name: forms.name,
      email: forms.email,
      password: forms.password
    }

    this.userService.Register(user).subscribe(response => {
      this.router.navigate(["login"]);
    })
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      "name": [''],
      "email": [''],
      "password": [''],
      "passwordConfirmation": ['']
    })
  }

}
