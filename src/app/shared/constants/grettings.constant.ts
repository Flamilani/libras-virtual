import { iGretting } from '../interfaces/gretting.interface';

const imgPt01 = './../../../assets/imgs/imagem-bom-dia.png';
const imgLs01 = './../../../assets/gifs/bom-dia.gif';
const imgPt02 = './../../../assets/imgs/imagem-boa-tarde.png';
const imgLs02 = './../../../assets/gifs/boa-tarde.gif';
const imgPt03 = './../../../assets/imgs/imagem-boa-noite.png';
const imgLs03 = './../../../assets/gifs/boa-noite.gif';

export const cGrettings: iGretting[] = [
  {
    id: '1',
    titlePt: 'Bom dia',
    imagePt: imgPt01,
    descriptionPt: '',
    titleLs: 'Bom dia em Libras',
    imageLs: imgLs01,
    descriptionLs: '',
  },
  {
    id: '2',
    titlePt: 'Boa tarde',
    imagePt: imgPt02,
    descriptionPt: '',
    titleLs: 'Boa tarde em Libras',
    imageLs: imgLs02,
    descriptionLs: '',
  },
  {
    id: '3',
    titlePt: 'Boa noite',
    imagePt: imgPt03,
    descriptionPt: '',
    titleLs: 'Boa noite em Libras',
    imageLs: imgLs03,
    descriptionLs: '',
  },
];
