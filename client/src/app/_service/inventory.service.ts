import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Inventory} from "../_models/inventory";


@Injectable({
  providedIn:"root"
})
export class InventoryService{
  private inventorySubject:BehaviorSubject<Inventory | null>
  public inventory:Observable<Inventory | null>

  constructor(
    private http:HttpClient
  ) {
    this.inventorySubject = new BehaviorSubject<Inventory | null>(null)
    this.inventory = this.inventorySubject.asObservable();
    this.inventory.subscribe((value) =>{
      console.log(value)
    })
  }
  public get inventoryValue(){
    return this.inventorySubject.value;
  }
  get(){
    return new Promise<void>((resolve, reject) =>{
      this.http.get<Inventory>(`${environment.apiUrl}/goods/inventory`).subscribe((value) =>{
        this.inventorySubject.next(value)
        resolve()
      })
    })


  }

}
