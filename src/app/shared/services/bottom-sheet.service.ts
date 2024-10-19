import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {
  private readonly bottomSheetState = new BehaviorSubject<boolean>(false);

  public bottomSheetState$ = this.bottomSheetState.asObservable();

  constructor() { }

  open() {
    this.bottomSheetState.next(true);
  }

  close() {
    this.bottomSheetState.next(false);
  }
}
