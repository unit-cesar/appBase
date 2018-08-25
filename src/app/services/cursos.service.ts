import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICurso } from '../interfaces/icurso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // Run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/cursos

  // Criar um serviço para fornecer a URL para todos os outros serviços e verificar se é prod ou dev
  private readonly API: String = 'http://10.0.0.7:3000';

  constructor(public http: HttpClient) {
    console.log('Hello CursosService Service');
  }

  getAll() {
    return this.http.get<ICurso[]>(this.API + '/cursos');
  }

  getOne(data: Number) {
    return this.http.get<ICurso>(this.API + '/cursos/' + data);
  }

  postAdd(data: ICurso) {
    return this.http.post<ICurso>(this.API + '/cursos', data);
  }

  putEdit(data: ICurso) {
    return this.http.put<ICurso>(this.API + '/cursos/' + data.id, data);
  }

  deleteOne(data: ICurso) {
    return this.http.delete<ICurso>(this.API + '/cursos/' + data.id);
  }

}
