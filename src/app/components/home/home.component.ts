import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from '@angular/router';
import { CategoriesModel } from '@app/models/categories.model';
import { RentTypeModel } from '@app/models/rentType.model';
import { ApiService } from '@app/services/api.service';
import { ProductView } from '@app/models/product.model';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  public categories: Array<Object> = CategoriesModel.categories;
  public rentTypes: Array<Object> = RentTypeModel.rentTypes;
  public search: string;
  public products: Array<ProductView>;


  ngOnInit(): void {
    this.getAllImages();
  }

  constructor(private router: Router, private service: ApiService) { }

  public onSearch(): void {
    if (!this.search || this.search == "") {
      return null;
    }
    let navigationExtras: NavigationExtras = {
      queryParams: {
        textSearched: this.search
      }
    };
    this.router.navigate(["/pesquisar"], navigationExtras);
  }

  public goToProduct(id){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        id: id
      }
    };
    this.router.navigate(["/produto"], navigationExtras);
  }

  public getAllImages(): void {
    this.service.GetAllProducts().subscribe(response => {
      this.products = <Array<ProductView>>response;
      this.products.forEach(product => {
        let base64Data = product.image.picByte;
        product.image.data = 'data:image/jpeg;base64,' + base64Data;
      });
    })
  }
}
