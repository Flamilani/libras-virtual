import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  @Input() type: string = '';
  @Input() redirect: string = '';
  @Output() letterSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onLetterSelected(letter: any) {
    this.letterSelected.emit(letter);
  }
}
