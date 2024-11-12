import {  Injectable, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class MenuService {
  menuSelection = new BehaviorSubject<string>('PIPBOY');


  get menuSelection$() {
    return this.menuSelection.asObservable();
  }

  setMenuSelection(menuSelection: string) {
    this.menuSelection.next(menuSelection);
  }
}
