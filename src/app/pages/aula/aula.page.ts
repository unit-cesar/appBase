import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAula } from '../../interfaces/iaula';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '../../services/cursos.service';
import { ICurso } from '../../interfaces/icurso';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.page.html',
  styleUrls: ['./aula.page.scss'],
})
export class AulaPage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/aula/aula.page.ts';
  inscId: Subscription;
  inscCurso: Subscription;
  aula: IAula;
  item: ICurso;
  id: number;
  idAula: number;
  inscBackButton: Subscription;
  element: HTMLElement;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cursosService: CursosService,
    public domSanitizer: DomSanitizer,
    public platform: Platform) {
  }

  ngOnInit() {
    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Aula');
      // Check log in chrome: "chrome://inspect/#devices"

      this.element = document.getElementById('backButton') as HTMLElement;
      this.element.click();
      // OR
      // this.router.navigate(['/']);

    }, error => {
      console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
    });
  }

  ionViewDidEnter() {

    // console.log(this.route);
    //
    // valor estático
    // console.log(this.route.snapshot.params['idAula']); // valor estático

    // valor dinamico
    this.inscId = this.route.params.subscribe(
      (params: any) => {
        this.id = params['idCurso'];
        this.idAula = params['idAula'];
        // alert(this.id);

        this.inscCurso = this.cursosService.getOne(this.id).subscribe(
          res => {
            // console.log(res);
            this.item = res;
            this.aula = this.item.aulas[this.idAula];
          },
          error => {
            console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
            alert('Não encontrado!');
            this.router.navigate(['/']);
          },
          () => {
          });

      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
      },
      () => {
      });

  }

  ngOnDestroy() {
    this.inscId.unsubscribe();
    this.inscCurso.unsubscribe();
    this.inscBackButton.unsubscribe();
  }

}
