import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, catchError, Observable, switchMap, throwError} from "rxjs";
import {Good} from "../_models/good";
import {ShoppingKartItem} from "../_models/shoppingKartItem";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AccountService} from "./account.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn:"root"
})
export class ShoppingCartService implements OnInit{
  private shoppingCartSubject:BehaviorSubject<ShoppingKartItem[]>;
  public shoppingCart$:Observable<ShoppingKartItem[]>;
  public get shoppingCartValue(){
    return this.shoppingCartSubject.value;
  }
  constructor(
    private http:HttpClient,
    private accountService:AccountService,
    private router:Router
  ) {
    this.shoppingCartSubject = new BehaviorSubject<ShoppingKartItem[]>([]);
    this.shoppingCart$ = this.shoppingCartSubject.asObservable();
  }

  ngOnInit(): void {
  }
  addToShoppingKart(good:Good){
    this.shoppingCartSubject.next(this.shoppingCartValue.concat({...good,count:1}));
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
      const price = value.discount ? value.discount.newPrice : value.price
      totalPrice += price * value.count;
    })
    return totalPrice;
  }
  createOrder(){
    const data = this.dataSerialization();
    this.http.post(`${environment.apiUrl}/order/create`,data)
      .pipe(
        catchError((err) =>{
          return this.accountService.getNewAccessToken()
            .pipe(
              switchMap(() =>{
                return this.http.post(`${environment.apiUrl}/order/create`,data);
              }),
              catchError((err) =>{
                return throwError(err)
              })
            )
        })
      )
      .subscribe(async () => {
        this.shoppingCartSubject.next([]);
        await this.router.navigate(["/"]);
    })
  }

  private dataSerialization(){
    const newData = this.shoppingCartValue.map((value) =>{
      const price = value.discount ? value.discount.newPrice : value.price
      return {
        data:value._id,
        orderCount:value.count,
        price
      }
    })
    return{
      data:newData,
      totalPrice:this.getTotalPrice()
    }
  }
}
