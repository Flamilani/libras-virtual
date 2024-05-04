import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Menu, ArrowLeft, ArrowLeftCircle } from 'angular-feather/icons';

const icons = {
  Menu,
  ArrowLeft,
  ArrowLeftCircle
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
