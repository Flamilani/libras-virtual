import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-letter',
  templateUrl: './modal-letter.component.html',
  styleUrls: ['./modal-letter.component.css']
})
export class ModalLetterComponent {
  @Input() cardStyle!: string;
  @Input() fontClass!: string;
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() isFirstLetter: boolean = false;
  @Input() isLastLetter: boolean = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();


  isOpen = false;
  showModal = true;

  constructor() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (window.innerWidth < 768) {
      this.showModal = false;
    } else {
      this.showModal = true;
    }
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  closeOnBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {  // Garante que o clique foi no backdrop
      this.close();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

    // Função chamada quando o botão "Anterior" é clicado
    previousLetter() {
      this.previous.emit();
    }

    // Função chamada quando o botão "Próximo" é clicado
    nextLetter() {
      this.next.emit();
    }
}
