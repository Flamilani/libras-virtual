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
import { GlossaryComponent } from './glossary/glossary.component';
import { DialogueComponent } from './dialogue/dialogue.component';
import { SpeechComponent } from './speech/speech.component';
import { MapsComponent } from './maps/maps.component';
import { GamesComponent } from './games/games.component';
import { GameWordSearchComponent } from 'src/app/shared/components/game-word-search/game-word-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'webapp',
        component: InitialsComponent,
        data: { animation: 'HomePage' },
      },
      {
        path: 'datilologia',
        component: FingerspellingComponent,
        data: { animation: 'FingerspellingPage' },
      },
      {
        path: 'datilologia/:id',
        component: FingerspellingDetailComponent,
        data: { animation: 'FingerspellingPage' },
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
        path: 'dialogo',
        component: DialogueComponent,
      },
      {
        path: 'expressoes-faciais',
        component: FacialExpressionComponent,
      },
      {
        path: 'glossario',
        component: GlossaryComponent,
      },
      {
        path: 'assistente-voz',
        component: SpeechComponent,
      },
      {
        path: 'jogos',
        component: GamesComponent,
      },
      {
        path: 'caca-palavras',
        component: GameWordSearchComponent,
      },
      {
        path: 'mapas',
        component: MapsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
