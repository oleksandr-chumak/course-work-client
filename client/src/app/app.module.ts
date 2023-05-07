import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import { OrdersComponent } from './pages/orders/orders.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderGoodItemComponent } from './components/order-good-item/order-good-item.component';
import { DiscountComponent } from './pages/discount/discount.component';
import {AppInitializer, AppInitializerFactory} from "./core/app-initializer";
import { LoadingComponent } from './components/UI/loading/loading.component';
import { DiscountItemComponent } from './components/discount-item/discount-item.component';
import { WriteOffComponent } from './pages/write-off/write-off.component';
import { WriteOffItemComponent } from './components/write-off-item/write-off-item.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { GoodsAvailabilityComponent } from './pages/goods-availability/goods-availability.component';
import { AddAmountComponent } from './components/add-amount/add-amount.component';
import { AddAmountItemComponent } from './components/add-amount-item/add-amount-item.component';

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
    ShoppingCartItemComponent,
    OrdersComponent,
    OrderItemComponent,
    OrderGoodItemComponent,
    DiscountComponent,
    LoadingComponent,
    DiscountItemComponent,
    WriteOffComponent,
    WriteOffItemComponent,
    InventoryComponent,
    GoodsAvailabilityComponent,
    AddAmountComponent,
    AddAmountItemComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AppInitializer,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi:true},
    {
      provide: APP_INITIALIZER,
      useFactory:AppInitializerFactory,
      deps:[AppInitializer],
      multi:true
    },
    UploadImageComponent
  ],
  exports:[UploadImageComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
