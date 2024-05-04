import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { InitialsComponent } from './initials/initials.component';
import { AlphabetComponent } from "./alphabet/alphabet.component";
import { FingerspellingComponent } from "./fingerspelling/fingerspelling.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'iniciais', component: InitialsComponent,
      },
      {
        path: 'datilologia', component: FingerspellingComponent,
      },
      {
        path: 'datilologia/:id', component: FingerspellingComponent,
      },
      {
        path: 'alfabeto', component: AlphabetComponent,
      },
      {
        path: 'alfabeto/:id', component: AlphabetComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
