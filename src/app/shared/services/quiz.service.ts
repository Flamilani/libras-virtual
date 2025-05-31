import { Injectable } from '@angular/core';
import { Question } from '../interfaces/quiz/question.interface';
import { cQuestions } from '../constants/quiz.constant';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  listQuestions = cQuestions;

  constructor() { }

getQuestionsByCategories(categories: string[]): Question[] {
    const filtered = this.listQuestions.filter(q => categories.includes(q.category));
    return this.shuffleArray(filtered);
  }

  getCategories(): string[] {
    return [...new Set(this.listQuestions.map(q => q.category))];
  }

  private shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
