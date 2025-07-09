import {
  Component,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BottomSheetService } from 'src/app/shared/services/bottom-sheet.service';
import { DatasService } from 'src/app/shared/services/datas.service';
import { LettersStatesService } from 'src/app/shared/states/letters-states/letters-states.service';
import { LettersComponent } from '../../../shared/components/letters/letters.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { CardsComponent } from '../../../shared/components/cards/cards.component';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';

@Component({
    selector: 'app-fingerspelling',
    templateUrl: './fingerspelling.component.html',
    styleUrls: ['./fingerspelling.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        ContentUiComponent,
        CardsComponent,
        SelectComponent,
        LettersComponent,
    ],
})
export class FingerspellingComponent implements OnInit {
  showFonts = true;
  selectedLetter: string = '';
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  isOpen: boolean = true;

  title: string = StringsNamesUrl.datilologia + ' em Libras';
  styles: string = 'sectionTop';
  link: string = '/';

  selectedFont!: string;
  letters!: any;
  isMobile!: boolean;
  displayedValue: string = '';
  fontSize: number = 100;

  selectedValue$: Observable<string> = this.lettersStatesService.selectedValue$;
  letter!: string;

  selectedFont$: Observable<string> = this.lettersStatesService.selectedFont$;
  font!: string;

  private subscription!: Subscription;

  constructor(
    private datasService: DatasService,
    private bottomSheetService: BottomSheetService,
    private router: Router,
    private route: ActivatedRoute,
    private lettersStatesService: LettersStatesService
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
        this.router.navigate([
          '/datilologia',
          this.selectedLetter.toLocaleLowerCase(),
        ]);
      }
    });

     this.subscription = this.lettersStatesService.selectedValue$.subscribe(
      (letter) => {
        console.log('letter atualizado:', letter);
        this.letter = letter;
      }
    );

     this.subscription = this.lettersStatesService.selectedFont$.subscribe(
      (font) => {
        console.log('font atualizado:', font);
        this.font = font;
      }
    );
  }

  onLetterEntered(letter: string) {
    this.selectedLetter = letter;
    console.log('Letter entered:', letter);
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

ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
