import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { iAlphabet } from 'src/app/shared/interfaces/alphabet.inteface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { Router } from '@angular/router';
import { LettersStatesService } from '../../states/letters-states/letters-states.service';
import { NgClass, NgStyle } from '@angular/common';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
    selector: 'app-letters',
    templateUrl: './letters.component.html',
    styleUrls: ['./letters.component.css'],
    standalone: true,
    imports: [
        ReactiveFormsModule,
        FormsModule,
        BootstrapIconsModule,
        NgClass,
        NgStyle,
    ],
})
export class LettersComponent {
  @Input() cardStyle!: string;
  @Input() fontClass!: string;
  @Output() letterSelected = new EventEmitter<string>();

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

    this.lettersStateService.selectedValue$.subscribe((selectedValue) => {
      this.selectedValue = selectedValue;
    });
    setTimeout(() => {
      this.selectedValue = this.lettersStateService.getSelectedValue();
    }, 0);

    this.lettersStateService.selectedFont$.subscribe((selectedFont) => {
      this.selectedFont = selectedFont;
    });
    setTimeout(() => {
      this.selectedFont = this.lettersStateService.getSelectedValue();
    }, 0);
  }

  getLetter(letter: string) {
    console.log(letter);
    this.lettersStateService.selectLetter(letter);
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
    this.fontClass = newFont;
    this.lettersStateService.selectFont(newFont);
  }

  changeLetters(type: string) {
    this.datasService.setLetters(type);
    console.log(type);
    this.getLetter(type);
    this.alphabet = this.datasService.getLetters();
    this.lettersStateService.selectLetter(type);
  }

  selectLetter(letter: iAlphabet) {
    this.selectedValue = letter.letter;
    this.letterSelected.emit(letter.letter);
 //   this.lettersStateService.selectLetter(letter.letter);
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
