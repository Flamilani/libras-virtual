import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CardUIComponent } from 'src/app/components/UI/card-ui/card-ui.component';
import { BreadcrumbComponent } from 'src/app/shared/components/breadcrumb/breadcrumb.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-initial-libras',
  standalone: true,
  imports: [CardUIComponent, BreadcrumbComponent, RouterLink],
  templateUrl: './initial-libras.component.html',
  styleUrl: './initial-libras.component.css',
})
export class InitialLibrasComponent {
  title = StringsNamesUrl.fundamentoLibras;

  public libras: any[] = [];

   constructor(private datasService: DatasService) {}

    ngOnInit() {
      this.libras = this.datasService.getInitialLibras().filter((libras) => ({
        ...libras,
        active: true,
      }));

      this.loadOrder();
    }

      loadOrder(): void {
       const saved = localStorage.getItem('cardOrder');
        if (saved) {
          const savedIds = JSON.parse(saved) as string[];
          const activeCards = this.libras.filter((i) => i.active);
          this.libras = savedIds
            .map((id) => activeCards.find((i) => i.id === id))
            .filter((i): i is iInitials => !!i);
          const missing = activeCards.filter((i) => !savedIds.includes(i.id));
          this.libras = [...this.libras, ...missing];
        } else {
          this.libras = this.libras.filter((i) => i.active);
        }
      }
}
