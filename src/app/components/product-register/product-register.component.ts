import { Component, OnInit } from '@angular/core';
import { RentTypeModel } from '@app/models/rentType.model';
import { CategoriesModel } from '@app/models/categories.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utils } from '@app/utils/utils';
import { ApiService } from '@app/services/api.service';
import { ProductRegister } from '@app/models/product.model';
import { AddressProductRegister } from '@app/models/address.model';
import { User } from '@app/models/user';
import { DialogModals } from '@app/utils/dialog-modals';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss']
})
export class ProductRegisterComponent implements OnInit {

  public rentTypes: Array<Object> = RentTypeModel.rentTypes;
  public categories: Array<Object> = CategoriesModel.categories;
  public registerForm: FormGroup;
  public invalidTerms: Boolean = false;
  public utils: Utils = new Utils();
  public selectedFile: any = [];


  constructor(private fb: FormBuilder, private service: ApiService, public dialog: DialogModals) { }

  ngOnInit(): void {
    this.createForm();
  }

  public findLocationByZipCode() {
    if (this.registerForm.get('zipCode').value.length < 8) {
      return;
    }

    this.service.GetCityAndStateByCEP(this.registerForm.get('zipCode').value).subscribe(response => {
      let location: any = response;

      if (location.erro) {
        this.registerForm.get('zipCode').setErrors({ 'notFound': true });
        return;
      }


      this.registerForm.get('state').setValue(location.uf);
      this.registerForm.get('city').setValue(location.localidade);
      this.registerForm.get('neighborhood').setValue(location.bairro);
      this.registerForm.get('street').setValue(location.logradouro);

    })

  }

  public createForm(): void {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', Validators.required],
      rentType: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      category: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      street: [{ value: '', disabled: true }],
      neighborhood: [{ value: '', disabled: true }],
      city: [{ value: '', disabled: true }],
      state: [{ value: '', disabled: true }],
      termEmail: [false, Validators.requiredTrue],
      termNumber: [false],
      term: [false, Validators.requiredTrue],
      images: [[]]
    })
  }



  public registerProduct(): void {
    this.invalidTerms = false;

    if (!this.registerForm.valid) {
      this.invalidTerms = !this.isTermsValid();

      if (this.selectedFile && this.selectedFile.length < 1) {
        this.registerForm.get('images').setErrors({ 'imageNotLoaded': true });
      }

      return;
    }

    let productRegister: ProductRegister = this.buildProduct();

    this.service.ProductSave(productRegister).subscribe(async response => {
      console.log(response);

      let product = <ProductRegister>response;
      this.uploadImage(product.id);
      this.invalidTerms = false;
    })

  }

  public buildProduct(): ProductRegister {
    let forms = this.registerForm.value;

    let address: AddressProductRegister = {
      zipCode: this.registerForm.get('zipCode').value,
      street: this.registerForm.get('street').value,
      district: this.registerForm.get('neighborhood').value,
      city: this.registerForm.get('city').value,
      state: this.registerForm.get('state').value,
      country: 'Brasil'
    }

    let user = <User>JSON.parse(sessionStorage.getItem('user'));

    let product: ProductRegister = {
      title: forms.title,
      price: forms.price,
      rentType: forms.rentType,
      description: forms.description,
      category: forms.category,
      isPhoneVisible: forms.termNumber,
      address: address,
      userId: user.id
    }

    return product;
  }

  public isTermsValid(): boolean {
    if (this.registerForm.get('termEmail').value &&
      this.registerForm.get('term').value) {
      return true;
    }
    return false;
  }


  public onFileChanged(event: any): void {
    if (this.selectedFile.length == 5) {
      return;
    }
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        if (this.selectedFile.length == 5) {
          this.dialog.error("Não é possivel carregar mais de 5 imagens");
          return;
        }
        this.selectedFile.push(event.target.files[i])
      }

    }
  }

  public removeImage(index: number): void {
    this.selectedFile.splice(index, 1);
  }

  public uploadImage(productId: number): void {
    if (this.selectedFile || this.selectedFile.length > 0) {
      for (let i = 0; i < this.selectedFile.length; i++) {
        this.service.ImageSave(this.selectedFile[i], productId).subscribe(response => {
          console.log(response);
        })
      }
    }
  }

  retrieveResonse
  base64Data
  retrievedImage = null
  getImage() {
    this.service.teste2().subscribe(response => {
      this.retrieveResonse = response;
      this.base64Data = this.retrieveResonse.picByte;
      this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    })
  }



}
