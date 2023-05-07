import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Good} from "../_models/good";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {WriteOffGood} from "../_interface/write-off-good";
import {Router} from "@angular/router";

@Injectable({
  providedIn:"root"
})
export class WriteOffService{
  private goodSubject:BehaviorSubject<WriteOffGood[]>;
  public good:Observable<WriteOffGood[]>;
  isLoading:boolean = false;
  public selectedGood: Partial<Good> = null;
  constructor(
    private http:HttpClient,
    private router:Router
  ) {
    this.goodSubject = new BehaviorSubject<Good[]>([]);
    this.good = this.goodSubject.asObservable();
  }
  public get goodValue(){
    return this.goodSubject.value;
  }
  getByName(name){
    this.isLoading = true;
    this.http.get<WriteOffGood[]>(`${environment.apiUrl}/goods/get/byName/${name}`).subscribe((value) =>{
      console.log(value)
      this.isLoading = false;
      this.goodSubject.next(value)
    })
  }

  clearValue() {
    this.selectedGood = null;
    this.goodSubject.next([])
  }

  delete() {
    const id = this.selectedGood._id
    this.http.delete(`${environment.apiUrl}/goods/delete/${id}`).subscribe(async () =>{
      this.clearValue();
      await this.router.navigate(["/"]);
    });
  }
  updateAmount(amount:number){
    const body = {
      id:this.selectedGood._id,
      amount
    }
    this.http.put(`${environment.apiUrl}/goods/update/count/one`,body).subscribe(async () =>{
      await this.router.navigate([""]);
    })
  }
}
