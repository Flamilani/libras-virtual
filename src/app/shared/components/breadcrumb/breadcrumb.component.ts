import { Component, Input, OnInit } from '@angular/core';
import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { RouterLink } from '@angular/router';
import { ShareService } from '../../services/share.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  standalone: true,
  imports: [RouterLink, BootstrapIconsModule],
})
export class BreadcrumbComponent implements OnInit {
  @Input() title!: string;
  @Input() styles?: string;
  @Input() link!: string;

  sharedUrl = window.location.href;

  constructor(private shareService: ShareService) {}

  share() {
    const url = window.location.href;
    this.shareService.share(url, this.title, this.link);
  }

   useWebShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Compartilhar ' + this.title,
        text: this.link,
        url: this.sharedUrl
      }).then(() => {
        console.log('Compartilhado com sucesso!');
      }).catch((err) => {
        console.warn('Erro ao compartilhar:', err);
      });
    } else {
      this.copyLink();
    }
  }

    copyLink() {
    navigator.clipboard.writeText(this.sharedUrl).then(() => {
      alert('Link copiado para a área de transferência!');
    });
  }

  ngOnInit() {}
}
