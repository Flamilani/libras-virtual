import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css']
})
export class AlphabetComponent implements OnInit {
  title: string = "Alfabeto em Português";
  styles: string = "sectionTop";
  link: string = "/iniciais";

  constructor() { }

  ngOnInit() {
  }
}
