import { Injectable } from '@angular/core';
import { iNames } from '../../interfaces/names.interface';
import { StateService } from '../state.service';
import { BehaviorSubject } from 'rxjs';

interface NameState {
  name: string;
  selectedNameId: number;
  selectedFont: string;
}

const initialState: NameState = {
  name: '',
  selectedNameId: 0,
  selectedFont: 'fontLibrasA',
};

@Injectable({
  providedIn: 'root',
})
export class NameStatesService extends StateService<NameState> {
  private showNameSubject = new BehaviorSubject<string>('');
  showName$ = this.select((state) => state.name);

  private showFontSubject = new BehaviorSubject<string>('');
  showFont$ = this.select((state) => state.selectedFont);

  constructor() {
    super(initialState);
  }

  selectName(name: string) {
    this.setState({ name: name });
    this.showNameSubject.next(name);
  }

  selectFont(font: string) {
    this.setState({ selectedFont: font });
    this.showFontSubject.next(font);
  }
}
