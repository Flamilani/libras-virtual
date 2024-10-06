import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logo = environment.imagePath;
}
