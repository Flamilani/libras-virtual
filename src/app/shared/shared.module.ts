import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../modules/icons/icons.module';
import { CardUIComponent } from '../components/UI/card-ui/card-ui.component';
import { CardsComponent } from '../components/cards/cards.component';


@NgModule({
  declarations: [
    CardUIComponent
  ],
  imports: [
    CommonModule,
    IconsModule,
  ],
  exports: [
    IconsModule,
    CardUIComponent
  ]
})
export class SharedModule { }
