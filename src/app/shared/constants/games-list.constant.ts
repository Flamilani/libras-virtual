import { iInitials } from "../interfaces/initials.interface";
import { processString } from "../utils/convert-urls";
import { StringsNamesUrl } from "./strings-url/strings-names";

const img01 = './../../../assets/imgs/caca-palavras.png';
const img02 = './../../../assets/imgs/quiz.png';

export const cGAMES: iInitials[] = [
  {
    id: '1',
    link: `/${processString(StringsNamesUrl.cacasPalavras)}`,
    title: StringsNamesUrl.cacasPalavras,
    image: img01,
    active: true,
  },
  {
    id: '2',
    link: `/${processString(StringsNamesUrl.quiz)}`,
    title: StringsNamesUrl.quiz,
    image: img02,
    active: false,
  },
]
