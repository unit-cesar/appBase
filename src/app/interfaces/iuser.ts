export interface IUser {
  id?: number; // não é obrigatório
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  token?: string; // (pendente)remover o ?
  status?: string;
  message?: string;
}
