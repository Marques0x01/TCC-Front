import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  ngOnInit(): void {
    this.createLoginForm();
  }

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) { }

  createLoginForm() {
    this.loginForm = this.fb.group({
      "email": [''],
      "password": [''],
    })
  }

  hasError() {
  }

  login() {
    this.userService.Login(this.loginForm.value).subscribe(response => {
      sessionStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/']);
    })
  }

}
