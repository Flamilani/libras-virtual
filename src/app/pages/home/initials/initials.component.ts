import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { iInitials } from 'src/app/shared/interfaces/initials.interface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { LettersStatesService } from 'src/app/shared/states/letters-states/letters-states.service';

@Component({
  selector: 'app-initials',
  templateUrl: './initials.component.html',
  styleUrls: ['./initials.component.css'],
})
export class InitialsComponent implements OnInit {
  public initials: iInitials[] = [];
  selectedValue$: Observable<string> = this.lettersStatesService.selectedValue$;
  letter: string = 'all';
  private subscription!: Subscription;

  constructor(
    private initialsService: DatasService,
    private lettersStatesService: LettersStatesService
  ) {}

  ngOnInit() {
    this.initials = this.initialsService.getInitials();
/*     this.getLetter();

    this.subscription = this.lettersStatesService.selectedValue$.subscribe(
      (letter) => {
        console.log('letter atualizado:', letter);
        this.letter = 'all';
      }
    ); */
  }

  getLetter() {
    this.lettersStatesService.selectLetter('all');
  }

/*   ngOnDestroy() {
    this.subscription.unsubscribe();
  } */
}
