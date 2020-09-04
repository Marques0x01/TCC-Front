import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpBackend } from '@angular/common/http';
import { UserLogin, UserRegister, UserView } from '../models/user';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';
import { ProductRegister, ProductSearch } from '@app/models/product.model';
import { AddressUpdate } from '@app/models/address.model';
import { CategoriesEnum } from '@app/models/categories.model';


@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  private http: HttpClient;

  constructor(private httpInterceptor: HttpClient, private handler: HttpBackend, private router: Router) {
    this.http = new HttpClient(handler);
  }

  // Http Headers
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  Register(user: UserRegister) {
    return this.http.post(this.baseUrl + '/auth/signup', user);
  }

  Login(user: UserLogin) {
    return this.http.post(this.baseUrl + '/auth/signin', user);
  }

  Renew(email: string) {
    return this.http.get(this.baseUrl + `/auth/renew?email=${email}`);
  }

  Logout() {
    sessionStorage.removeItem('user');
  }

  GetAllUsers() {
    return this.http.get(this.baseUrl + '/user');
  }

  GetCityAndStateByCEP(cep: string) {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  GetStates() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  GetCities(state: string) {
    return this.http.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`);
  }

  ProductSave(product) {
    return this.httpInterceptor.post(this.baseUrl + "/product", product);
  }

  GetAllProducts() {
    return this.http.get(this.baseUrl + "/product");
  }

  GetProduct(id: number) {
    return this.http.get(this.baseUrl + `/product/${id}`);
  }

  GetUser(id: number) {
    return this.httpInterceptor.get(this.baseUrl + `/user/${id}`);
  }

  UpdateUser(user: UserView) {
    return this.httpInterceptor.put(this.baseUrl + '/user', user);
  }

  UpdateAddress(address: AddressUpdate) {
    return this.httpInterceptor.put(this.baseUrl + "/address", address);
  }

  SearchProduct(product: ProductSearch) {
    return this.http.post(this.baseUrl + "/product/search", product);
  }

  SendConfirmationEmail(email: string) {
    const formData: FormData = new FormData();
    formData.append('email', email);

    return this.httpInterceptor.get(this.baseUrl + "/user/confirmation-email?email=" + email);
  }

  ConfirmToken(token: string, email: string) {
    return this.httpInterceptor.get(this.baseUrl + `/user/confirmation-token?email=${email}&token=${token}`);
  }

  ChangeEmail(oldEmail: string, email: string) {
    return this.httpInterceptor.get(this.baseUrl + `/user/change-email?email=${email}&oldEmail=${oldEmail}`);
  }

  ChangePassword(id: number, password: string, oldPassword: string) {
    let params = new HttpParams()
      .set('password', password)
      .set('oldPassword', oldPassword);

    return this.httpInterceptor.get(this.baseUrl + `/user/change-password/${id}`, {params: params});
  }

  ImageSave(file: File, product: number) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('productId', product.toString());

    return this.httpInterceptor.post(this.baseUrl + '/image', formData, { reportProgress: true, responseType: 'json' })
  }
}
