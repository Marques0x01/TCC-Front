import { Component, OnInit } from '@angular/core';
import { RentTypeModel } from '@app/models/rentType.model';
import { CategoriesModel } from '@app/models/caregories.model';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.scss']
})
export class ProductRegisterComponent implements OnInit {

  public rentTypes: Array<Object> = RentTypeModel.rentTypes;
  public categories: Array<Object> = CategoriesModel.categories;

  constructor() { }

  ngOnInit(): void {
  }

}
