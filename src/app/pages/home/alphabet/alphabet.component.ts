import { Component, ViewChild } from '@angular/core';
import { ModalLetterComponent } from 'src/app/components/modal-letter/modal-letter.component';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
})
export class AlphabetComponent {
  @ViewChild('modal') modal!: ModalLetterComponent;
  selectedLetter: string = '';

  title: string = 'Alfabeto em Português';
  styles: string = 'sectionTop';
  link: string = '/webapp';
  noFont = '';

  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;
    this.modal.content = this.selectedLetter;
    this.modal.open();
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
