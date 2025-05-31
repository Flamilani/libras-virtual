export interface Question {
  id: number;
  category: string;
  text: string;
  options: string[];
  correctAnswer: number;
  gifUrl?: string;
  imageUrl?: string;
}
