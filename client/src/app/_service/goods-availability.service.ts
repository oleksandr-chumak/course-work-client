import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Good} from "../_models/good";


@Injectable({
  providedIn:"root"
})
export class GoodsAvailabilityService{
  private goodsAvailabilitySubject:BehaviorSubject<Good[]>
  public goodsAvailability:Observable<Good[]>
  constructor(
    private http:HttpClient
  ) {
    this.goodsAvailabilitySubject = new BehaviorSubject<Good[]>([])
    this.goodsAvailability = this.goodsAvailabilitySubject.asObservable()
    this.goodsAvailability.subscribe((value) =>{
      console.log(value)
    })
  }
  public get goodsAvailabilityValue(){
    return this.goodsAvailabilitySubject.value;
  }

  get():Promise<void>{
    return new Promise<void>((resolve, reject) =>{
      this.http.get<Good[]>(`${environment.apiUrl}/goods/get/all`).subscribe((value) =>{
        this.goodsAvailabilitySubject.next(value);
        resolve();
      })
    });
  }
}
