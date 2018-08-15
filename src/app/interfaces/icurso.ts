import { IAula } from './iaula';

export interface ICurso{
  id?: number; // não é obrigatório
  titulo: string;
  descricao: string;
  valor: number;
  valor_txt: string;
  imagem: string;
  aulas: IAula[];
}
