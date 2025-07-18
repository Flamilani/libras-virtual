import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { processString } from 'src/app/shared/utils/convert-urls';

@Component({
    selector: 'app-numbers',
    templateUrl: './numbers.component.html',
    styleUrls: ['./numbers.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        BootstrapIconsModule,
        SelectComponent,
        ContentUiComponent,
        ReactiveFormsModule,
        NgClass,
        NgStyle,
        FormsModule,
    ],
})
export class NumbersComponent implements OnInit {
  title: string = 'Números em Libras';
  styles: string = 'sectionTop';
  link = `/${processString(StringsNamesUrl.fundamentoLibras)}`;

  enabled: boolean = true;
  selectedFont!: string;
  fullInputValue: string = ''; // Armazena todos os números inseridos
  displayedValue: string = ''; // Exibe apenas o último número inserido
  fontSize: number = 100;

  numbers: string[][] = [
    ['7', '8', '9'], // Primeira linha
    ['4', '5', '6'], // Segunda linha
    ['1', '2', '3'], // Terceira linha
  ];

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedFont = 'fontLibrasA';
    }, 100);
  }

  addNumber(num: string) {
    this.fullInputValue += num; // Armazena todos os números
    this.displayedValue = num;
  }

  clearInput() {
    this.fullInputValue = '';
    this.displayedValue = '';
    this.fontSize = 100;
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }

  increaseFontSize() {
    if (this.fontSize < 240) {
    this.fontSize += 20; // Aumenta o tamanho da fonte em 2 pixels
    }
  }

  // Função para diminuir o tamanho da fonte
  decreaseFontSize() {
    if (this.fontSize > 80) {
      // Limite mínimo de tamanho da fonte
      this.fontSize -= 20; // Diminui o tamanho da fonte em 2 pixels
    }
  }
}
