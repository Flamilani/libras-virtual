import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  aDialogues_01,
  bDialogues_01,
} from 'src/app/shared/constants/dialogues/dialogue-01.constant';
import { environment } from 'src/environments/environment';
import { JoyrideService } from 'ngx-joyride';
import { cSTEPS_PARAMETERS } from 'src/app/shared/constants/steps-tour.constant';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css'],
})
export class DialogueComponent implements OnInit {
  @ViewChild('bottom') bottomEl!: ElementRef;
  imgLoading = environment.imgLoading;

  combinedDialogues: { gif: string; text: string; sender: 'A' | 'B' }[] = [];
  loading = true;
  gifLoading: boolean[] = [];
  currentIndex = 0;

  showAButton = true;
  showBButton = false;
  conversationEnded = false;

  joyrideStep!: string;
  joyrideTitle!: string;
  joyrideDescription!: string;

  isTyping = false;

  typingSender: 'A' | 'B' | null = null;

  readonly stepViewData = cSTEPS_PARAMETERS;

  constructor(private readonly joyrideService: JoyrideService) {}

  ngOnInit(): void {
    this.joyrideStep = this.viewSteps[0].joyrideStep;
    this.joyrideTitle = this.viewSteps[0].title;
    this.joyrideDescription = this.viewSteps[0].description;

    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  private scrollToBottom() {
    setTimeout(() => {
      this.bottomEl.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  speakDialogue(sender: 'A' | 'B', text: string) {
    const synth = window.speechSynthesis;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    console.log(utterance);

    utterance.lang = 'pt-BR';
    utterance.rate = 1;
    utterance.pitch = 1;

    const speaker = sender === 'A' ? 'Pessoa A' : 'Pessoa B';
    utterance.text = `${speaker}: ${text}`;

    const voices = synth.getVoices();
    const ptVoice = voices.find((v) => v.lang === 'pt-BR') || voices[0];

    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    synth.speak(utterance);
  }

  showNext(sender: 'A' | 'B') {
    const dialogues = sender === 'A' ? aDialogues_01 : bDialogues_01;

    if (this.currentIndex * 2 < dialogues.length) {
      const gif = dialogues[this.currentIndex * 2];
      const text = dialogues[this.currentIndex * 2 + 1];

      this.isTyping = true;
      this.typingSender = sender;
      this.showAButton = false;
      this.showBButton = false;
      this.scrollToBottom();

      setTimeout(() => {
        const msgIndex = this.combinedDialogues.length;
        this.combinedDialogues.push({ gif, text, sender });
        this.gifLoading[msgIndex] = true;

        this.speakDialogue(sender, text);

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
        this.scrollToBottom();
      }, 1200);
    }
    this.scrollToBottom();
  }

  get viewSteps() {
    return this.stepViewData;
  }

  onClickHelp() {
    this.joyrideService.startTour({
      steps: ['firstStep'],
      customTexts: { prev: '<', next: '>', done: 'Pronto' },
    });
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
      this.scrollToBottom();
    }, 1500);
  }
}
