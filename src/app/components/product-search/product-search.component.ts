import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriesModel } from '@app/models/categories.model';
import { RentTypeModel } from '@app/models/rentType.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { Utils } from '@app/utils/utils';
import { ProductSearchResult, ProductSearch } from '@app/models/product.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  public categories: Array<Object> = CategoriesModel.categories;
  public rentTypes: Array<Object> = RentTypeModel.rentTypes;
  public searchForm: FormGroup;
  public states: any;
  public cities: any;
  private utils: Utils = new Utils;
  public product: ProductSearch = new ProductSearch();
  public products: Array<ProductSearchResult> = [];
  public resultCount: number = 0;


  public constructor(private route: ActivatedRoute, private fb: FormBuilder, private service: ApiService) {
    this.route.queryParams.subscribe(params => {
      if (params && params.title) {
        this.product.title = <string>params.title;
      }
      this.searchProduct(this.product);

    });
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.getStates()
  }

  public onSearchProduct(): void {
    this.product = this.searchForm.value;
    let city = this.searchForm.get('city').value;
    let state = this.searchForm.get('state').value;
    if (city) {
      this.product.city = city.nome;
    }
    if (state) {
      this.product.state = state.sigla;
    }
    this.searchProduct(this.product);
  }

  public searchProduct(product?: ProductSearch): void {
    this.service.SearchProduct(product).subscribe(response => {
      this.products = <Array<ProductSearchResult>>response;
      this.products.forEach(item => {
        item.image.picByte = 'data:image/jpeg;base64,' + item.image.picByte;
      });
      this.resultCount = this.products.length;
    })
  }

  public createSearchForm(): void {
    this.searchForm = this.fb.group({
      title: [""],
      category: [null],
      rentType: [null],
      minPrice: [""],
      maxPrice: [""],
      state: [],
      city: []
    })
  }

  getStates() {
    this.service.GetStates().subscribe(response => {
      this.states = this.utils.orderArray(<Array<any>>response, "nome");
    })

  }

  onSelectState(): void {
    let state = this.searchForm.get('state').value;
    this.cities = [];

    if (state) {
      this.service.GetCities(state.id).subscribe(response => {
        this.cities = this.utils.orderArray(<Array<any>>response, "nome");
      })
    }

  }

}
