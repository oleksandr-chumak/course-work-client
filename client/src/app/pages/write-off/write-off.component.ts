import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged} from "rxjs";
import {WriteOffService} from "../../_service/write-off.service";

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html',
  styleUrls: ['./write-off.component.scss']
})
export class WriteOffComponent implements OnInit {
  private inputSubject: BehaviorSubject<string>;
  public selectedName = "";

  constructor(
    public writeOffService: WriteOffService
  ) {
    this.inputSubject = new BehaviorSubject<string>("");
  }

  ngOnInit(): void {
    this.inputSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value !== ""){
          this.writeOffService.getByName(value);
        }
        this.writeOffService.clearValue()
      })
  }

  onChange($event: any) {
    this.inputSubject.next($event)
  }

  onSubmit() {
    this.writeOffService.delete()
  }
}
