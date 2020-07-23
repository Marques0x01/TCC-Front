import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomeComponent } from '@app/components/home/home.component';
import { DialogComponent } from '@app/shared/dialog/dialog.component';
import { FooterComponent } from '@app/shared/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppLayoutModule { }

export const Components = [HomeComponent, HeaderComponent, LoginComponent, RegisterComponent, DialogComponent, FooterComponent]
