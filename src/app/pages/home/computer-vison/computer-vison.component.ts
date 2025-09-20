import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-computer-vison',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent, RouterLink],
  templateUrl: './computer-vison.component.html',
  styleUrl: './computer-vison.component.css',
})
export class ComputerVisonComponent implements OnInit {
  title = StringsNamesUrl.visorComputacional;

  public computer: any[] = [];

  constructor(private datasService: DatasService) {}

  ngOnInit() {
    this.computer = this.datasService.getComputerVisor().filter((computer) => ({
      ...computer,
      active: true,
    }));

    this.loadOrder();
  }

  loadOrder(): void {
    const saved = localStorage.getItem('cardOrder');
    if (saved) {
      const savedIds = JSON.parse(saved) as string[];
      const activeCards = this.computer.filter((i) => i.active);
      this.computer = savedIds
        .map((id) => activeCards.find((i) => i.id === id))
        .filter((i): i is iInitials => !!i);
      const missing = activeCards.filter((i) => !savedIds.includes(i.id));
      this.computer = [...this.computer, ...missing];
    } else {
      this.computer = this.computer.filter((i) => i.active);
    }
  }
}
