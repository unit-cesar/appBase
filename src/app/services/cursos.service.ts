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

  url: String = 'http://10.0.0.7:3000';

  constructor(public http: HttpClient) {
    console.log('Hello CursosService Service');
  }

  getAll() {
    return this.http.get<ICurso[]>(this.url + '/cursos');
  }

  getOne(data: Number) {
    return this.http.get<ICurso>(this.url + '/cursos/' + data);
  }

  postAdd(data: ICurso) {
    return this.http.post<ICurso>(this.url + '/cursos', data);
  }

  putEdit(data: ICurso) {
    return this.http.put<ICurso>(this.url + '/cursos/' + data.id, data);
  }

  deleteOne(data: ICurso) {
    return this.http.delete<ICurso>(this.url + '/cursos/' + data.id);
  }

}
