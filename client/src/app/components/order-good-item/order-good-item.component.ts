import {Component, Input} from '@angular/core';
import {HelperService} from "../../_service/helper.service";
import {Order, OrderGood} from "../../_models/order";

@Component({
  selector: 'app-order-good-item',
  templateUrl: './order-good-item.component.html',
  styleUrls: ['./order-good-item.component.scss']
})
export class OrderGoodItemComponent {
  @Input() order:OrderGood;
  @Input() index:number;
  constructor(
    public helperService:HelperService
  ) {
  }
  getTotalPrice(){
    console.log(this.order)
    return this.order.orderCount * this.order.price;
  }
}
