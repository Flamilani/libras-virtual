import { Component } from '@angular/core';
import { FooterComponent } from './templates/footer/footer.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './templates/header/header.component';
import { slideInAnimation } from 'src/app/shared/animations/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  animations: [slideInAnimation],
})
export class HomeComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animation'
    ];
  }
}
