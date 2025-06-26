import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MenuComponent } from '../../../../shared/components/menu/menu.component';

@Component({
    selector: 'template-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [RouterLink, MenuComponent]
})
export class HeaderComponent {
  logo = environment.imagePath;

  constructor(public router: Router) {}
}
