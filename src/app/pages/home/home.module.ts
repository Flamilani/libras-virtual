import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './templates/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { IconsModule } from 'src/app/modules/icons/icons.module';
import { InitialsComponent } from './initials/initials.component';
import { RouterModule } from '@angular/router';
import { FingerspellingComponent } from './fingerspelling/fingerspelling.component';
import { AlphabetComponent } from './alphabet/alphabet.component';
import { NamesComponent } from './names/names.component';
import { GrettingComponent } from './gretting/gretting.component';
import { NumbersComponent } from './numbers/numbers.component';
import { MapsComponent } from './maps/maps.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlphabetDetailComponent } from './alphabet/alphabet-detail/alphabet-detail.component';
import { FingerspellingDetailComponent } from './fingerspelling/fingerspelling-detail/fingerspelling-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    InitialsComponent,
    FingerspellingComponent,
    AlphabetComponent,
    NamesComponent,
    GrettingComponent,
    NumbersComponent,
    MapsComponent,
    AlphabetDetailComponent,
    FingerspellingDetailComponent,
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
    RouterModule,
  ],
})
export class HomeModule {}
