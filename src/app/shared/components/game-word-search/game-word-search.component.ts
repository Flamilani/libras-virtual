import { Component, OnInit } from '@angular/core';
import { NameStatesService } from '../../states/name-states/name-states.service';
import { Words } from '../../constants/words.constant';
import { NgClass } from '@angular/common';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { SelectComponent } from '../select/select.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from '../../constants/strings-url/strings-names';
import { processString } from '../../utils/convert-urls';

interface Cell {
  letter: string;
  selected: boolean;
  foundIn: string[];
}

@Component({
    selector: 'app-game-word-search',
    templateUrl: './game-word-search.component.html',
    styleUrls: ['./game-word-search.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        SelectComponent,
        ContentUiComponent,
        NgClass,
    ],
})
export class GameWordSearchComponent implements OnInit {
  gridSize = 6;
  grid: Cell[][] = [];
  words = Words;
  placedWords: string[] = [];
  foundWords: string[] = [];
  selectedCells: { row: number; col: number }[] = [];
  nameInput!: string;
  selectedFont: string = 'fontLibrasA';

  title = processString(StringsNamesUrl.cacasPalavras);
  link = `/${processString(StringsNamesUrl.jogos)}`;

  constructor(private nameStatesService: NameStatesService) {}

  ngOnInit(): void {
    this.generateGrid();
  }

  handleFontChange(newFont: string) {
    this.getFont((this.selectedFont = newFont));
    this.selectedFont = newFont;
  }

  getName(name: string) {
    this.nameStatesService.selectName(name);
  }

  getFont(font: string) {
    this.nameStatesService.selectFont(font);
  }

  generateGrid() {
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({
        letter: '',
        selected: false,
        foundIn: [],
      }))
    );

    this.words.forEach((word) => {
      const placed = this.placeWord(word);
      if (placed) {
        this.placedWords.push(word);
      } else {
        console.warn(`❌ Não foi possível posicionar: ${word}`);
      }
    });

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.letter) {
          cell.letter = alphabet.charAt(
            Math.floor(Math.random() * alphabet.length)
          );
        }
      });
    });
  }

  placeWord(word: string): boolean {
    const directions = [
      { rowInc: 0, colInc: 1 }, // Horizontal
      { rowInc: 1, colInc: 0 }, // Vertical
    ];

    let attempts = 100;
    while (attempts > 0) {
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const maxRow = dir.rowInc
        ? this.gridSize - word.length
        : this.gridSize - 1;
      const maxCol = dir.colInc
        ? this.gridSize - word.length
        : this.gridSize - 1;

      const row = Math.floor(Math.random() * (maxRow + 1));
      const col = Math.floor(Math.random() * (maxCol + 1));

      if (this.canPlace(word, row, col, dir.rowInc, dir.colInc)) {
        this.placeLetters(word, row, col, dir.rowInc, dir.colInc);
        return true;
      }
      attempts--;
    }

    // Tenta forçar se não achou lugar
    for (const dir of directions) {
      const maxRow = dir.rowInc
        ? this.gridSize - word.length
        : this.gridSize - 1;
      const maxCol = dir.colInc
        ? this.gridSize - word.length
        : this.gridSize - 1;

      for (let row = 0; row <= maxRow; row++) {
        for (let col = 0; col <= maxCol; col++) {
          if (this.canPlace(word, row, col, dir.rowInc, dir.colInc)) {
            this.placeLetters(word, row, col, dir.rowInc, dir.colInc);
            return true;
          }
        }
      }
    }
    return false;
  }

  placeLetters(
    word: string,
    row: number,
    col: number,
    rowInc: number,
    colInc: number
  ) {
    for (let i = 0; i < word.length; i++) {
      const r = row + i * rowInc;
      const c = col + i * colInc;
      const cell = this.grid[r][c];
      cell.letter = word[i]; // Apenas posiciona a letra, não mexe no foundIn aqui
    }
  }

  canPlace(
    word: string,
    row: number,
    col: number,
    rowInc: number,
    colInc: number
  ): boolean {
    for (let i = 0; i < word.length; i++) {
      const r = row + i * rowInc;
      const c = col + i * colInc;
      const cell = this.grid[r][c];
      if (cell.letter !== '' && cell.letter !== word[i]) {
        return false;
      }
    }
    return true;
  }

  selectCell(row: number, col: number) {
    const cell = this.grid[row][col];
    if (
      cell.foundIn.length > 0 &&
      this.foundWords.length === this.words.length
    ) {
      return; // Se todas as palavras foram encontradas, desativa
    }

    const index = this.selectedCells.findIndex(
      (c) => c.row === row && c.col === col
    );
    if (index >= 0) {
      this.selectedCells.splice(index, 1);
      cell.selected = false;
    } else {
      this.selectedCells.push({ row, col });
      cell.selected = true;
    }

    navigator.vibrate([100]);
    this.checkSelection();
  }

  checkSelection() {
    const word = this.selectedCells
      .map((c) => this.grid[c.row][c.col].letter)
      .join('');

    const reversed = word.split('').reverse().join('');

    const matchedWord = this.words.find((w) => w === word || w === reversed);

    if (matchedWord && !this.foundWords.includes(matchedWord)) {
      this.selectedCells.forEach((c) => {
        const cell = this.grid[c.row][c.col];
        if (!cell.foundIn.includes(matchedWord)) {
          cell.foundIn.push(matchedWord);
        }
        cell.selected = false;
      });
      this.foundWords.push(matchedWord);
      this.selectedCells = [];
    }
  }

  restartGame() {
    this.grid = [];
    this.placedWords = [];
    this.foundWords = [];
    this.selectedCells = [];
    this.generateGrid();
  }
}
