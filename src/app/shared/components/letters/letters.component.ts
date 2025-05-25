import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { iAlphabet } from 'src/app/shared/interfaces/alphabet.inteface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { ModalLetterComponent } from '../modal-letter/modal-letter.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.css']
})
export class LettersComponent {
  @Input() cardStyle!: string;
  @Input() fontClass!: string;
  @Output() letterSelected = new EventEmitter<string>();

  @ViewChild('modal') modal!: ModalLetterComponent;

  selectedLetter: string = '';
  alphabet!: any;

  constructor(
    private datasService: DatasService,
    private router: Router
  ) { }

  ngOnInit() {
    this.alphabet = this.datasService.getLetters();
  }

   changeLetters(type: string) {
    this.datasService.setLetters(type);
    this.alphabet = this.datasService.getLetters();
  }

  selectLetter(letter: iAlphabet) {
    this.letterSelected.emit(letter.letter);

  }
}
