import { Component, OnInit } from '@angular/core';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';
import { DatasService } from 'src/app/shared/services/datas.service';

@Component({
  selector: 'app-initials',
  templateUrl: './initials.component.html',
  styleUrls: ['./initials.component.css']
})
export class InitialsComponent implements OnInit {
  title: string = "";
  styles: string = "sectionTop";
  link: string = "sinalario";

  public initials: iInitials[] = [];

  constructor(
    private initialsService: DatasService
  ) { }

  ngOnInit() {
    this.initials = this.initialsService.getInitials();
  }

}
