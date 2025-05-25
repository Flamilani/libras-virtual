import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-arrows',
  templateUrl: './arrows.component.html',
  styleUrls: ['./arrows.component.css'],
})
export class ArrowsComponent implements OnInit {
  selectedLetter: string = '';
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  @Input() routerLink!: any;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      const segment = url[0].path;
      if (segment === 'alfabeto') {
        this.routerLink = '/alfabeto';
      } else if (segment === 'datilologia') {
        this.routerLink = '/datilologia';
      }
    });
  }

  previousLetter(link: unknown) {
    console.log(this.selectedLetter);
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index > 0) {
      this.selectedLetter = this.alphabet[index - 1];
      this.router.navigate([link, this.selectedLetter]);
      //    this.updateModalContent();
    }
  }

  // Muda para a próxima letra
  nextLetter(link: unknown) {
    const index = this.alphabet.indexOf(this.selectedLetter);
    if (index < this.alphabet.length - 1) {
      this.selectedLetter = this.alphabet[index + 1];
      this.router.navigate([link, this.selectedLetter]);
    }
  }

  isFirstLetter(): boolean {
    return this.selectedLetter === 'a';
  }

  isLastLetter(): boolean {
    return this.selectedLetter === 'z';
  }
}
