import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Router } from '@angular/router';
import { Utils } from '@app/utils/utils';
import { UserStatusEnum } from '@app/models/UserStatus.model';
import { DialogModals } from '@app/utils/dialog-modals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public failedToLogin: boolean = false;
  public utils: Utils = new Utils();
  public loading: boolean = false;

  ngOnInit(): void {
    this.createLoginForm();

  }

  constructor(private fb: FormBuilder, private userService: ApiService, private router: Router, private dialog: DialogModals) { }

  public createLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  public login(): void {
    this.failedToLogin = false;
    this.loading = true;
    if (!this.loginForm.valid) {
      return;
    }
    
    this.userService.Login(this.loginForm.value).subscribe((response: any) => {

      if (response.status != UserStatusEnum.ACTIVE) {
        this.userService.SendConfirmationEmail(response.email).subscribe(res => {
          this.dialog.authenticateUser(response, () => this.router.navigate(['/']));
        });

        return;
      }

      sessionStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/']);
    }, error => {
      this.failedToLogin = true;
      this.loginForm.get('password').setValue('');
      this.loginForm.get('password').setErrors({ wrongData: true });
      this.loginForm.get('password').setErrors({ required: false });
    })
    
    this.loading = false;

  }
}
