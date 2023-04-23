import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Good} from "../_models/good";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn:"root"
})
export class GoodsService{
  private goodsSubject:BehaviorSubject<Good[] | null>;
  public good$:Observable<Good[] | null>;
  public isGoodsLoading:boolean = false;

  public get goodsValue(){
    return this.goodsSubject.value;
  }
  constructor(
    private http: HttpClient
  ) {
    this.goodsSubject = new BehaviorSubject<Good[] | null>(null);
    this.good$ = this.goodsSubject.asObservable();
  }
  getAll(){
    this.isGoodsLoading = true;
    this.http.get<Good[]>(`${environment.apiUrl}/goods/get/all`).subscribe((value) =>{
      this.goodsSubject.next(value);
      console.log(this.goodsSubject.value);
      this.isGoodsLoading = false;
    })
  }
  create(data :FormData){
    return this.http.post(`${environment.apiUrl}/goods/create`,data)
  }
}
