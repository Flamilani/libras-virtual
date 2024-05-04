import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './templates/header/header.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { IconsModule } from 'src/app/modules/icons/icons.module';
import { InitialsComponent } from './initials/initials.component';
import { RouterModule } from '@angular/router';
import { CardsComponent } from 'src/app/components/cards/cards.component';
import { FingerspellingComponent } from './fingerspelling/fingerspelling.component';
import { AlphabetComponent } from './alphabet/alphabet.component';

@NgModule({
  declarations: [
    HomeComponent,
    BreadcrumbComponent,
    HeaderComponent,
    ModalComponent,
    MenuComponent,
    InitialsComponent,
    CardsComponent,
    FingerspellingComponent,
    AlphabetComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    IconsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    CardsComponent
  ]
})
export class HomeModule { }
