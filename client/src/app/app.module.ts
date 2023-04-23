import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./_service/jwt.interceptor";
import { MainComponent } from './pages/main/main.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DropdownMenuComponent } from './components/UI/dropdown-menu/dropdown-menu.component';
import { CreateComponent } from './pages/create/create.component';
import { UploadImageComponent } from './components/upload-image/upload-image.component';
import { GoodComponent } from './components/good/good.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    NotFoundPageComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    MainComponent,
    LayoutComponent,
    DropdownMenuComponent,
    CreateComponent,
    UploadImageComponent,
    GoodComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor,multi:true},
    UploadImageComponent
  ],
  exports:[UploadImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {


}
