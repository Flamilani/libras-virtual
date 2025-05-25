import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards-sheet',
  templateUrl: './cards-sheet.component.html',
  styleUrls: ['./cards-sheet.component.css']
})
export class CardsSheetComponent {
  @Input() type: string = '';
}
