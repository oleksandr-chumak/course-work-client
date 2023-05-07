import {Component, OnInit} from '@angular/core';
import {InventoryService} from "../../_service/inventory.service";

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit{
  constructor(
    public inventoryService:InventoryService
  ) {
  }
  async ngOnInit(): Promise<void> {
    await this.inventoryService.get()
  }

}
