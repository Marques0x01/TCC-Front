import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '@app/components/register/register.component';
import { HomeComponent } from '@app/components/home/home.component';
import { ProductSearchComponent } from '@app/components/product-search/product-search.component';
import { AccountComponent } from '@app/components/account/account.component';
import { ProductComponent } from '@app/components/product/product.component';
import { ProductRegisterComponent } from '@app/components/product-register/product-register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registrar', component: RegisterComponent },
  { path: 'conta', component: AccountComponent },
  { path: 'pesquisar', component: ProductSearchComponent },
  { path: 'produto', component: ProductComponent },
  { path: 'registrar-produto', component: ProductRegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
