import { Component, OnInit } from '@angular/core';
import { DatasService } from 'src/app/shared/services/datas.service';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';

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
  title = StringsNamesUrl.jogos;

  public games: any[] = [];

  constructor(private datasService: DatasService) {}

  ngOnInit() {
    this.games = this.datasService.getGames().filter((game) => ({
      ...game,
      active: true,
    }));

    this.loadOrder();
  }

    loadOrder(): void {
     const saved = localStorage.getItem('cardOrder');
      if (saved) {
        const savedIds = JSON.parse(saved) as string[];
        const activeCards = this.games.filter((i) => i.active);
        this.games = savedIds
          .map((id) => activeCards.find((i) => i.id === id))
          .filter((i): i is iInitials => !!i);
        const missing = activeCards.filter((i) => !savedIds.includes(i.id));
        this.games = [...this.games, ...missing];
      } else {
        this.games = this.games.filter((i) => i.active);
      }
    }
}
