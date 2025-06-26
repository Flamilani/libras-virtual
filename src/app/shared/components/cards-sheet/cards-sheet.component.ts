import { Component, Input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-cards-sheet',
    templateUrl: './cards-sheet.component.html',
    styleUrls: ['./cards-sheet.component.css'],
    standalone: true,
    imports: [RouterLinkActive]
})
export class CardsSheetComponent {
  @Input() type: string = '';
}
