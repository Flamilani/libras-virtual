import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalLetterComponent } from 'src/app/shared/components/modal-letter/modal-letter.component';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
})
export class AlphabetComponent implements OnInit {
  @ViewChild('modal') modal!: ModalLetterComponent;
  selectedLetter: string = '';

  title: string = 'Alfabeto em Português';
  styles: string = 'sectionTop';
  link: string = '/webapp';
  noFont = '';

  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  vowels: string[] = 'aeiou'.split('');
  consonants: string[] = 'bcdfghjklmnpqrstvwxyz'.split('');

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedLetter = params.get('id')?.toString() ?? '';
      if (this.selectedLetter) {
        this.router.navigate(['/alfabeto', this.selectedLetter.toLocaleLowerCase()]);
      //   this.modal.content = this.selectedLetter;
       // this.modal.open();
      }
    });
  }

  onLetterSelected(letter: string) {
    this.selectedLetter = letter;
    console.log(this.selectedLetter);
    this.router.navigate(['/alfabeto', this.selectedLetter.toLocaleLowerCase()]);
    //    this.modal.open();
    // this.modal.content = this.selectedLetter;
  }

  updateModalContent() {
    this.modal.content = this.selectedLetter;
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
}
