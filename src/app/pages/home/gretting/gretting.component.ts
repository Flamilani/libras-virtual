import { Component } from '@angular/core';
import { CardsGrettingComponent } from '../../../shared/components/cards-gretting/cards-gretting.component';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { processString } from 'src/app/shared/utils/convert-urls';

@Component({
    selector: 'app-gretting',
    templateUrl: './gretting.component.html',
    styleUrls: ['./gretting.component.css'],
    standalone: true,
    imports: [CardUIComponent, BreadcrumbComponent, ContentUiComponent, CardsGrettingComponent]
})
export class GrettingComponent {
  title: string = StringsNamesUrl.saudacoes + ' em Libras';
  styles: string = "sectionTop";
  link = `/${processString(StringsNamesUrl.fundamentoLibras)}`;

}
