import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.css'],
})
export class NumbersComponent implements OnInit {
  title: string = 'Números em Libras';
  styles: string = 'sectionTop';
  link: string = '/webapp';
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
