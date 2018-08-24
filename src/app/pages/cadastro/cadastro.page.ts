import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit, OnDestroy {

  fileName = 'src/app/pages/cadastro/cadastro.page.ts';
  user: IUser = {'username': 'devesa', 'email': 'user@user.com', 'pw': '123'};
  inscAdd: Subscription;
  showPage: boolean;
  inscBackButton: Subscription;
  element: HTMLElement;
  myForm: FormGroup;
  messageError: String;


  constructor(
    public userService: UserService,
    public router: Router,
    public platform: Platform,
    private formBuilder: FormBuilder,
    public toastController: ToastController) {
  }

  ngOnInit() {
    this.inscBackButton = this.platform.backButton.subscribe(() => {
      console.log('Physical Back Button - Cadastro');
      // Check log in chrome: "chrome://inspect/#devices"

      this.element = document.getElementById('backButton') as HTMLElement;
      this.element.click();
      // OR
      // this.router.navigate(['/']);

    }, error => {
      console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
    });

    this.myForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],
      pw: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]

      // Para validar com Expressão Regular
      // tslint:disable-next-line:max-line-length
      // Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      // [Validators.required, Validators.minLength(3), Validators.maxLength(20)]

    });
  }

  ionViewDidEnter() {

    this.showPage = !this.userService.userAuth;

    // Força sair da página caso entre diretamente na URL (Complemento para 'authOutGuard')
    this.userService.pageRedundant();

  }

  onSubmit() {
    console.log(this.myForm);

    if (this.myForm.valid) {

      // console.log(this.myForm.value.userName);
      // this.user.username = this.myForm.value.userName;
      // this.user.email = this.myForm.value.email;
      // this.user.pw = this.myForm.value.pw;

      this.postAddData(this.myForm.value);

    } else {

      this.checkFields(this.myForm, null);

    }
  }

  checkFields(formGroup: FormGroup, changed) {

    this.messageError = 'Por favor, verifique os campos em vermelho!';
    Object.keys(formGroup.controls).forEach(campo => {
      // console.log(campo);

      if ((changed === null) && (!this.myForm.get(campo).valid)) {
        // Verifica se validos ao submeter
        this.element = document.getElementById('item-' + campo) as HTMLElement;
        this.element.setAttribute('color', 'danger');


        // Subscreve o Toast
        // console.log(this.myForm.get('userName').errors);
        if ((campo === 'email') && (this.myForm.get('email').errors['email'])) {
          //  Email invalido
          // console.log(this.myForm.get('email').errors['email']);
          this.messageError = 'Email invalido!';
        } else if ((campo === 'userName') && (this.myForm.get('userName').errors['minlength'])) {
          // Length userName
          // console.log(this.myForm.get('userName').errors['minlength']['requiredLength']);
          const requiredLength = this.myForm.get('userName').errors['minlength']['requiredLength'];
          this.messageError = 'No campo \'Nome\' é preciso ao menos ' + requiredLength + ' caracteres';

        } else if ((campo === 'pw') && (this.myForm.get('pw').errors['minlength'])) {
          // Length password
          // console.log(this.myForm.get('pw').errors['minlength']['requiredLength']);
          const requiredLength = this.myForm.get('pw').errors['minlength']['requiredLength'];
          this.messageError = 'No campo \'Senha\' é preciso ao menos ' + requiredLength + ' caracteres';
          // Reset pw
          this.myForm.controls['pw'].reset();
        }

        console.log(this.messageError);
        this.presentToastWithOptions(this.messageError);


        // const controle = formGroup.get(campo);
        // controle.markAsDirty();
        // if (controle instanceof FormGroup) {
        //   console.log(controle);
        //   // this.verificaValidacoesForm(controle);
        // }
      }

    });

    // Restaura cor caso esteja correto ao alterá-lo(ion-change)
    if ((changed) && (this.myForm.get(changed).valid)) {
      console.log('alterado e válido: ' + changed);
      this.element = document.getElementById('item-' + changed) as HTMLElement;
      this.element.removeAttribute('color');

    }


  }


  async presentToastWithOptions(message) {
    const toast = await this.toastController.create({
      message: message,
      showCloseButton: true,
      position: 'top',
      closeButtonText: 'x',
      duration: 4000,
      cssClass: '',
    });
    toast.present();
  }

  postAddData(data: IUser) {
    this.inscAdd = this.userService.postAdd(data).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.myForm.reset();
          this.router.navigate(['/login'], {queryParams: {'ref': this.router.url}});
        }
      },
      error => {
        console.log('\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
        alert('Erro ao Cadastrar!' + '\n\nERROR IN:\n' + this.fileName + '\n' + error.message + '\n\n');
        // this.router.navigate(['/']);
      },
      () => {
        this.inscAdd.unsubscribe();
      });

  }

  ngOnDestroy() {
    this.inscBackButton.unsubscribe();
  }

  cancelBack() {
    this.element = document.getElementById('backButton') as HTMLElement;
    this.element.click();
  }

  resetForm() {
    this.myForm.reset();
  }

}
