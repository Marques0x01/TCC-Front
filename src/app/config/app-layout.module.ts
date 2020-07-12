import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../views/home/home.component';
import { HeaderComponent } from '../shared/header/header.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppLayoutModule { }

export const Components = [HomeComponent, HeaderComponent, LoginComponent, RegisterComponent, LoginComponent, RegisterComponent]
