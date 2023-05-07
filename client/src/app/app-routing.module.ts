import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";
import {MainComponent} from "./pages/main/main.component";
import {CreateComponent} from "./pages/create/create.component";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";
import {UserAuthorizedGuard} from "./guard/user-authorized.guard";
import {UserUnauthorizedGuard} from "./guard/user-unauthorized.guard";
import {OrdersComponent} from "./pages/orders/orders.component";
import {DiscountComponent} from "./pages/discount/discount.component";
import {WriteOffComponent} from "./pages/write-off/write-off.component";
import {InventoryComponent} from "./pages/inventory/inventory.component";
import {GoodsAvailabilityComponent} from "./pages/goods-availability/goods-availability.component";

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "login", component: LoginPageComponent ,canActivate:[UserAuthorizedGuard]},
  {path: "registration", component: RegistrationPageComponent ,canActivate:[UserAuthorizedGuard]},
  {path: "create", component: CreateComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "shopping-cart", component: ShoppingCartComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "orders", component:OrdersComponent,canActivate:[UserUnauthorizedGuard]},
  {path: "discount",component:DiscountComponent,canActivate:[UserUnauthorizedGuard]},
  {path: "write-off", component: WriteOffComponent, canActivate:[UserUnauthorizedGuard]},
  {path: "inventory", component: InventoryComponent, canActivate:[UserUnauthorizedGuard]},
  {path: "goods-availability", component: GoodsAvailabilityComponent, canActivate:[UserUnauthorizedGuard]},
  {path: "**", component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
