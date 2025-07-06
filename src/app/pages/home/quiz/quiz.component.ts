import { Component, OnInit } from '@angular/core';
import { CategoryResult } from 'src/app/shared/interfaces/quiz/category-result.interface';
import { Question } from 'src/app/shared/interfaces/quiz/question.interface';
import { QuizService } from 'src/app/shared/services/quiz.service';
import { NgClass } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/breadcrumb/breadcrumb.component';
import { CardUIComponent } from '../../../components/UI/card-ui/card-ui.component';

@Component({
    selector: 'app-quiz',
    templateUrl: './quiz.component.html',
    styleUrls: ['./quiz.component.css'],
    standalone: true,
    imports: [
        CardUIComponent,
        BreadcrumbComponent,
        NgClass,
    ],
})
export class QuizComponent implements OnInit {
  title: string = 'Quiz';
  styles: string = 'sectionTop';
  link: string = '/';

  categories: string[] = [];
  selectedCategories: string[] = [];
  questions: Question[] = [];
  currentQuestionIndex = 0;
  score = 0;
  quizStarted = false;
  quizFinished = false;
  userAnswers: {
    questionId: number;
    answerIndex: number;
    isCorrect: boolean;
    category: string;
  }[] = [];
  categoryResults: CategoryResult[] = [];

  languageSelected = false;
  showLibrasVideo = false;

  showFeedback = false;
  isAnswerCorrect = false;
  selectedOption: number | null = null;
  correctAnswerIndex: number | null = null;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.categories = this.quizService.getCategories();
  }

  selectLanguage(lang: 'pt' | 'libras'): void {
    this.languageSelected = true;
    this.showLibrasVideo = lang === 'libras';
  }

  openSnackBar() {
    alert('Selecione pelo menos uma categoria!');
  }

  toggleCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  startQuiz(): void {
    if (this.selectedCategories.length === 0) {
      this.openSnackBar();
      return;
    }

    this.questions = this.quizService.getQuestionsByCategories(
      this.selectedCategories
    );
    this.quizStarted = true;
    this.quizFinished = false;
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.resetFeedback();
  }

  selectCategory(category: string): void {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  /*   answerQuestion(selectedOption: number): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      this.score++;
    }

    this.userAnswers.push({
      questionId: currentQuestion.id,
      answerIndex: selectedOption,
      isCorrect: isCorrect,
      category: currentQuestion.category,
    });

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } else {
      this.calculateCategoryResults();
      this.quizFinished = true;
    }
  }
 */

  resetFeedback(): void {
    this.showFeedback = false;
    this.selectedOption = null;
    this.correctAnswerIndex = null;
  }

  answerQuestion(selectedOption: number): void {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    // Mostrar feedback
    this.selectedOption = selectedOption;
    this.correctAnswerIndex = currentQuestion.correctAnswer;
    this.isAnswerCorrect = selectedOption === currentQuestion.correctAnswer;
    this.showFeedback = true;

    // Atualizar pontuação se acertou
    if (this.isAnswerCorrect) {
      this.score++;
    }

    // Registrar resposta
    this.userAnswers.push({
      questionId: currentQuestion.id,
      answerIndex: selectedOption,
      isCorrect: this.isAnswerCorrect,
      category: currentQuestion.category,
    });

    // Avançar após delay
    setTimeout(() => {
      this.showFeedback = false;
      this.selectedOption = null;
      this.correctAnswerIndex = null;

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
      } else {
        this.calculateCategoryResults();
        this.quizFinished = true;
      }
    }, 1500); // 1.5 segundos de feedback
  }

  calculateCategoryResults(): void {
    this.categoryResults = this.selectedCategories.map((category) => {
      const categoryQuestions = this.questions.filter(
        (q) => q.category === category
      );
      const categoryAnswers = this.userAnswers.filter(
        (a) => a.category === category
      );

      const correct = categoryAnswers.filter((a) => a.isCorrect).length;
      const total = categoryQuestions.length;
      const percentage = Math.round((correct / total) * 100);

      return {
        name: category,
        correct: correct,
        total: total,
        percentage: percentage,
      };
    });
  }

  resetQuiz(): void {
    this.quizStarted = false;
    this.quizFinished = false;
    this.selectedCategories = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.userAnswers = [];
    this.categoryResults = [];
    this.resetFeedback();
  }
}
