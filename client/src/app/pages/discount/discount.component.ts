import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged} from "rxjs";
import {DiscountService} from "../../_service/discount.service";

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit,OnDestroy{
  searchValue = "";
  newPrice = "";
  error = "";
  private inputSubject:BehaviorSubject<string>
  constructor(public discountService:DiscountService) {
    this.inputSubject = new BehaviorSubject<string>('');
  }

  onChange($event: any){
    this.inputSubject.next($event);
  }

  ngOnInit(): void {
    this.inputSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) =>{
        if(value !== ''){
          this.discountService.find(value);
        }
        this.discountService.clearSavedData()
        return;
      })
  }
  ngOnDestroy(): void {
    this.discountService.clearSavedData();
  }

  onSubmit() {
    const newPriceAsNumber:number = Number(this.newPrice);
    if (!this.newPrice){
      this.error = "Повинна бути нова ціна"
      return;
    }
    if(newPriceAsNumber < 1){
      this.error = "Нова ціна не може бути меньше одиниці"
      return;
    }
    if(isNaN(newPriceAsNumber)){
      this.error = "Ціна повинна бути числом";
      return;
    }
    if(newPriceAsNumber >= this.discountService.selectedItem.price){
      this.error = "Нова ціна не може бути більшою або довірвнювати старій ціні";
      return;
    }
    this.error = "";
    if(!this.discountService.selectedItem.discount){
      this.discountService.create(newPriceAsNumber);
      return;
    }
    this.discountService.update(this.newPrice)
  }

  onDelete() {
    this.discountService.delete()
  }


}
