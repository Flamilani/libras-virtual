import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alphabet-detail',
  templateUrl: './alphabet-detail.component.html',
  styleUrls: ['./alphabet-detail.component.css'],
})
export class AlphabetDetailComponent implements OnInit {
  title: string = 'Alfabeto em Português';
  styles: string = 'sectionTop';
  link: string = '/alfabeto';
  selectedLetter: string = '';
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  vowels: string[] = 'aeiou'.split('');
  consonants: string[] = 'bcdfghjklmnpqrstvwxyz'.split('');
  type: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedLetter = params.get('id')?.toString() ?? '';
      if (this.selectedLetter) {
        //   this.modal.content = this.selectedLetter;
        // this.modal.open();
        this.router.navigate([this.link, this.selectedLetter]);
      }
    });

    this.route.queryParams.subscribe((params) => {
      this.type = params['type'];
    });
  }

  get letter(): string {
    return `/datilologia/${this.selectedLetter}`;
  }

  /*  previousLetter() {
    console.log(this.selectedLetter);
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index > 0) {
      this.selectedLetter = this.alphabet[index - 1];
      this.router.navigate([
        this.link,
        this.selectedLetter.toLocaleLowerCase(),
      ]);
    }
  }

  nextLetter() {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index < this.alphabet.length - 1) {
      this.selectedLetter = this.alphabet[index + 1];
      this.router.navigate([
        this.link,
        this.selectedLetter.toLocaleLowerCase(),
      ]);
    }
  }
 */

  previousLetter() {
    if (this.type === 'vogal') {
      const index = this.vowels.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.vowels[index - 1];
        this.router.navigate([this.link], { queryParams: { type: this.type } });
      }
    } else if (this.type === 'consoante') {
      const index = this.consonants.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.consonants[index - 1];
        this.router.navigate([this.link], { queryParams: { type: this.type } });
      }
    } else {
      const index = this.alphabet.indexOf(this.selectedLetter);
      if (index > 0) {
        this.selectedLetter = this.alphabet[index - 1];
      }
    }
  }

  nextLetter() {
    if (this.type === 'vogal') {
      const index = this.vowels.indexOf(this.selectedLetter);
      if (index < this.vowels.length - 1) {
        this.selectedLetter = this.vowels[index + 1];
      }
    } else if (this.type === 'consoante') {
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
