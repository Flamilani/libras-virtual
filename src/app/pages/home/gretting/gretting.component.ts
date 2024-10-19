import { Component } from '@angular/core';

@Component({
  selector: 'app-gretting',
  templateUrl: './gretting.component.html',
  styleUrls: ['./gretting.component.css']
})
export class GrettingComponent {
  title: string = "Saudações em Libras";
  styles: string = "sectionTop";
  link: string = "/webapp";

}
