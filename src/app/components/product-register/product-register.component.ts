import { Component, OnInit } from '@angular/core';
import { RentTypeModel } from '@app/models/rentType.model';
import { CategoriesModel } from '@app/models/caregories.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Utils } from '@app/utils/utils';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }

  public createForm(): void {
    this.registerForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', Validators.required],
      rentType: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(120)]],
      category: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      termEmail: [false, Validators.requiredTrue],
      termNumber: [false, Validators.requiredTrue],
      term: [false, Validators.requiredTrue]
    })
  }

  public registerProduct(): void {
    this.invalidTerms = false;
    if (!this.registerForm.valid) {
      this.invalidTerms = !this.isTermsValid();
      return;
    }
    this.invalidTerms = false;
  }

  public isTermsValid() {
    if (this.registerForm.get('termEmail').value &&
      this.registerForm.get('termNumber').value &&
      this.registerForm.get('term').value) {
      return true;
    }
    return false;
  }

}
