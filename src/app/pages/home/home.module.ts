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
import { LettersComponent } from 'src/app/components/letters/letters.component';
import { ModalLetterComponent } from 'src/app/components/modal-letter/modal-letter.component';
import { ToggleBottomComponent } from 'src/app/components/toggle-bottom/toggle-bottom.component';
import { NamesComponent } from './names/names.component';
import { GrettingComponent } from './gretting/gretting.component';
import { CardsGrettingComponent } from 'src/app/components/cards-gretting/cards-gretting.component';
import { NumbersComponent } from './numbers/numbers.component';
import { MapsComponent } from './maps/maps.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HomeComponent,
    BreadcrumbComponent,
    HeaderComponent,
    ModalComponent,
    ModalLetterComponent,
    ToggleBottomComponent,
    MenuComponent,
    InitialsComponent,
    FingerspellingComponent,
    AlphabetComponent,
    LettersComponent,
    NamesComponent,
    GrettingComponent,
    CardsGrettingComponent,
    NumbersComponent,
    MapsComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    IconsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    CardsComponent,
    LettersComponent,
    CardsGrettingComponent,
  ]
})
export class HomeModule { }
