import {Component, Input} from '@angular/core';
import {ShoppingKartItem} from "../../_models/shoppingKartItem";
import {environment} from "../../../environments/environment";
import {ShoppingCartService} from "../../_service/shopping-cart.service";
import {HelperService} from "../../_service/helper.service";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent {
  @Input() goodValue:ShoppingKartItem;
  constructor(public shoppingKartService:ShoppingCartService,
              public helperService:HelperService
  ) {
  }

}
