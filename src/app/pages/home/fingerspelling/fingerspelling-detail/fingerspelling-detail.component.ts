import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fingerspelling-detail',
  templateUrl: './fingerspelling-detail.component.html',
  styleUrls: ['./fingerspelling-detail.component.css'],
})
export class FingerspellingDetailComponent implements OnInit {
  title: string = 'Datilologia em Libras';
  styles: string = 'sectionTop';
  link: string = '/datilologia';
  selectedLetter!: string;
  selectedFont!: string;
  letters!: any;
  showFonts = true;
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.selectedFont = 'fontLibrasA';
    this.route.paramMap.subscribe((params) => {
      this.selectedLetter = params.get('id')?.toString() ?? '';
      if (this.selectedLetter) {
        //   this.modal.content = this.selectedLetter;
        // this.modal.open();
        this.router.navigate([this.link, this.selectedLetter]);
      }
    });
  }

  get letterArrow(): string {
    return `/datilologia/${this.selectedLetter}`;
  }

  get letter(): string {
    return `/alfabeto/${this.selectedLetter}`;
  }

    handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }

    previousLetter() {
    console.log(this.selectedLetter);
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index > 0) {
      this.selectedLetter = this.alphabet[index - 1];
      this.router.navigate([this.link, this.selectedLetter]);
      //    this.updateModalContent();
    }
  }

  // Muda para a próxima letra
  nextLetter() {
  const index = this.alphabet.indexOf(this.selectedLetter);
  if (index < this.alphabet.length - 1) {
    this.selectedLetter = this.alphabet[index + 1];
    this.router.navigate([this.link, this.selectedLetter]);
  }
}

  isFirstLetter(): boolean {
    return this.selectedLetter === 'a';
  }

  isLastLetter(): boolean {
    return this.selectedLetter === 'z';
  }
}
