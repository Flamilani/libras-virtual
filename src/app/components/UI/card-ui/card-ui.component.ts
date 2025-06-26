import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'card-ui',
    templateUrl: './card-ui.component.html',
    styleUrls: ['./card-ui.component.css'],
    standalone: true,
    imports: [NgClass]
})
export class CardUIComponent {
  @Input() cardStyle?: any;
}
