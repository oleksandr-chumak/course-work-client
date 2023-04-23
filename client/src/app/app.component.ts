import {Component, OnInit} from '@angular/core';
import {AccountService} from "./_service/account.service";
import {catchError, throwError} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {AccessToken} from "./_interface/accessToken";
import {User} from "./_models/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public accountService: AccountService,
    private route: Router
  ) {
    this.accountService.user.subscribe(value => {
      console.log("это юзер")
      console.log(value)
    })
    this.route.events.subscribe(event => {
      let credentials: string | null = localStorage.getItem("credentials");
      if (event instanceof NavigationEnd && !this.accountService.userValue && credentials !== null) {
        this.accountService.getMe();
      }
    })
  }

  ngOnInit(): void {

  }
}
