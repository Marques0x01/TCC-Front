import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  RoutingComponents,
  AppRoutingModule,
} from './config/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Interceptor } from './config/interceptor.module';
import { MatIconModule } from '@angular/material/icon';
import { Components } from './config/app-layout.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 


@NgModule({
  declarations: [AppComponent, RoutingComponents, Components],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    Interceptor,
    MatIconModule,
    FontAwesomeModule,
    MatSidenavModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
  }
}
