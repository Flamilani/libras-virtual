import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'content-ui',
    templateUrl: './content-ui.component.html',
    styleUrls: ['./content-ui.component.css'],
    standalone: true,
    imports: [NgClass]
})
export class ContentUiComponent {
  @Input() cardStyle?: any;
}
