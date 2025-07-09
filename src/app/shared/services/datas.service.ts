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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { cGrettings } from '../constants/grettings.constant';
import { Options } from '../constants/options.constant';
import { OptionsAlphabet } from '../constants/options-alphabet.constant';
import { cNames } from '../constants/names.constant';
import { iNames } from '../interfaces/names.interface';
import { cGAMES } from '../constants/games-list.constant';
import { cComputerVisor } from '../constants/computer-visor-list.constant';
import { cInitialLibras } from '../constants/initial-libras.constant';

@Injectable({
  providedIn: 'root',
})
export class DatasService {
  listInitials = cINITIALS;
  listLetters = Alphabet;
  listGrettings = cGrettings;
  listFonts = Options;
  listOptinsAlphabet = OptionsAlphabet;
  listNames = cNames;
  listGames = cGAMES;
  listComputerVisor = cComputerVisor;
  listInitialLibras = cInitialLibras;

  private namesSubject = new BehaviorSubject<iNames[]>(this.listNames);

  private letterSource = new BehaviorSubject<string | null>(null);
  letter$ = this.letterSource.asObservable();

  constructor() {}

  getNames(id?: number): Observable<any> {
    const names = this.namesSubject.value;
    const name = names.find((n) => n.id === id);
    return of(name);
  }

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

  getGames() {
    return this.listGames;
  }

  getComputerVisor() {
    return this.listComputerVisor;
  }

  getInitialLibras() {
    return this.listInitialLibras;
  }
}
