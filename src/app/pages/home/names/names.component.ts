import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { iNames } from 'src/app/shared/interfaces/names.interface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { NameStatesService } from 'src/app/shared/states/name-states/name-states.service';
import { environment } from 'src/environments/environment';
import { NgClass } from '@angular/common';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ContentUiComponent } from '../../../components/UI/content-ui/content-ui.component';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';
import { StringsNamesUrl } from 'src/app/shared/constants/strings-url/strings-names';
import { processString } from 'src/app/shared/utils/convert-urls';

@Component({
    selector: 'app-names',
    templateUrl: './names.component.html',
    styleUrls: ['./names.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        ContentUiComponent,
        ReactiveFormsModule,
        FormsModule,
        SelectComponent,
        NgClass,
    ],
})
export class NamesComponent implements OnInit {
  title: string = 'Nome em Libras';
  styles: string = 'sectionTop';
  link = `/${processString(StringsNamesUrl.fundamentoLibras)}`;

  listNames = this.datasService.listNames;
  nameInput!: string;
  selectedFont!: string;
  isMobile!: boolean;

  icon = environment.iconSign;

  constructor(
    public dialog: MatDialog,
    private datasService: DatasService,
    private _bottomSheet: MatBottomSheet,
    private nameStatesService: NameStatesService
  ) {
    this.checkIfMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.selectedFont = 'fontLibrasA';
      this.getFont(this.selectedFont);
    }, 100);
  }

  getName(name: string) {
    this.nameStatesService.selectName(name);
  }

  getFont(font: string) {
    this.nameStatesService.selectFont(font);
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  handleFontChange(newFont: string) {
    this.getFont((this.selectedFont = newFont));
    this.selectedFont = newFont;
  }

  openDialog(id: any): void {
    this.datasService.getNames(id).subscribe((data: any) => {
      const dialogRef = this.dialog.open(DialogContentComponent, {
        width: '580px',
        position: { top: '70px' },
        data: {
          id: data.id,
          title: data.title,
          video: data.video,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        console.log('the dialog was closed');
      });
    });
  }

  openBottomSheet(id: any): void {
    this.datasService.getNames(id).subscribe((data: any) => {
      this._bottomSheet.open(BottomSheetComponent, {
        data: {
          id: data.id,
          title: data.title,
          video: data.video,
          url: data.url,
          image: data.image,
          source: data.source,
        },
      });
    });
    navigator.vibrate([200]);
  }
}
