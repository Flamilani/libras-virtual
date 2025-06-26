import { Component, Input, Output } from '@angular/core';
import { EditModeService } from '../../services/edit-mode.service';
import { MatIcon } from '@angular/material/icon';
import { MatMenuTrigger, MatMenu, MatMenuItem } from '@angular/material/menu';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
    standalone: true,
    imports: [
        MatIconButton,
        MatMenuTrigger,
        MatIcon,
        MatMenu,
        MatMenuItem,
    ],
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
