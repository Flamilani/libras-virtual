import { iInitials } from "../interfaces/initials.interface";

const img01 = './../assets/imgs/datilologia.png';
const img02 = './../assets/imgs/nomes.png';
const img03 = './../assets/imgs/numeros.png';

export const cINITIALS: iInitials[] = [
    {
        id: "1",
        link: "/datilologia",
        title: "Datilologia",
        image: img01,
        active: true
    },
    {
      id: "2",
      link: "/nomes",
      title: "Nomes",
      image: img02,
      active: true
  },
  {
    id: "3",
    link: "/numeros",
    title: "Números",
    image: img03,
    active: true
  },
]
