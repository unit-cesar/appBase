import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { ICurso } from '../../interfaces/icurso';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/detalhe/detalhe.page.ts';
  inscId: Subscription;
  inscCurso: Subscription;
  id: number;
  item: ICurso;

  inscRefUrl: Subscription;
  refUrl: String = 'ok';

  inscBackButton: Subscription;
  element: HTMLElement;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public cursosService: CursosService,
              public platform: Platform) {
  }

  ngOnInit() {

    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Detalhe');
      // Check log in chrome: "chrome://inspect/#devices"

      this.element = document.getElementById('backButton') as HTMLElement;
      this.element.click();
      // OR
      // this.router.navigate(['/']);

    }, error => {
      console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
    });


    // Buscando ref na URL, como o $_GET["ref"] do PHP
    this.inscRefUrl = this.route.queryParams.subscribe((res: any) => {
        this.refUrl = res['ref'];
      }, error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
        alert('Erro ao buscar var ref na URL');
      },
      () => {
      });

  }

  ngOnDestroy() {
    this.inscRefUrl.unsubscribe();
    this.inscBackButton.unsubscribe();
  }

  ionViewDidEnter() {

    // console.log(this.route);

    // valor estático
    // console.log(this.route.snapshot.params['id']);

    // valor dinamico
    this.inscId = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        // alert(this.id);

        this.inscCurso = this.cursosService.getOne(this.id).subscribe(
          res => {
            // console.log(res);
            this.item = res;
          },
          error => {
            console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
            alert('Não encontrado!');
            this.router.navigate(['/']);
          },
          () => {
            this.inscCurso.unsubscribe();
          });

      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
      },
      () => {
        this.inscId.unsubscribe();
      });

  }


  comprar(item) {
    alert('Comprar id: ' + item.id);
  }

}
