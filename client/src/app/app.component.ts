import {Component, OnInit} from '@angular/core';
import {AccountService} from "./_service/account.service";
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private currentRoute:string = "";
  public routeWithoutLayout:string[] = ["/login","/registration"];
  constructor(
    public accountService: AccountService,
    private route: Router
  ) {
    this.route.events.subscribe((value) =>{
      if(value instanceof NavigationEnd){
        this.currentRoute = value.url;
      }
    })
  }
  isRouteWithLayout(){
    return this.routeWithoutLayout.includes(this.currentRoute)
  }
  ngOnInit(): void {

  }
}
