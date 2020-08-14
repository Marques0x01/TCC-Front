import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpInterceptor, HttpBackend } from '@angular/common/http';
import { UserLogin, UserRegister } from '../models/user';
import { environment } from '../../environments/environment.dev';
import { Router } from '@angular/router';
import { ProductRegister } from '@app/models/product.model';


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

  Logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('/login');
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

  ImageSave(file: File, product: number) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('productId', product.toString());

    return this.http.post(this.baseUrl + '/image', formData, { reportProgress: true, responseType: 'json' })
  }

  teste2() {

    return this.http.get(this.baseUrl + `/product/${1}`);
  }
}
