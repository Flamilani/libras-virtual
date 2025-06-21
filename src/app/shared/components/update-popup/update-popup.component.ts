import { Component, OnInit } from '@angular/core';
import { UpdateService } from '../../services/update.service';

@Component({
  selector: 'app-update-popup',
  templateUrl: './update-popup.component.html',
  styleUrls: ['./update-popup.component.css']
})
export class UpdatePopupComponent implements OnInit {
  show = false;

  constructor(private updateService: UpdateService) {}

  ngOnInit() {
    this.updateService.updateAvailable$.subscribe(isAvailable => {
      this.show = isAvailable;
    });
  }

  reloadApp() {
    this.updateService.activateUpdate();
  }
}
