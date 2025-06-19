import { Component, Input, Output } from '@angular/core';
import { EditModeService } from '../../services/edit-mode.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
   editMode = false;

  constructor(private editModeService: EditModeService) {
    this.editModeService.editMode$.subscribe(mode => {
      this.editMode = mode;
    });
  }

  toggleEditMode() {
    this.editModeService.toggleEditMode();
  }
}
