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
import { processString } from 'src/app/shared/utils/convert-urls';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InitialsComponent,
        data: { animation: 'HomePage' },
      },
      {
        path: processString(StringsNamesUrl.datilologia),
        component: FingerspellingComponent,
        data: { animation: 'FingerspellingPage' },
      },
      {
        path: `${processString(StringsNamesUrl.datilologia)}/:id`,
        component: FingerspellingDetailComponent,
        data: { animation: 'FingerspellingDetailPage' },
      },
      {
        path: 'alfabeto',
        component: AlphabetComponent,
        data: { animation: 'AlphabetPage' },
      },
      {
        path: 'alfabeto/:id',
        component: AlphabetDetailComponent,
        data: { animation: 'AlphabetDetailPage' },
      },
      {
        path: processString(StringsNamesUrl.nomes),
        component: NamesComponent,
      },
      {
        path: processString(StringsNamesUrl.numeros),
        component: NumbersComponent,
      },
      {
        path: processString(StringsNamesUrl.saudacoes),
        component: GrettingComponent,
      },
      {
        path: processString(StringsNamesUrl.quiz),
        component: QuizComponent,
      },
      {
        path: processString(StringsNamesUrl.dialogo),
        component: DialogueComponent,
      },
      {
        path: processString(StringsNamesUrl.expressoesFaciais),
        component: FacialExpressionComponent,
      },
      {
        path: processString(StringsNamesUrl.glossario),
        component: GlossaryComponent,
      },
      {
        path: processString(StringsNamesUrl.assistenteVoz),
        component: SpeechComponent,
      },
      {
        path: processString(StringsNamesUrl.jogos),
        component: GamesComponent,
        data: { animation: 'GamesPage' },
      },
      {
        path: 'caca-palavras',
        component: GameWordSearchComponent,
        data: { animation: 'GameWordSearchPage' },
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
