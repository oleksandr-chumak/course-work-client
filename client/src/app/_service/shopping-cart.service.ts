import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Good} from "../_models/good";
import {ShoppingKartItem} from "../_models/shoppingKartItem";

@Injectable({
  providedIn:"root"
})
export class ShoppingCartService implements OnInit{
  private shoppingCartSubject:BehaviorSubject<ShoppingKartItem[]>;
  public shoppingCart$:Observable<ShoppingKartItem[]>;
  public get shoppingCartValue(){
    return this.shoppingCartSubject.value;
  }
  constructor() {
    this.shoppingCartSubject = new BehaviorSubject<ShoppingKartItem[]>([]);
    this.shoppingCart$ = this.shoppingCartSubject.asObservable();
  }

  ngOnInit(): void {
  }
  addToShoppingKart(good:Good){
    this.shoppingCartSubject.next(this.shoppingCartValue.concat({...good,count:1}));
    console.log(this.shoppingCartValue)
  }
  removeFromShoppingKart(id:string){
    this.shoppingCartSubject.next(this.shoppingCartValue.filter((value) => value._id !== id));
  }
  addAmount(id:string){
    this.shoppingCartSubject.next(this.shoppingCartValue.map((value) =>{
      if (value._id !== id){
        return value;
      }
      return {...value, count:value.count + 1};
    }))
  }
  removeAmount(id:string){
    this.shoppingCartSubject.next(this.shoppingCartValue.map((value) =>{
      if (value._id !== id){
        return value;
      }
      return {...value, count:value.count - 1};

    }))
  }
  isAddedToShoppingKart(id:string){
    return  !this.shoppingCartValue.find((value) => value._id === id)
  }
  getTotalPrice(){
    let totalPrice = 0;
    this.shoppingCartValue.forEach((value, index, array) =>{
      totalPrice += value.price * value.count;
    })
    return totalPrice;
  }
  createOrder(){
    console.log(this.dataSerialization())
  }

  private dataSerialization(){
    const newData = this.shoppingCartValue.map((value) =>{
      return {
        id:value._id,
        count:value.count
      }
    })

    return{
      data:newData,
      totalPrice:this.getTotalPrice()
    }


  }






}
