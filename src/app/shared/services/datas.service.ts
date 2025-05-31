import { Injectable } from '@angular/core';
import { cINITIALS } from '../constants/initials.constant';
import {
  AES,
  Alphabet,
  Consonants,
  DI,
  FT,
  GQ,
  HJKWXYZ,
  HKP,
  MN,
  RUV,
  Vowels,
} from '../constants/alphabet.constant';
import { BehaviorSubject } from 'rxjs';
import { cGrettings } from '../constants/grettings.constant';
import { Options } from '../constants/options.constant';
import { OptionsAlphabet } from '../constants/options-alphabet.constant';

@Injectable({
  providedIn: 'root',
})
export class DatasService {
  listInitials = cINITIALS;
  listLetters = Alphabet;
  listGrettings = cGrettings;
  listFonts = Options;
  listOptinsAlphabet = OptionsAlphabet;

  private letterSource = new BehaviorSubject<string | null>(null);
  letter$ = this.letterSource.asObservable();

  constructor() {}

  getFonts() {
    return this.listFonts;
  }

  getOptionsAlphabet() {
    return this.listOptinsAlphabet;
  }

  getInitials() {
    return this.listInitials;
  }

  getLetters() {
    return this.listLetters;
  }

  setLetters(type: any) {
    switch (type) {
      case 'vowels':
        this.listLetters = Vowels;
        break;
      case 'consonants':
        this.listLetters = Consonants;
        break;
      case 'aes':
        this.listLetters = AES;
        break;
      case 'mn':
        this.listLetters = MN;
        break;
      case 'di':
        this.listLetters = DI;
        break;
      case 'ft':
        this.listLetters = FT;
        break;
      case 'gq':
        this.listLetters = GQ;
        break;
      case 'hjkwxyz':
        this.listLetters = HJKWXYZ;
        break;
      case 'hkp':
        this.listLetters = HKP;
        break;
      case 'ruv':
        this.listLetters = RUV;
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
