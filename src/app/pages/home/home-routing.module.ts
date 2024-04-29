import { FingerspellingComponent } from './../fingerspelling/fingerspelling.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      {
        path: 'datilologia', component: FingerspellingComponent,
      },
      {
        path: 'datilologia/:id', component: FingerspellingComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
