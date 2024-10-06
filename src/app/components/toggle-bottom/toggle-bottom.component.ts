import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-toggle-bottom',
  templateUrl: './toggle-bottom.component.html',
  styleUrls: ['./toggle-bottom.component.css']
})
export class ToggleBottomComponent {
  @Input() cardStyle!: string;
  @Input() fontClass!: string;
  @Input() idBottom!: string;

  @Input() content: string = '';

  isOpen = true;

  showBottom = false;

   constructor() {
   this.checkScreenSize();
  }

   checkScreenSize() {
    if (window.innerWidth < 768) {
      this.showBottom = true;
    } else {
      this.showBottom = false;
    }
  }

  openBottomSheet() {
    this.isOpen = true;
  }

  closeBottomSheet() {
    this.isOpen = false;
  }

   @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  @ViewChild('offcanvasExample') offcanvasElement!: ElementRef;
  private offcanvas!: Offcanvas;

  openOffcanvas() {
    this.offcanvas.show();
  }

  closeOffcanvas() {
    this.offcanvas.hide();
  }
}
