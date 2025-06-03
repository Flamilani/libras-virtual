import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InitialsComponent } from './initials/initials.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { FingerspellingComponent } from './fingerspelling/fingerspelling.component';
import { NamesComponent } from './names/names.component';
import { GrettingComponent } from './gretting/gretting.component';
import { NumbersComponent } from './numbers/numbers.component';
import { AlphabetDetailComponent } from './alphabet/alphabet-detail/alphabet-detail.component';
import { FingerspellingDetailComponent } from './fingerspelling/fingerspelling-detail/fingerspelling-detail.component';
import { QuizComponent } from './quiz/quiz.component';
import { FacialExpressionComponent } from './facial-expression/facial-expression.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'webapp',
        component: InitialsComponent,
      },
      {
        path: 'datilologia',
        component: FingerspellingComponent,
      },
      {
        path: 'datilologia/:id',
        component: FingerspellingDetailComponent,
      },
      {
        path: 'alfabeto',
        component: AlphabetComponent,
      },
      {
        path: 'alfabeto/:id',
        component: AlphabetDetailComponent,
      },
      {
        path: 'nomes',
        component: NamesComponent,
      },
      {
        path: 'numeros',
        component: NumbersComponent,
      },
      {
        path: 'saudacoes',
        component: GrettingComponent,
      },
      {
        path: 'quiz',
        component: QuizComponent,
      },
      {
        path: 'expressoes-faciais',
        component: FacialExpressionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
