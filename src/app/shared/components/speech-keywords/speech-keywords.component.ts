import { Component, HostListener, NgZone, OnInit } from '@angular/core';
import { Keywords } from '../../constants/keywords.constant';

@Component({
  selector: 'app-speech-keywords',
  templateUrl: './speech-keywords.component.html',
  styleUrls: ['./speech-keywords.component.css'],
})
export class SpeechKeywordsComponent implements OnInit {
  isMobile: boolean = true;
  fontSize = 15;
  showAddKeywords = true;
  keywords = Keywords;
  newWord: string = '';
  showDeleteAll = false;

  pitch = 1;
  showTone = false;
  toneColorClass = '';
  toneLabel = '';
  baseScale = 1;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    this.checkIfMobile();
    this.loadWords();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  addWord() {
    const word = this.newWord.trim();
    if (word && !this.keywords.includes(word)) {
      this.keywords.push(word);
      this.saveWords();
      this.newWord = '';
    }
  }

  saveWords() {
    localStorage.setItem('tts_keywords', JSON.stringify(this.keywords));
  }

  deleteWord(index: number) {
    this.keywords.splice(index, 1);
    this.saveWords();
  }

  loadWords() {
    const saved = localStorage.getItem('tts_keywords');
    if (saved) {
      this.keywords = JSON.parse(saved);
    } else {
      this.keywords = Keywords;
    }
  }

  increaseFontSize() {
    if (this.fontSize < 75) {
      this.fontSize += 5;
    }
  }

  decreaseFontSize() {
    if (this.fontSize > 15) {
      this.fontSize -= 5;
    }
  }

  speak(text: string) {
    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    console.log(utterance);

    utterance.lang = 'pt-BR';
    utterance.pitch = this.pitch;

    utterance.onstart = () => {
      this.ngZone.run(() => {
        this.updateToneVisual();
        this.showTone = true;
      });
    };
    utterance.onend = () => {
      this.ngZone.run(() => {
        this.showTone = false;
      });
    };

    utterance.onpause = () => {
      this.ngZone.run(() => {
        this.showTone = false;
      });
    };

    window.speechSynthesis.speak(utterance);
  }

  updateToneVisual() {
    if (this.pitch < 0.9) {
      this.toneColorClass = 'tone-low';
      this.baseScale = 0.7;
    } else if (this.pitch >= 0.9 && this.pitch <= 1.4) {
      this.toneColorClass = 'tone-normal';
      this.baseScale = 1;
    } else {
      this.toneColorClass = 'tone-high';
      this.baseScale = 1.3;
    }
  }

  stop() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      this.showTone = false;
    }
  }
}
