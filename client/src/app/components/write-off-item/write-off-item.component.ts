import {Component, Input} from '@angular/core';
import {WriteOffGood} from "../../_interface/write-off-good";
import {HelperService} from "../../_service/helper.service";
import {WriteOffService} from "../../_service/write-off.service";

@Component({
  selector: 'app-write-off-item',
  templateUrl: './write-off-item.component.html',
  styleUrls: ['./write-off-item.component.scss']
})
export class WriteOffItemComponent {
  @Input() writeOffItemValue:WriteOffGood
  constructor(
    public helperService:HelperService,
    private writeOffService:WriteOffService
  ) {
  }
  onClick() {
    this.writeOffService.selectedGood = this.writeOffItemValue
  }
  isSelected() {
    if (!this.writeOffService.selectedGood){
      return false;
    }
    return this.writeOffItemValue._id === this.writeOffService.selectedGood._id
  }

}
