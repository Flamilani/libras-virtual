import { Injectable } from '@angular/core';
import { cINITIALS } from '../constants/initials.constant';
import { Alphabet, Consonants, Vowels } from '../constants/alphabet.constant';
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

    setLetters(type: string) {
    switch (type) {
      case 'vowels':
        this.listLetters = Vowels;
        break;
      case 'consonants':
        this.listLetters = Consonants;
        break;
      default:
        this.listLetters = Alphabet;
        break;
    }
  }

  setSelectedLetter(letter: string) {
    this.letterSource.next(letter);
  }

  getGrettings() {
    return this.listGrettings;
  }
}
