import { iInitials } from '../interfaces/initials.interface';

const img01 = './../assets/imgs/datilologia.png';
const img02 = './../assets/imgs/nomes.png';
const img03 = './../assets/imgs/numeros.png';
const img04 = './../assets/imgs/saudacoes.png';
const img05 = './../assets/imgs/quiz.png';
const img06 = './../assets/imgs/expressoes-faciais.png';
const img07 = './../assets/imgs/dialogo.png';
const img08 = './../assets/imgs/transcricao-voz.png';
const img09 = './../assets/imgs/mapas.png';

export const cINITIALS: iInitials[] = [
  {
    id: '1',
    link: '/glossario',
    title: 'Glossário',
    image: img01,
    active: false,
  },
  {
    id: '2',
    link: '/datilologia',
    title: 'Datilologia',
    image: img01,
    active: true,
  },
  {
    id: '3',
    link: '/nomes',
    title: 'Nomes',
    image: img02,
    active: true,
  },
  {
    id: '4',
    link: '/numeros',
    title: 'Números',
    image: img03,
    active: true,
  },
  {
    id: '5',
    link: '/saudacoes',
    title: 'Saudações',
    image: img04,
    active: true,
  },
  {
    id: '6',
    link: '/quiz',
    title: 'Quiz',
    image: img05,
    active: false,
  },
  {
    id: '7',
    link: '/dialogo',
    title: 'Diálogo em Libras',
    image: img07,
    active: true,
  },
  {
    id: '8',
    link: '/expressoes-faciais',
    title: 'Expressões Faciais',
    image: img06,
    active: true,
  },
  {
    id: '9',
    link: '/assistente-voz',
    title: 'Assistente de Voz',
    image: img08,
    active: true,
  },
    {
    id: '10',
    link: '/mapas',
    title: 'Mapas',
    image: img09,
    active: false,
  },
];
