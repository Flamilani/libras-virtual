import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-ui',
  templateUrl: './content-ui.component.html',
  styleUrls: ['./content-ui.component.css']
})
export class ContentUiComponent {
  @Input() cardStyle?: any;
}
