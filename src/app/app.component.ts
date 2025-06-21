import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: `<!-- <app-update-popup></app-update-popup
    > --><router-outlet></router-outlet>`,
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
