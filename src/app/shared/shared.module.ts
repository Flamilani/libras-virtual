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
import { RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { MaterialModule } from '../modules/material/material.module';
import { SpeechReaderComponent } from './components/speech-reader/speech-reader.component';
import { SpeechTranscriberComponent } from './components/speech-transcriber/speech-transcriber.component';
import { SpeechOcrComponent } from './components/speech-ocr/speech-ocr.component';
import { SpeechKeywordsComponent } from './components/speech-keywords/speech-keywords.component';
import { ToneBarComponent } from './components/tone-bar/tone-bar.component';
import { UpdatePopupComponent } from './components/update-popup/update-popup.component';

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
    MenuComponent,
    DialogContentComponent,
    SpeechReaderComponent,
    SpeechTranscriberComponent,
    SpeechOcrComponent,
    SpeechKeywordsComponent,
    ToneBarComponent,
    UpdatePopupComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
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
    MenuComponent,
    SpeechReaderComponent,
    SpeechTranscriberComponent,
    SpeechOcrComponent,
    SpeechKeywordsComponent,
    UpdatePopupComponent
  ]
})
export class SharedModule { }
