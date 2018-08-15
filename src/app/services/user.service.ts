import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/iuser';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Run:
  // json-server --host 10.0.0.7 --port 3000 --watch db.json
  // http://10.0.0.7:3000/user

  url: String = 'http://10.0.0.7:3000';
  headers: any;

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello UserProvider Provider');
    // this.headers = {"headers": {"authorization": "Bearer " + this.token}};
    // Usado no Laravel

    // Tests Storage
    // this.storage.set('username', 'devesa');
    //
    // this.storage.get('username').then((val) => {
    //   if(val){
    //     console.log('Nome de Usuário: ' + val);
    //   }else{
    //     console.log('Usuário não registrado');
    //   }
    // });

  }


  setStorage(key, value) {
    return this.storage.set(key, value);
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  removeStorage(key) {
    this.storage.remove(key);
  }


  getAll() {
    return this.http.get<IUser[]>(this.url + '/user');
  }

  getOne(data: Number) {
    return this.http.get<IUser>(this.url + '/user/' + data);
  }

  postAdd(data: IUser) {
    return this.http.post<IUser>(this.url + '/user', data);
  }

  putEdit(data: IUser) {
    return this.http.put<IUser>(this.url + '/user/' + data.id, data);
  }

  deleteOne(data: IUser) {
    return this.http.delete<IUser>(this.url + '/user/' + data.id);
  }


  getLogin(data: IUser) {
    return this.http.get<IUser>('http://10.0.0.7:3000/user/' + data.id); // ????????
  }

}
