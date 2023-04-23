import {Component, OnInit} from '@angular/core';
import {GoodsService} from "../../_service/goods.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  constructor(public goodsService:GoodsService) {
  }
  ngOnInit(): void {
    this.goodsService.getAll();
  }


}
