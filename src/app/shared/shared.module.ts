import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../modules/icons/icons.module';
import { CardUIComponent } from '../components/UI/card-ui/card-ui.component';
import { SelectComponent } from './components/select/select.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ContentUiComponent } from '../components/UI/content-ui/content-ui.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { CardsComponent } from '../components/cards/cards.component';
import { HomeRoutingModule } from '../pages/home/home-routing.module';
import { CardsSheetComponent } from '../components/cards-sheet/cards-sheet.component';


@NgModule({
  declarations: [
    CardUIComponent,
    ContentUiComponent,
    SelectComponent,
    BottomSheetComponent,
    CardsSheetComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    IconsModule,
    OverlayModule,
    ReactiveFormsModule,
    FormsModule,
    CardUIComponent,
    ContentUiComponent,
    SelectComponent,
    BottomSheetComponent,
    CardsSheetComponent
  ]
})
export class SharedModule { }
