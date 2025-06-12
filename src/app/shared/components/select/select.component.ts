import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options } from '../../constants/options.constant';
import { DatasService } from '../../services/datas.service';
import { LettersStatesService } from '../../states/letters-states/letters-states.service';

@Component({
  selector: 'component-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  selectedFont = 'fontLibrasA'; // valor padrão
  @Input() disabled = true;
  @Output() fontChange = new EventEmitter<string>();

  fonts = this.datasService.getFonts();

  constructor(
    private datasService: DatasService,
    private lettersStateService: LettersStatesService
  ) {}

  ngOnInit(): void {
    this.fonts;
  }

  listOptions = Options;

  onFontChange() {
    this.fontChange.emit(this.selectedFont); // emite o valor da fonte selecionada
  }

  listOptionsFonts() {
    this.fontChange.emit(this.selectedFont); // emite o valor da fonte selecionada
  }

/*   updateSelectedFont(newFont: any) {
    this.selectedFont = newFont;
    this.lettersStateService.selectFont(newFont);
  } */
}
