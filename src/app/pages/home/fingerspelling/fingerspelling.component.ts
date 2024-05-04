import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fingerspelling',
  templateUrl: './fingerspelling.component.html',
  styleUrls: ['./fingerspelling.component.css']
})
export class FingerspellingComponent implements OnInit {
  title: string = "Datilologia em Libras";
  styles: string = "sectionTop";
  link: string = "/iniciais";

  constructor() { }

  ngOnInit() {
  }
}
