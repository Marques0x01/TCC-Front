import { Component, OnInit } from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductBasicData } from '@app/models/product.model';
import { RentType } from '@app/models/rentType.model';
import { Image } from '@app/models/image.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  public product: ProductBasicData;
  public rentType: RentType = RentType.types;
  public loading: boolean;
  public mainImage: Image;

  constructor(private service: ApiService, private router: Router, private routeParams: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loading = true;
    let id;
    this.routeParams.queryParams.subscribe(params => {
      id = params.id;
    });
    this.service.GetProduct(id).subscribe(response => {
      this.product = <ProductBasicData>response;
      this.product.images.forEach(image => {
        image.picByte = 'data:image/jpeg;base64,' + image.picByte;
      });
      this.mainImage = this.product.images[0];
      this.loading = false;
    })
  }

  public onClickImage(i): void {
    this.mainImage = this.product.images[i];
  }

  public goToWpp(): void {
    window.open('https://api.whatsapp.com/send?phone=' + this.product.user.phoneNumber,'_blank') 
  }



}
