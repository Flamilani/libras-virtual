import { Component, HostListener, OnInit } from '@angular/core';
import { Keywords } from '../../constants/keywords.constant';

@Component({
  selector: 'app-speech-keywords',
  templateUrl: './speech-keywords.component.html',
  styleUrls: ['./speech-keywords.component.css'],
})
export class SpeechKeywordsComponent implements OnInit {
  isMobile: boolean = true;
  fontSize = 15;
  utterance!: SpeechSynthesisUtterance;
  showAddKeywords = true;
  keywords = Keywords;
  newWord: string = '';
  showDeleteAll = false;

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
    this.stop(); // Garante que não sobrepõe

    this.utterance = new SpeechSynthesisUtterance(text);
    console.log(this.utterance);
    this.utterance.lang = 'pt-BR';
    this.utterance.rate = 1;
    this.utterance.pitch = 1;
    this.utterance.volume = 1;

    speechSynthesis.speak(this.utterance);
  }

  stop() {
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
    }
  }
}
