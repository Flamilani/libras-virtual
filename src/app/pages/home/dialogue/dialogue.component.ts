import { Component } from '@angular/core';

type Speaker = 'Pessoa A' | 'Pessoa B';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css'],
})
export class DialogueComponent {
  title: string = 'Diálogo em Libras';
  link: string = '/webapp';

  aDialogues = ['Olá!', 'Como você está?', 'Legal! Até mais.'];
  bDialogues = ['Oi!', 'Tudo bem, e você?', 'Tchau!'];

  aIndex = 0;
  bIndex = 0;

  messages: { sender: Speaker; text: string; avatar: string; cssClass: string }[] = [];

  isTyping = false;
  typingUser: Speaker | null = null;

  avatars: Record<Speaker, string> = {
    'Pessoa A': 'https://i.pravatar.cc/40?img=1',
    'Pessoa B': 'https://i.pravatar.cc/40?img=2',
  };

  async speak(person: 'A' | 'B') {
    if (this.isTyping) return;

    const sender: Speaker = person === 'A' ? 'Pessoa A' : 'Pessoa B';
    const dialogue =
      person === 'A'
        ? this.aDialogues[this.aIndex]
        : this.bDialogues[this.bIndex];

    if (!dialogue) return;

    this.isTyping = true;
    this.typingUser = sender;

    await this.delay(1000); // Simula "digitando..."

    this.messages.push({
      sender,
      text: dialogue,
      avatar: this.avatars[sender],
      cssClass: sender === 'Pessoa A' ? 'pessoa-a' : 'pessoa-b'
    });

    if (person === 'A') this.aIndex++;
    if (person === 'B') this.bIndex++;

    this.isTyping = false;
    this.typingUser = null;
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
