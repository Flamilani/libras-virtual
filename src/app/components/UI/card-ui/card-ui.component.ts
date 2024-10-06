import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-ui',
  templateUrl: './card-ui.component.html',
  styleUrls: ['./card-ui.component.css']
})
export class CardUIComponent {
  @Input() cardStyle?: any;
}
