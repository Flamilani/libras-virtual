import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { NgClass } from '@angular/common';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { CardsComponent } from '../../../../shared/components/cards/cards.component';
import { ContentUiComponent } from '../../../../components/UI/content-ui/content-ui.component';
import { BreadcrumbComponent } from '../../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../../components/UI/card-ui/card-ui.component';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-fingerspelling-detail',
  templateUrl: './fingerspelling-detail.component.html',
  styleUrls: ['./fingerspelling-detail.component.css'],
  standalone: true,
  imports: [
    CardUIComponent,
    BreadcrumbComponent,
    ContentUiComponent,
    CardsComponent,
    SelectComponent,
    NgClass,
    BootstrapIconsModule,
  ],
animations: [
  trigger('slideAnimation', [
    transition(':enter', [
      style({ transform: '{{enterTransform}}', opacity: 0 }),
      animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
    ], { params: { enterTransform: 'translateX(100%)' } }),

    transition(':leave', [
      animate('300ms ease-in', style({ transform: '{{leaveTransform}}', opacity: 0 }))
    ], { params: { leaveTransform: 'translateX(-100%)' } })
  ])
]
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
