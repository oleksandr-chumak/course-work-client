import {Component, Input} from '@angular/core';
import {Good} from "../../_models/good";
import {environment} from "../../../environments/environment";
import {ShoppingCartService} from "../../_service/shopping-cart.service";

@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.scss']
})
export class GoodComponent {
  @Input() goodData:Good;
  constructor(public shoppingCartService:ShoppingCartService) {
  }
  getImageUrl(url:string){
    return `${environment.apiUrl}/${url}`
  }
  getFormattedPrice(price:number){
    const formattedPrice = price.toString().split("")
      .reduce((previousValue, currentValue, currentIndex, array) =>{
        return currentIndex - array.length % 3 === 0 ? previousValue.concat(` ${currentValue}`) : previousValue.concat(currentValue);
    })
    return formattedPrice;
  }
  addToShoppingKart(){
    this.shoppingCartService.addToShoppingKart(this.goodData);
  }

  removeFromShoppingKart(){
    this.shoppingCartService.removeFromShoppingKart(this.goodData._id);
  }


}
