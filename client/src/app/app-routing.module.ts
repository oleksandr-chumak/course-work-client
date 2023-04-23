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

const routes: Routes = [
  {path: '', component: MainComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "login", component: LoginPageComponent ,canActivate:[UserAuthorizedGuard]},
  {path: "registration", component: RegistrationPageComponent ,canActivate:[UserAuthorizedGuard]},
  {path: "create", component: CreateComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "shopping-cart", component: ShoppingCartComponent, canActivate: [UserUnauthorizedGuard]},
  {path: "**", component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
