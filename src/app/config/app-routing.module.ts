import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '@app/components/register/register.component';
import { HomeComponent } from '@app/components/home/home.component';
import { ProductSearchComponent } from '@app/components/product-search/product-search.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'registrar', component: RegisterComponent},
  { path: 'pesquisar', component: ProductSearchComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
