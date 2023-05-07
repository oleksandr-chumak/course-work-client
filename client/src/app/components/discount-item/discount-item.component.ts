import {Component, Input} from '@angular/core';
import {Discount} from "../../_models/discount";
import {HelperService} from "../../_service/helper.service";
import {DiscountService} from "../../_service/discount.service";

@Component({
  selector: 'app-discount-item',
  templateUrl: './discount-item.component.html',
  styleUrls: ['./discount-item.component.scss']
})
export class DiscountItemComponent {
  @Input() discountItemValue:Discount;
  constructor(
    private discountService:DiscountService,
    public helperService:HelperService
  ) {
  }
  isSelected(){
    if(!this.discountService.selectedItem){
      return false;
    }
    return this.discountService.selectedItem._id === this.discountItemValue._id
  }

  setSelectedItem() {
    this.discountService.selectedItem = this.discountItemValue;
  }
}
