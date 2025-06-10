import { Component, OnInit } from '@angular/core';
import { iGretting } from 'src/app/shared/interfaces/gretting.interface';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-cards-gretting',
  templateUrl: './cards-gretting.component.html',
  styleUrls: ['./cards-gretting.component.css'],
})
export class CardsGrettingComponent implements OnInit {
  loading = true;

  grettings!: iGretting[];
  flippedIndex: number | null = null;
  constructor(private grettingService: DatasService) {}

  ngOnInit(): void {
     this.grettings = this.grettingService.getGrettings();
  }

  toggleCard(index: number): void {
    if (this.flippedIndex === index) {
      this.flippedIndex = null;
    } else {
      this.flippedIndex = index;
    }
  }


  onGifLoad() {
    this.loading = false;
  }

  onGifError() {
    this.loading = false;
    console.error('Erro ao carregar o GIF');
  }
}
