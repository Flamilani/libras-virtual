import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalLetterComponent } from 'src/app/components/modal-letter/modal-letter.component';
import { ToggleBottomComponent } from 'src/app/components/toggle-bottom/toggle-bottom.component';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-fingerspelling',
  templateUrl: './fingerspelling.component.html',
  styleUrls: ['./fingerspelling.component.css']
})
export class FingerspellingComponent implements OnInit {
  @ViewChild('modal') modal!: ModalLetterComponent;
  @ViewChild('bottomSheet') bottomSheet!: ToggleBottomComponent;

  selectedLetter: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  isOpen: boolean = true;

  title: string = "Datilologia em Libras";
  styles: string = "sectionTop";
  link: string = "/iniciais";

  selectedFont!: string;
  letters!: any;

  constructor(private datasService: DatasService) { }

  ngOnInit() {
    this.selectedFont = 'fontLibrasA';
    this.letters = this.datasService.getLetters();
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;
    this.modal.content = this.selectedLetter;
    this.updateModalContent();
    this.modal.open();
    this.bottomSheet.openBottomSheet();
    this.bottomSheet.content = this.selectedLetter;
  }

  updateModalContent() {
    this.modal.content = this.selectedLetter;
  }

  previousLetter() {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index > 0) {
      this.selectedLetter = this.alphabet[index - 1];
      this.updateModalContent();
    }
  }

  // Muda para a próxima letra
  nextLetter() {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index < this.alphabet.length - 1) {
      this.selectedLetter = this.alphabet[index + 1];
      this.updateModalContent();
    }
  }

  isFirstLetter(): boolean {
    return this.selectedLetter === 'A';
  }

  isLastLetter(): boolean {
    return this.selectedLetter === 'Z';
  }

}
