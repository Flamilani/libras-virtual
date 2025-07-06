import { iInitials } from '../interfaces/initials.interface';
import { processString } from '../utils/convert-urls';
import { StringsNamesUrl } from './strings-url/strings-names'

const img01 = './../assets/imgs/datilologia.png';
const img02 = './../assets/imgs/nomes.png';
const img03 = './../assets/imgs/numeros.png';
const img04 = './../assets/imgs/saudacoes.png';
const img05 = './../assets/imgs/quiz.png';
const img06 = './../assets/imgs/expressoes-faciais.png';
const img07 = './../assets/imgs/dialogo.png';
const img08 = './../assets/imgs/transcricao-voz.png';
const img09 = './../assets/imgs/mapas.png';
const img10 = './../assets/imgs/jogos.png';

export const cINITIALS: iInitials[] = [
  {
    id: '1',
    link: `/${processString(StringsNamesUrl.glossario)}`,
    title: StringsNamesUrl.glossario,
    image: img01,
    active: false,
  },
  {
    id: '2',
    link: `/${processString(StringsNamesUrl.datilologia)}`,
    title: StringsNamesUrl.datilologia,
    image: img01,
    active: true,
  },
  {
    id: '3',
    link: `/${processString(StringsNamesUrl.nomes)}`,
    title: StringsNamesUrl.nomes,
    image: img02,
    active: true,
  },
  {
    id: '4',
    link: `/${processString(StringsNamesUrl.numeros)}`,
    title: StringsNamesUrl.numeros,
    image: img03,
    active: true,
  },
  {
    id: '5',
    link: `/${processString(StringsNamesUrl.saudacoes)}`,
    title: StringsNamesUrl.saudacoes,
    image: img04,
    active: true,
  },
  {
    id: '6',
    link: `/${processString(StringsNamesUrl.quiz)}`,
    title: StringsNamesUrl.quiz,
    image: img05,
    active: false,
  },
  {
    id: '7',
    link: `/${processString(StringsNamesUrl.dialogo)}`,
    title: StringsNamesUrl.dialogo,
    image: img07,
    active: true,
  },
  {
    id: '8',
    link: `/${processString(StringsNamesUrl.expressoesFaciais)}`,
    title: StringsNamesUrl.expressoesFaciais,
    image: img06,
    active: true,
  },
  {
    id: '9',
    link: `/${processString(StringsNamesUrl.assistenteVoz)}`,
    title: StringsNamesUrl.assistenteVoz,
    image: img08,
    active: true,
  },
    {
    id: '10',
    link: `/${processString(StringsNamesUrl.mapas)}`,
    title: StringsNamesUrl.mapas,
    image: img09,
    active: false,
  },
      {
    id: '11',
    link: `/${processString(StringsNamesUrl.jogos)}`,
    title: StringsNamesUrl.jogos,
    image: img10,
    active: true,
  },
];
