import { Component } from '@angular/core';
import {
  aDialogues_01,
  bDialogues_01,
} from 'src/app/shared/constants/dialogues/dialogue-01.constant';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css'],
})
export class DialogueComponent {
  imgLoading = environment.imgLoading;

  combinedDialogues: { gif: string; text: string; sender: 'A' | 'B' }[] = [];
  loading = true;
  gifLoading: boolean[] = [];
  currentIndex = 0;

  showAButton = true;
  showBButton = false;
  conversationEnded = false;

  isTyping = false;

  typingSender: 'A' | 'B' | null = null;

  showNext(sender: 'A' | 'B') {
    const dialogues = sender === 'A' ? aDialogues_01 : bDialogues_01;

    if (this.currentIndex * 2 < dialogues.length) {
      const gif = dialogues[this.currentIndex * 2];
      const text = dialogues[this.currentIndex * 2 + 1];

      this.isTyping = true;
      this.typingSender = sender;
      this.showAButton = false;
      this.showBButton = false;

      setTimeout(() => {
        const msgIndex = this.combinedDialogues.length;
        this.combinedDialogues.push({ gif, text, sender });
        this.gifLoading[msgIndex] = true;

        this.isTyping = false;
        this.typingSender = null;

        if (sender === 'A') {
          this.showBButton = true;
        } else {
          this.showAButton = true;
          this.currentIndex++;
        }

        if (this.currentIndex * 2 >= aDialogues_01.length) {
          this.showAButton = false;
          this.showBButton = false;
          this.conversationEnded = true;
        }
      }, 1200);
    }
  }

  onGifLoad(index: number) {
    this.gifLoading[index] = false;
  }

  onGifError(index: number) {
    this.gifLoading[index] = false;
    console.error('Erro ao carregar o GIF na posição', index);
  }

  resetConversation() {
    this.gifLoading = [];
    this.combinedDialogues = [];
    this.currentIndex = 0;
    this.showAButton = true;
    this.showBButton = false;
    this.conversationEnded = false;
    this.isTyping = false;
    this.typingSender = null;

    setTimeout(() => {
      this.isTyping = false;
      this.showAButton = true;
    }, 1500);
  }
}
