import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'component-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  selectedFont = 'fontLibrasA'; // valor padrão
  @Input() disabled = true;
  @Output() fontChange = new EventEmitter<string>();

  onFontChange() {
    this.fontChange.emit(this.selectedFont); // emite o valor da fonte selecionada
  }
}
