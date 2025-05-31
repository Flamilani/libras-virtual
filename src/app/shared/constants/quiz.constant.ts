
import { Question } from "../interfaces/quiz/question.interface";

  export const cQuestions: Question[] = [
    {
      id: 1,
      category: 'Familia',
      text: 'Qual é o sinal correto?',
      options: ['Pai', 'Filha', 'Tio', 'Sobrinha'],
      correctAnswer: 0,
    },
    {
      id: 2,
      category: 'Familia',
      text: 'Qual desses NÃO é um sistema de gerenciamento de banco de dados relacional?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'Oracle'],
      correctAnswer: 2
    },
    {
      id: 3,
      category: 'Frutas',
      text: 'Qual linguagem é conhecida por seu uso em machine learning e análise de dados?',
      options: ['Python', 'Java', 'C++', 'Ruby'],
      correctAnswer: 0
    },
    {
      id: 4,
      category: 'Frutas',
      text: 'Qual linguagem foi criada pela Microsoft?',
      options: ['Java', 'C#', 'Python', 'JavaScript'],
      correctAnswer: 1
    },

    {
      id: 5,
      category: 'Frutas',
      text: 'Qual linguagem é usada para estruturar conteúdo na web?',
      options: ['HTML', 'CSS', 'JavaScript', 'XML'],
      correctAnswer: 0
    },
    {
      id: 6,
      category: 'Animais',
      text: 'Qual destes é usado para estilizar páginas web?',
      options: ['HTML', 'CSS', 'JSON', 'YAML'],
      correctAnswer: 1
    },

    {
      id: 7,
      category: 'Animais',
      text: 'Qual sistema operacional é de código aberto?',
      options: ['Windows', 'macOS', 'Linux', 'iOS'],
      correctAnswer: 2
    },
    {
      id: 8,
      category: 'Animais',
      text: 'Qual destes NÃO é um sistema operacional?',
      options: ['Ubuntu', 'Fedora', 'Android', 'Apache'],
      correctAnswer: 3
    }
  ];
