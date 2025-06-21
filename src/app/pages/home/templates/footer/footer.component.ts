import { Component } from '@angular/core';
import { appVersion } from 'src/environments/version';

@Component({
  selector: 'template-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
  version = appVersion;
  currentYear = new Date().getFullYear();
}
