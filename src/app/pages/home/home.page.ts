import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICurso } from '../../interfaces/icurso';
import { CursosService } from '../../services/cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/home/home.page.ts';
  lista: ICurso[];
  inscCursos: Subscription;

  dataTesteNew: ICurso = {

    // Exemplo te deste para POST, PUT, PATCH, DELETE

    'titulo': 'Curso de Ionic',
    'descricao': 'Aprenda na prática',
    'valor': 23.90,
    'valor_txt': 'R$ 23,90',
    'imagem': 'card-saopaolo.png',
    'aulas': [
      {
        'id': 0,
        'descricao': 'Aula 001',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      },
      {
        'id': 1,
        'descricao': 'Aula 002',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      },
      {
        'id': 2,
        'descricao': 'Aula 003',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      }
    ]

  };

  dataTesteEdit: ICurso = {

    // Exemplo te deste para PUT, PATCH, DELETE
    'id': 3,
    'titulo': 'Curso de Ionic XXX',
    'descricao': 'Aprenda na prática',
    'valor': 23.90,
    'valor_txt': 'R$ 23,90',
    'imagem': 'card-saopaolo.png',
    'aulas': [
      {
        'id': 0,
        'descricao': 'Aula 001',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      },
      {
        'id': 1,
        'descricao': 'Aula 002',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      },
      {
        'id': 2,
        'descricao': 'Aula 003',
        'video': 'https://www.youtube.com/embed/pEw4ifWjlik'
      }
    ]

  };


  constructor(private route: ActivatedRoute, private router: Router, public cursosService: CursosService) {

    // console.log(this.route);
    // console.log(this.route);
    // console.log(this.router.url);

  }

  ngOnInit() {
  }

  ionViewDidEnter() {

    // # Atualiza dados ao entrar ou retornar na página - Função do Ionic:

    // Run:
    // json-server --host 10.0.0.7 --port 3000 --watch db.json

    this.inscCursos = this.cursosService.getAll().subscribe(
      res => {
        this.lista = res;
      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
      },
      () => {
        this.inscCursos.unsubscribe();
      });

  }

  ngOnDestroy() {
    // this.inscCursos.unsubscribe();
  }

  getOneData(data: Number) {
    this.cursosService.getOne(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log('Erro em:' + error.message);
      },
      () => {
      });

  }

  postAddData(data: ICurso) {
    this.cursosService.postAdd(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log('Erro em:' + error.message);
      },
      () => {
        this.ionViewDidEnter(); // Reload
      });

  }

  putEditData(data: ICurso) {
    this.cursosService.putEdit(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log('Erro em:' + error.message);
      },
      () => {
        this.ionViewDidEnter(); // Reload
      });

  }

  deleteOneData(data: ICurso) {
    this.cursosService.deleteOne(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log('Erro em:' + error.message);
      },
      () => {
        this.ionViewDidEnter(); // Reload
      });

  }

  comprar(id) {
    this.router.navigate(['/detalhe/' + id], {queryParams: {'ref': this.router.url}});
  }

}
