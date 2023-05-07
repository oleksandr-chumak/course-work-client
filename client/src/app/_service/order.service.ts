import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, switchMap, throwError} from "rxjs";
import {Order} from "../_models/order";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AccountService} from "./account.service";

@Injectable({
  providedIn:"root"
})
export class OrderService{
  private orderSubject:BehaviorSubject<Order[] >
  public order$:Observable<Order[] >
  public isLoading:boolean = false;

  public get orderValue(){
    return this.orderSubject.value;
  }
  constructor(
    private http:HttpClient,
    private accountService:AccountService
  ) {
    this.orderSubject = new BehaviorSubject<Order[]>([]);
    this.order$ = this.orderSubject.asObservable();
  }
  get(){
    this.isLoading = true
    this.http.get<Order[]>(`${environment.apiUrl}/order/get/all`)
      .pipe(
        catchError(() =>{
          return this.accountService.getNewAccessToken()
            .pipe(
              switchMap(() =>{
                return this.http.get<Order[]>(`${environment.apiUrl}/order/get/all`);
              }),
              catchError(err => {
                return throwError(err);
              })
            )
        })
      )
      .subscribe((value) =>{
        console.log(value)
        this.isLoading = false
        this.orderSubject.next(value);
    })
  }
}
