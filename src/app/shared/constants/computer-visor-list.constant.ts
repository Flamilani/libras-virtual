import { iInitials } from "../interfaces/initials.interface";
import { processString } from "../utils/convert-urls";
import { StringsNamesUrl } from "./strings-url/strings-names";

const img01 = './../../../assets/imgs/deteccao-mao.png';
const img02 = './../../../assets/imgs/expressoes-faciais.png';

export const cComputerVisor: iInitials[] = [
  {
    id: '1',
    link: `/${processString(StringsNamesUrl.detector)}`,
    title: StringsNamesUrl.detector,
    image: img01,
    active: true,
  },
  {
    id: '2',
    link: `/${processString(StringsNamesUrl.expressoesFaciais)}`,
    title: StringsNamesUrl.expressoesFaciais,
    image: img02,
    active: true,
  },
]
