import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../_service/order.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit{
  constructor(
    public orderService:OrderService
  ) {
  }
  ngOnInit(): void {
    this.orderService.get()
  }

}
