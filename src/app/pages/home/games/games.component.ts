import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/shared/services/datas.service';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';

@Component({
    selector: 'app-games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        RouterLink,
    ],
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
