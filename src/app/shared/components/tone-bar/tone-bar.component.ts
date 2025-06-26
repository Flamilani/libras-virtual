import { Component, Input, SimpleChanges } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-tone-bar',
    templateUrl: './tone-bar.component.html',
    styleUrls: ['./tone-bar.component.css'],
    standalone: true,
    imports: [NgClass],
})
export class ToneBarComponent {
  @Input() pitch: number = 1;
  @Input() showTone: boolean = false;
  @Input() baseScale: number = 1;

  get toneColorClass(): string {
    if (this.pitch < 0.9) return 'tone-low';
    if (this.pitch <= 1.4) return 'tone-normal';
    return 'tone-high';
  }
}
