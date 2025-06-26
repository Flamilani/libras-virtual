import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `<!-- <app-update-popup></app-update-popup
    > --><router-outlet></router-outlet>`,
    standalone: true,
    imports: [RouterOutlet],
})
export class AppComponent  {
  constructor(private swUpdate: SwUpdate) {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      setInterval(() => {
        this.swUpdate.checkForUpdate();
      }, 300000); // 5 minutos
    }
  }
}
