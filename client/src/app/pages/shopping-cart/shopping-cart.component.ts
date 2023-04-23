import { Component } from '@angular/core';
import {ShoppingCartService} from "../../_service/shopping-cart.service";
import {HelperService} from "../../_service/helper.service";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  constructor(
    public shoppingCartService:ShoppingCartService,
    public helperService:HelperService
  ) {
  }

}
