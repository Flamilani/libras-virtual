import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css']
})
export class NamesComponent implements OnInit {
  title: string = "Nome em Libras";
  styles: string = "sectionTop";
  link: string = "/webapp";

  nameInput!: string;
  selectedFont!: string;

  icon = environment.iconSign;

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedFont = 'fontLibrasA';
    }, 100);
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }
}
