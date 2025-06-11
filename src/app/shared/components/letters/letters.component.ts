import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iAlphabet } from 'src/app/shared/interfaces/alphabet.inteface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { ModalLetterComponent } from '../modal-letter/modal-letter.component';
import { Router } from '@angular/router';
import { LettersStatesService } from '../../states/letters-states/letters-states.service';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css'],
})
export class LettersComponent {
  @Input() cardStyle!: string;
  @Input() fontClass!: string;
  @Output() letterSelected = new EventEmitter<string>();

  @ViewChild('modal') modal!: ModalLetterComponent;

  alphabet!: any;
  selectedValue!: string;
  selectedFont!: string;
  showFonts = true;
  fontSize: number = 60;
  optionsAlphabet = this.datasService.getOptionsAlphabet();

  constructor(
    private datasService: DatasService,
    private router: Router,
    private lettersStateService: LettersStatesService
  ) {}

  ngOnInit() {
    this.selectedValue = 'all';
    this.selectedFont = 'fontLibrasA';
    this.alphabet = this.datasService.getLetters();
    this.optionsAlphabet;
  }

  getLetter(letter: string) {
    console.log(letter);
    this.lettersStateService.selectLetter(letter);
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
    this.fontClass = newFont;
  }

  changeLetters(type: string) {
    this.datasService.setLetters(type);
    console.log(type);
    this.getLetter(type);
    this.alphabet = this.datasService.getLetters();
  }

  selectLetter(letter: iAlphabet) {
    this.selectedValue = letter.letter;
    this.letterSelected.emit(letter.letter);
  }

  increaseFontSize() {
    if (this.fontSize < 140) {
      this.fontSize += 20;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 60) {
      this.fontSize -= 20;
    }
  }
}
