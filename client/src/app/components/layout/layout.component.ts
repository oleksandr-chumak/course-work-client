import {Component} from '@angular/core';
import {Titles} from "../UI/type/titles";
import {ShoppingCartService} from "../../_service/shopping-cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  goodTitles: Titles[] = [
    {
      name: 'Мої замовленаня',
      route: '/orders'
    }
  ]
  managerTitles: Titles[] = [
    {
      name: "Івентарізація",
      route: '/inventory'
    },
    {
      name: "Cтворити товар",
      route: "/create"
    },
    {
      name: "Уцінка",
      route: "/discount"
    },
    {
      name: "Списання",
      route:"/write-off"
    },
    {
      name: "База наявності товарів",
      route:"/goods-availability"
    }
  ]
  constructor(
    public shoppingKartService:ShoppingCartService,
    private route:Router
  ) {
  }
  async goToShoppingCart(){
    await this.route.navigate(['/shopping-cart'])
  }

}
