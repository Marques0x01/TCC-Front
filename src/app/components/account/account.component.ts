import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { UserView, User } from '@app/models/user';
import { FormGroup, FormBuilder, Form, Validators } from '@angular/forms';
import { Utils } from '@app/utils/utils';
import { FormsValidator } from '@app/utils/forms-validator';
import { AddressUpdate } from '@app/models/address.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public isConfig: boolean = false;
  public user: UserView;
  public dataForm: FormGroup;
  public addressForm: FormGroup;
  public emailChangeForm: FormGroup;
  public passwordChangeForm: FormGroup;
  public utils: Utils = new Utils();

  constructor(private service: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createDataForm();
    this.createAddressForm();
    this.createEmailChangeForm();
    this.createPasswordChangeForm();
    this.getUser();
  }


  public getUser(): void {
    let user = JSON.parse(sessionStorage.getItem('user'));
    this.service.GetUser(user.id).subscribe(response => {
      this.user = <UserView>response;
      this.setUserInfo();
    })
  }

  public findLocationByZipCode(): void {
    if (this.addressForm.get('zipCode').value.length < 8) {
      return;
    }

    this.service.GetCityAndStateByCEP(this.addressForm.get('zipCode').value).subscribe(response => {
      let location: any = response;

      if (location.erro) {
        this.addressForm.get('zipCode').setErrors({ 'notFound': true });
        return;
      }

      this.addressForm.get('state').setValue(location.uf);
      this.addressForm.get('city').setValue(location.localidade);
      this.addressForm.get('district').setValue(location.bairro);
      this.addressForm.get('street').setValue(location.logradouro);
    })

  }


  public setUserInfo() {
    Object.keys(this.dataForm.controls).forEach(data => {
      if (this.user[data]) {
        this.dataForm.get(data).setValue(this.user[data])
      }
    });

    if (this.user.address != null) {
      Object.keys(this.addressForm.controls).forEach(data => {
        if (this.user.address[data]) {
          this.addressForm.get(data).setValue(this.user.address[data]);
        }
      });
      this.findLocationByZipCode();
    }
  }

  public saveData(): void {
    if(this.dataForm.invalid){
      return;
    }
    let user: UserView = this.dataForm.getRawValue();
    delete this.user.address;

    if (JSON.stringify(this.user) == JSON.stringify(user)) {
      return;
    }

    this.service.UpdateUser(user).subscribe(response => {
      this.getUser();
    })

  }

  public saveAddress(): void {
    if(this.addressForm.invalid){
      return;
    }
    let address: AddressUpdate = this.addressForm.getRawValue();
    address.userId = this.user.id;
    address.country = "Brasil";


    this.service.UpdateAddress(address).subscribe(response => {
      this.getUser();
    })

  }

  public createDataForm(): void {
    this.dataForm = this.fb.group({
      id: [''],
      name: [{ value: '', disabled: true }],
      lastName: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      cpf: ['', [Validators.minLength(11), Validators.maxLength(11), FormsValidator.onlyNumbers]],
      phoneNumber: ['', [Validators.minLength(9), FormsValidator.onlyNumbers]],
      gender: [''],

    })
  }

  public createAddressForm(): void {
    this.addressForm = this.fb.group({
      zipCode: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8), FormsValidator.onlyNumbers]],
      district: [{ value: '', disabled: true }],
      street: [{ value: '', disabled: true }],
      number: ['', [Validators.required, FormsValidator.onlyNumbers]],
      complement: [''],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }]
    })
  }

  public createEmailChangeForm(): void {
    this.emailChangeForm = this.fb.group({
      email: [''],
      emailConfirmation: ['']
    })
  }

  public createPasswordChangeForm(): void {
    this.passwordChangeForm = this.fb.group({
      oldPassword: [''],
      password: [''],
      passwordConfirmation: ['']
    })
  }



}
