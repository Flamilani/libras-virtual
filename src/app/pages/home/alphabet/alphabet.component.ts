import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { LettersStatesService } from 'src/app/shared/states/letters-states/letters-states.service';
import { LettersComponent } from '../../../shared/components/letters/letters.component';
import { CardsComponent } from '../../../shared/components/cards/cards.component';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';

@Component({
    selector: 'app-alphabet',
    templateUrl: './alphabet.component.html',
    styleUrls: ['./alphabet.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        ContentUiComponent,
        CardsComponent,
        LettersComponent,
    ],
})
export class AlphabetComponent implements OnInit, OnDestroy {
  selectedLetter: string = '';

  title: string = 'Alfabeto em Português';
  styles: string = 'sectionTop';
  link: string = '/';
  noFont = '';

  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  vowels: string[] = 'aeiou'.split('');
  consonants: string[] = 'bcdfghjklmnpqrstvwxyz'.split('');

  selectedValue$: Observable<string> = this.lettersStatesService.selectedValue$;
  letter!: string;

  selectedFont$: Observable<string> = this.lettersStatesService.selectedFont$;
  font!: string;

  private subscription!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private lettersStatesService: LettersStatesService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedLetter = params.get('id')?.toString() ?? '';
      if (this.selectedLetter) {
        this.router.navigate([
          '/alfabeto',
          this.selectedLetter.toLocaleLowerCase(),
        ]);
        //   this.modal.content = this.selectedLetter;
        // this.modal.open();
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

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;
    console.log(this.selectedLetter);
    this.router.navigate([
      '/alfabeto',
      this.selectedLetter.toLocaleLowerCase(),
    ]);
  }

  previousLetter() {
    if (this.isVowel(this.selectedLetter)) {
      const index = this.vowels.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.vowels[index - 1];
      }
    } else if (this.isConsonant(this.selectedLetter)) {
      const index = this.consonants.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.consonants[index - 1];
      }
    } else {
      const index = this.alphabet.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.alphabet[index - 1];
      }
    }
  }

  nextLetter() {
    if (this.isVowel(this.selectedLetter)) {
      const index = this.vowels.indexOf(this.selectedLetter);
      if (index < this.vowels.length - 1) {
        this.selectedLetter = this.vowels[index + 1];
      }
    } else if (this.isConsonant(this.selectedLetter)) {
      const index = this.consonants.indexOf(this.selectedLetter);
      if (index < this.consonants.length - 1) {
        this.selectedLetter = this.consonants[index + 1];
      }
    } else {
      const index = this.alphabet.indexOf(this.selectedLetter);
      if (index < this.alphabet.length - 1) {
        this.selectedLetter = this.alphabet[index + 1];
      }
    }
  }

  isFirstLetter(): boolean {
    return this.selectedLetter === 'a';
  }

  isLastLetter(): boolean {
    return this.selectedLetter === 'z';
  }

  isConsonant(letter: string): boolean {
    return this.consonants.includes(letter);
  }

  isVowel(letter: string): boolean {
    return this.vowels.includes(letter);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
