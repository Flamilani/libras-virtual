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
  private showLetterSubject = new BehaviorSubject<string>('');
  showLetters$ = this.select((state) => state.letter);

  constructor() {
    super(initialState);
  }

   selectLetter(letter: string) {
    this.setState({ letter: letter });
    this.showLetterSubject.next(letter);
  }
}
