import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../modules/icons/icons.module';
import { CardUIComponent } from '../components/UI/card-ui/card-ui.component';
import { SelectComponent } from './components/select/select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContentUiComponent } from '../components/UI/content-ui/content-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardsSheetComponent } from './components/cards-sheet/cards-sheet.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardsGrettingComponent } from './components/cards-gretting/cards-gretting.component';
import { LettersComponent } from './components/letters/letters.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalLetterComponent } from './components/modal-letter/modal-letter.component';
import { ToggleBottomComponent } from './components/toggle-bottom/toggle-bottom.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CardUIComponent,
    ContentUiComponent,
    SelectComponent,
    BottomSheetComponent,
    CardsSheetComponent,
    ArrowsComponent,
    BreadcrumbComponent,
    CardsComponent,
    CardsGrettingComponent,
    LettersComponent,
    ModalComponent,
    ModalLetterComponent,
    ToggleBottomComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CardUIComponent,
    ContentUiComponent,
    SelectComponent,
    BottomSheetComponent,
    CardsSheetComponent,
    ArrowsComponent,
    BreadcrumbComponent,
    CardsComponent,
    CardsGrettingComponent,
    LettersComponent,
    ModalComponent,
    ModalLetterComponent,
    ToggleBottomComponent
  ]
})
export class SharedModule { }
