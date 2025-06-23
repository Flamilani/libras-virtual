import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  public games: any[] = [];

  constructor(private datasService: DatasService) {}

  ngOnInit() {
    this.games = this.datasService.getGames().filter((game) => ({
      ...game,
      active: true,
    }));
  }
}
