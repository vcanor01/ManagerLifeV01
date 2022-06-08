/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, MenuController, ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/Usuario';
import { FireBaseAuthService } from 'src/app/services/fire-base-auth.service';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  uid='';
  
  usuarioLogeado: Usuario= {
    id: '',
    nombre: '',
    apellidoUno: '',
    aprellidoDos: '',
    email: '',
    pass: ''
  };
  constructor( private database: FirestoreServiceService, private toasController: ToastController, private firebaseauth: FireBaseAuthService, private router: Router, private menuController: MenuController, public actionSheetController: ActionSheetController) {
    //Cuando se carga la pantalla comprueba si hay un logeo.
    this.firebaseauth.estadoAutenticacion().subscribe( response =>{
      if( response !== null){
        this.uid=response.uid;
        this.database.getDoc<Usuario>("Usuarios/", this.uid).subscribe(responseDos =>{ this.usuarioLogeado=responseDos});
      }else{
        this.uid=null;
      };
    });
   }

  ngOnInit() {
    
  }

   logearUsuario(){
    const datosUsuario={
      email:this.usuarioLogeado.email,
      pass:this.usuarioLogeado.pass
    };
    this.firebaseauth.login(datosUsuario.email, datosUsuario.pass)
    .then( respons => {console.log('ingresado con exito')})
    .catch( error=> this.presentToastNologeado() );

    this.router.navigate(['/home']);
  }


  //metodo de las sheets para el menu de la derecha (los tres puntitos)
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Ajustes',
      cssClass: 'estiloSheet',
      buttons: [{
        text: 'Editar usuario',
        icon: 'person-sharp',
        id: 'delete-button',
        cssClass:'estiloIconoSheet',
        handler: () => {
          this.router.navigate(['/editarUsuario',this.usuarioLogeado.id]);
        }
      }, 
      {
        text: 'Cerrar sesion',
        icon: 'log-out-outline',
        cssClass: 'estiloIconoSheet',
        handler: () => {
          this.firebaseauth.logout();
        }
      },
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass:'estiloIconoSheet',
        handler: () => {
          console.log('Cancel clicked');
        }
      }],
      translucent: true,
      animated: true
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }

  async presentToastNologeado() {
    const toast = await this.toasController.create({
      message: 'Contraseña o usuario incorrectos',
      duration: 2000,
      icon: 'information-circle',
      cssClass:'danger'
    });
    await toast.present();
  }
}
