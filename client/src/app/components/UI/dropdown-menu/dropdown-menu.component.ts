import {Component, Input} from '@angular/core';
import {Titles} from "../type/titles";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent {
  constructor(private route:Router) {
  }
  isOpen:boolean = false;
  @Input() header:string;
  @Input() titles:Titles[];

  onClick(){
    this.isOpen = !this.isOpen;
  }
}
