import { Component, OnInit } from '@angular/core';
import { iGretting } from 'src/app/shared/interfaces/gretting.interface';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-cards-gretting',
  templateUrl: './cards-gretting.component.html',
  styleUrls: ['./cards-gretting.component.css']
})
export class CardsGrettingComponent implements OnInit {
  grettings!: iGretting[];

  constructor(private grettingService: DatasService) {}

  ngOnInit(): void {
    this.grettings = this.grettingService.getGrettings();
  }


}
