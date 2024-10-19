import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Menu, ArrowLeft, ArrowLeftCircle, ArrowRight, ArrowRightCircle, Plus, Minus } from 'angular-feather/icons';

const icons = {
  Menu,
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
  Plus,
  Minus
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
