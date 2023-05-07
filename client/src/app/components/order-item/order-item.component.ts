import {Component, Input} from '@angular/core';
import {Order} from "../../_models/order";
import {HelperService} from "../../_service/helper.service";

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {
  @Input() order:Order;
  @Input() index:number;
  constructor(public helperService:HelperService) {
  }
}
