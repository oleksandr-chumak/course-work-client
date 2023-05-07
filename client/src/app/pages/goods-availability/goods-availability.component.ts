import {Component, OnInit} from '@angular/core';
import {GoodsAvailabilityService} from "../../_service/goods-availability.service";

@Component({
  selector: 'app-goods-availability',
  templateUrl: './goods-availability.component.html',
  styleUrls: ['./goods-availability.component.scss']
})
export class GoodsAvailabilityComponent implements OnInit{
  constructor(
    public goodsAvailabilityService:GoodsAvailabilityService
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.goodsAvailabilityService.get()
  }
  parseDate(dateInString:string){
    const timeInSecond = Date.parse(dateInString);
    const newDate = new Date(timeInSecond);
    return newDate.toUTCString();
  }

}
