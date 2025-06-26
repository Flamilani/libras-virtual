import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { EditModeService } from 'src/app/shared/services/edit-mode.service';
import { LettersStatesService } from 'src/app/shared/states/letters-states/letters-states.service';
import { RouterLink } from '@angular/router';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';

@Component({
    selector: 'app-initials',
    templateUrl: './initials.component.html',
    styleUrls: ['./initials.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        CdkDropList,
        CdkDrag,
        RouterLink,
    ],
})
export class InitialsComponent implements OnInit {
  public initials: iInitials[] = [];
  selectedValue$: Observable<string> = this.lettersStatesService.selectedValue$;
  letter: string = 'all';
  editMode = false;
  private subscription!: Subscription;

  constructor(
    private initialsService: DatasService,
    private lettersStatesService: LettersStatesService,
    private editModeService: EditModeService
  ) {}

  ngOnInit() {
    this.initials = this.initialsService.getInitials().filter((initial) => ({
      ...initial,
      active: true,
    }));
    this.editModeService.editMode$.subscribe((mode) => (this.editMode = mode));

    this.loadOrder();
    /*     this.getLetter();

    this.subscription = this.lettersStatesService.selectedValue$.subscribe(
      (letter) => {
        console.log('letter atualizado:', letter);
        this.letter = 'all';
      }
    ); */
  }

  loadOrder(): void {
   const saved = localStorage.getItem('cardOrder');
    if (saved) {
      const savedIds = JSON.parse(saved) as string[];
      const activeCards = this.initials.filter((i) => i.active);
      this.initials = savedIds
        .map((id) => activeCards.find((i) => i.id === id))
        .filter((i): i is iInitials => !!i);
      const missing = activeCards.filter((i) => !savedIds.includes(i.id));
      this.initials = [...this.initials, ...missing];
    } else {
      this.initials = this.initials.filter((i) => i.active);
    }
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.initials, event.previousIndex, event.currentIndex);
    this.saveOrder();
  }

  saveOrder(): void {
    const order = this.initials.map((i) => i.id);
    localStorage.setItem('cardOrder', JSON.stringify(order));
  }

  getLetter() {
    this.lettersStatesService.selectLetter('all');
  }

  /*   ngOnDestroy() {
    this.subscription.unsubscribe();
  } */
}
