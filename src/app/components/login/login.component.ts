import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';
import { FormsValidator } from '@app/utils/forms-validator';
import { Utils } from '@app/utils/utils';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public failedToLogin: boolean = false;
  public utils: Utils = new Utils();

  ngOnInit(): void {
    this.createLoginForm();

  }

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router) { }

  public createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public login(): void {
    this.failedToLogin = false;
    if (this.loginForm.valid) {
      this.userService.Login(this.loginForm.value).subscribe(response => {
        sessionStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/']);
      }, error => {
        this.failedToLogin = true;
        this.utils.resetForm(this.loginForm);
      })
    }
  }


}
