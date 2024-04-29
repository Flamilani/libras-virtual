import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ModalComponent } from './components/modal/modal.component';
import { CardUIComponent } from './UI/card-ui/card-ui.component';
import { FooterComponent } from './pages/home/templates/footer/footer.component';
import { HeaderComponent } from './pages/home/templates/header/header.component';
import { FingerspellingComponent } from './pages/fingerspelling/fingerspelling.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BreadcrumbComponent,
    ModalComponent,
    CardUIComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    FingerspellingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
