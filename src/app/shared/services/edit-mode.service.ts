import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditModeService {
  private editModeSubject = new BehaviorSubject<boolean>(false);
  editMode$ = this.editModeSubject.asObservable();

  toggleEditMode() {
    this.editModeSubject.next(!this.editModeSubject.value);
  }

  setEditMode(value: boolean) {
    this.editModeSubject.next(value);
  }

  getEditModeValue() {
    return this.editModeSubject.value;
  }
}
