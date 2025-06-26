import { Component, Input, OnInit } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.css'],
    standalone: true,
    imports: [RouterLink, BootstrapIconsModule]
})
export class BreadcrumbComponent implements OnInit {
  @Input() title?: string;
  @Input() styles?: string;
  @Input() link?: string;

  constructor() { }

  ngOnInit() {
  }
}
