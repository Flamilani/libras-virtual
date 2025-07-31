import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

    share(link: string, title: string, text: string) {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: link
      }).then(() => {
        console.log('Compartilhado com sucesso!');
      }).catch((error) => {
        console.error('Erro ao compartilhar:', error);
      });
    } else {
      alert('Compartilhamento não suportado neste navegador.');
    }
  }
}
