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

  constructor(private datasService: DatasService, private router: Router) {}

  ngOnInit() {
    this.selectedValue = 'all';
    this.selectedFont = 'fontLibrasA';
    this.alphabet = this.datasService.getLetters();
    this.optionsAlphabet;
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
    this.fontClass = newFont;
  }

  changeLetters(type: string) {
    this.datasService.setLetters(type);
    this.alphabet = this.datasService.getLetters();
  }

  selectLetter(letter: iAlphabet) {
    this.letterSelected.emit(letter.letter);
  }

  increaseFontSize() {
    this.fontSize += 20;
    console.log(this.fontSize);
  }

  decreaseFontSize() {
    if (this.fontSize > 60) {
      this.fontSize -= 20;
    }
  }
}
