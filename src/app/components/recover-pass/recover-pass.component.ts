import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utils } from '@app/utils/utils';
import { ApiService } from '@app/services/api.service';
import { DialogModals } from '@app/utils/dialog-modals';

@Component({
  selector: 'app-recover-pass',
  templateUrl: './recover-pass.component.html',
  styleUrls: ['./recover-pass.component.scss']
})
export class RecoverPassComponent implements OnInit {

  public emailForm: FormGroup;
  public tokenForm: FormGroup;
  public passwordForm: FormGroup;
  public phase: string = "emailSend";
  public utils: Utils = new Utils();

  constructor(private fb: FormBuilder, private router: Router, private service: ApiService, private dialog: DialogModals) { }

  ngOnInit(): void {
    this.createEmailForm();
    this.createPasswordForm();
    this.createTokenForm();
  }

  public navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  public createEmailForm(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]]
    })
  }

  public createTokenForm(): void {
    this.tokenForm = this.fb.group({
      token: ['', [Validators.required]]
    })
  }

  public createPasswordForm(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
    }, { validator: this.checkIfMatchingPasswords('password', 'passwordConfirmation') })
  }

  public checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
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

  public sendConfirmationEmail(): void {
    if(this.emailForm.invalid){
      return;
    }

    this.service.SendConfirmationEmail(this.emailForm.get('email').value).subscribe(response => {
      this.phase = "tokenConfirmation";
    }, error => {
      this.dialog.error("Houve um problema ao enviar o email de confirmação", "Verifique se o e-mail está correto")
    });
  }

  public confirmToken(): void {
    if(this.tokenForm.invalid){
      return;
    }

    this.service.ConfirmToken(this.tokenForm.get('token').value, this.emailForm.get('email').value).subscribe(response => {
      if(response){
        this.phase = "passwordChange";
        this.tokenForm.get('token').setValue('');
      } else {
        this.dialog.error("Falha ao confirmar token")
      }
    }, error => {
      this.dialog.error("Falha ao confirmar token")
    });
  }

  public changePassword(): void {
    if(this.passwordForm.invalid){
      return;
    }
    
    this.service.RecoverPassword(this.emailForm.get('email').value, this.passwordForm.get('password').value).subscribe(response => {
      this.dialog.succes("Senha foi alterada com sucesso",null, () => this.navigate("login"));
    }, error => {
      this.dialog.error("Não foi possivel alterar a senha")
    });

  }

}
