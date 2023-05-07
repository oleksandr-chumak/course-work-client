import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Discount} from "../_models/discount";
import {Router} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class DiscountService {
  private discountSubject: BehaviorSubject<Discount[]>;
  public discount: Observable<Discount[]>;
  public selectedItem: Discount;
  public isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.discountSubject = new BehaviorSubject<Discount[]>([]);
    this.discount = this.discountSubject.asObservable();
  }

  public get discountValue() {
    return this.discountSubject.value;
  }

  clearSavedData() {
    this.selectedItem = null;
    this.discountSubject.next([]);
  }

  find(name: string) {
    this.isLoading = true;
    this.http.get<Discount[]>(`${environment.apiUrl}/discount/get/byName/${name}`)
      .subscribe((value) => {
          this.isLoading = false;
          this.discountSubject.next(value)
        }
      )
  }

  update(newPrice) {
    const body = {
      newPrice,
      discountId: this.selectedItem.discount._id
    }
    this.http.put(`${environment.apiUrl}/discount/update`, body)
      .subscribe(async () => {
        this.clearSavedData();
        await this.router.navigate(["/"]);
      })
  }

  create(newPrice: number) {
    const body = {
      goodId: this.selectedItem._id,
      newPrice
    }
    this.http.post(`${environment.apiUrl}/discount/create`, body)
      .subscribe(async (value) => {
        this.clearSavedData();
        await this.router.navigate(["/"]);
      })
  }

  delete() {
    this.http.delete(`${environment.apiUrl}/discount/delete/${this.selectedItem._id}`).subscribe(async () => {
      this.clearSavedData();
      await this.router.navigate(["/"]);
    })
  }
}
