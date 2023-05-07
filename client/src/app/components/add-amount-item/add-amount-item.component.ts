import {Component, Input} from '@angular/core';
import {Good} from "../../_models/good";
import {HelperService} from "../../_service/helper.service";
import {WriteOffService} from "../../_service/write-off.service";

@Component({
  selector: 'app-add-amount-item',
  templateUrl: './add-amount-item.component.html',
  styleUrls: ['./add-amount-item.component.scss']
})
export class AddAmountItemComponent {
  @Input() goodData:Partial<Good>
  constructor(
    public helperService:HelperService,
    private writeOffService:WriteOffService
  ) {
  }

  onClick() {
    this.writeOffService.selectedGood = this.goodData
  }

  isSelected(){
    if (!this.writeOffService.selectedGood){
      return false;
    }
      return this.writeOffService.selectedGood._id === this.goodData._id;
  }
}
