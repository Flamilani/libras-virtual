import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ModalLetterComponent } from 'src/app/components/modal-letter/modal-letter.component';
import { ToggleBottomComponent } from 'src/app/components/toggle-bottom/toggle-bottom.component';
import { BottomSheetService } from 'src/app/shared/services/bottom-sheet.service';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-fingerspelling',
  templateUrl: './fingerspelling.component.html',
  styleUrls: ['./fingerspelling.component.css'],
})
export class FingerspellingComponent implements OnInit {
  @ViewChild('modal') modal!: ModalLetterComponent;
  @ViewChild('bottomSheet') bottomSheet!: ToggleBottomComponent;

  showFonts = true;
  selectedLetter: string = '';
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  isOpen: boolean = true;

  title: string = 'Datilologia em Libras';
  styles: string = 'sectionTop';
  link: string = '/webapp';

  selectedFont!: string;
  letters!: any;
  isMobile!: boolean;

  constructor(
    private datasService: DatasService,
    private bottomSheetService: BottomSheetService
  ) {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  ngOnInit() {
    this.selectedFont = 'fontLibrasA';
    this.letters = this.datasService.getLetters();
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }

  openBottomSheet() {
    this.bottomSheetService.open();
  }

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;

    if (this.isMobile) {
      this.bottomSheetService.open();
    } else {
      this.modal.content = this.selectedLetter;
      this.updateModalContent();
      this.modal.open();
    }
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

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }
}
