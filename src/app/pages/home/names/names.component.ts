import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { BottomSheetComponent } from 'src/app/shared/components/bottom-sheet/bottom-sheet.component';
import { DialogContentComponent } from 'src/app/shared/components/dialog-content/dialog-content.component';
import { iNames } from 'src/app/shared/interfaces/names.interface';
import { DatasService } from 'src/app/shared/services/datas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.css'],
})
export class NamesComponent implements OnInit {
  title: string = 'Nome em Libras';
  styles: string = 'sectionTop';
  link: string = '/webapp';
  listNames = this.datasService.listNames;
  nameInput!: string;
  selectedFont!: string;
  isMobile!: boolean;

  icon = environment.iconSign;

  constructor(
    public dialog: MatDialog,
    private datasService: DatasService,
    private _bottomSheet: MatBottomSheet
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
    }, 100);
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  handleFontChange(newFont: string) {
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
