import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedFont = 'fontLibrasA';
    }, 100);
  }

  handleFontChange(newFont: string) {
    this.selectedFont = newFont;
  }
}
