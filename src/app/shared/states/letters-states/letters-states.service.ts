import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../state.service';

interface LettersState {
  letter: string;
  selectedLetter: string;
}

const initialState: LettersState = {
  letter: '',
  selectedLetter: 'all',
};

@Injectable({
  providedIn: 'root',
})
export class LettersStatesService extends StateService<LettersState> {
/*   private showLetterSubject = new BehaviorSubject<string>('all');
  showLetters$ = this.select((state) => state.letter); */

  constructor() {
    super(initialState);
  }

  private selectedValueSubject = new BehaviorSubject<string>('all');
  selectedValue$ = this.selectedValueSubject.asObservable();

  selectLetter(letter: string) {
    this.selectedValueSubject.next(letter);
  }

  getSelectedValue(): string {
    return this.selectedValueSubject.value;
  }

  private selectedFontSubject = new BehaviorSubject<string>('');
  selectedFont$ = this.selectedFontSubject.asObservable();

  selectFont(font: string) {
    this.selectedFontSubject.next(font);
  }

  getSelectedFont(): string {
    return this.selectedFontSubject.value;
  }
}
