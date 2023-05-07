import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AccountService} from "../_service/account.service";


@Injectable({
  providedIn: "root"
})
export class UserUnauthorizedGuard implements CanActivate {
  constructor(
    private accountService:AccountService,
    private router:Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.accountService.isAuthenticated()
    console.log("Чё выдаёт гуард про юзера")
    console.log(isAuthenticated)
    if(!isAuthenticated){
      return this.router.parseUrl("/login");
    }
    return true;


  }

}
