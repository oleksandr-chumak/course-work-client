import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged} from "rxjs";
import {WriteOffService} from "../../_service/write-off.service";

@Component({
  selector: 'app-add-amount',
  templateUrl: './add-amount.component.html',
  styleUrls: ['./add-amount.component.scss']
})
export class AddAmountComponent implements OnInit,OnDestroy{
  private searchSubject: BehaviorSubject<string>;
  public searchGoodValue: string = "";
  public amountValue: string = "";
  public error: string = "";
  constructor(
    public writeOffService:WriteOffService
  ) {
    this.searchSubject = new BehaviorSubject<string>("")
  }

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) =>{
        if (value !== ""){
          this.writeOffService.getByName(value);
        }

    })
    }
  ngOnDestroy(): void {
    this.writeOffService.clearValue()
  }
  onChange(value){
    this.searchSubject.next(value)
  }

  onSubmit() {
    const amountAsNumber = Number(this.amountValue);
    if(isNaN(amountAsNumber)){
      this.error = "Дані мають бути числом"
      return;
    }
    if(amountAsNumber < 1){
      this.error = "Число повинно бути більше або ріне 1"
      return;
    }
    this.error = ""
    this.writeOffService.updateAmount(amountAsNumber);


  }


}
