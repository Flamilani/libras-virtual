import { Injectable } from '@angular/core';
import { cINITIALS } from '../constants/initials.constant';
import { Alphabet } from '../constants/alphabet.constant';
import { BehaviorSubject } from 'rxjs';
import { cGrettings } from '../constants/grettings.constant';

@Injectable({
  providedIn: 'root'
})
export class DatasService {

  listInitials = cINITIALS;
  listLetters = Alphabet;
  listGrettings = cGrettings;

  private letterSource = new BehaviorSubject<string | null>(null);
  letter$ = this.letterSource.asObservable();

  constructor() { }

  getInitials() {
    return this.listInitials;
  }

  getLetters() {
    return this.listLetters;
  }

  setSelectedLetter(letter: string) {
    this.letterSource.next(letter);
  }

  getGrettings() {
    return this.listGrettings;
  }
}
