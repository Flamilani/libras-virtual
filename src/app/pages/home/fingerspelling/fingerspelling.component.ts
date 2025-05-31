import {
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalLetterComponent } from 'src/app/shared/components/modal-letter/modal-letter.component';
import { ToggleBottomComponent } from 'src/app/shared/components/toggle-bottom/toggle-bottom.component';
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
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  isOpen: boolean = true;

  title: string = 'Datilologia em Libras';
  styles: string = 'sectionTop';
  link: string = '/webapp';

  selectedFont!: string;
  letters!: any;
  isMobile!: boolean;
  displayedValue: string = '';
  fontSize: number = 100;

  constructor(
    private datasService: DatasService,
    private bottomSheetService: BottomSheetService,
    private router: Router,
    private route: ActivatedRoute
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

    this.route.paramMap.subscribe((params) => {
      this.selectedLetter = params.get('id')?.toString() ?? '';
      if (this.selectedLetter) {
        this.router.navigate(['/datilologia', this.selectedLetter.toLocaleLowerCase()]);
      }
    });
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }

  openBottomSheet() {
    this.bottomSheetService.open();
  }

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;
    this.router.navigate([
      '/datilologia',
      this.selectedLetter.toLocaleLowerCase(),
    ]);
    /*     if (this.isMobile) {
      this.bottomSheetService.open();
    } else {
      this.modal.content = this.selectedLetter;
      this.updateModalContent();
      this.modal.open();
    } */
  }

  updateModalContent() {
    this.modal.content = this.selectedLetter;
  }

  previousLetter() {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index > 0) {
      this.selectedLetter = this.alphabet[index - 1];
    //  this.updateModalContent();
    }
  }

  // Muda para a próxima letra
  nextLetter() {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index < this.alphabet.length - 1) {
      this.selectedLetter = this.alphabet[index + 1];
  //    this.updateModalContent();
    }
  }

  isFirstLetter(): boolean {
    return this.selectedLetter === 'a';
  }

  isLastLetter(): boolean {
    return this.selectedLetter === 'z';
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

    increaseFontSize() {
    this.fontSize += 20; // Aumenta o tamanho da fonte em 2 pixels
  }

  // Função para diminuir o tamanho da fonte
  decreaseFontSize() {
    if (this.fontSize > 80) {
      // Limite mínimo de tamanho da fonte
      this.fontSize -= 20; // Diminui o tamanho da fonte em 2 pixels
    }
  }
}
