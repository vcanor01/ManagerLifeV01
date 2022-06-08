/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/Usuario';
import { FireBaseAuthService } from 'src/app/services/fire-base-auth.service';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent implements OnInit {

  intentoRegistro=false;
  //CONTROL DEL FORMULARIO:
  formularioRegistro = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    apellidoUno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    aprellidoDos: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  usuario: Usuario= {
    id: '',
    nombre: '',
    apellidoUno: '',
    aprellidoDos: '',
    email: '',
    pass: ''
  };

  uid = '';

  suscriberUserInfo: Subscription;
  constructor(public toastController: ToastController, private route: Router, private firebaseauth: FireBaseAuthService, private firestoreService: FirestoreServiceService) {

    this.firebaseauth.estadoAutenticacion().subscribe( response =>{
      if( response !== null){
        this.uid=response.uid;
        this.getUserInfo(this.uid);
        console.log('uid user actual'+this.uid)

      }else{
        this.initCliente();
      };
    });
  }

  initCliente(){
    this.uid='';
        this.usuario = {
          id: '',
          nombre: '',
          apellidoUno: '',
          aprellidoDos: '',
          email: '',
          pass: ''
  };
  console.log('id: '+this.uid);
}

 async ngOnInit() {
    const uid = await this.firebaseauth.getIdUsuario();
  }


  

  async registrarUsuario(){
    this.intentoRegistro=true;
    this.uid='';


    this.usuario = {
          id: '',
          nombre: this.formularioRegistro.get('nombre').value,
          apellidoUno: this.formularioRegistro.get('apellidoUno').value,
          aprellidoDos: this.formularioRegistro.get('aprellidoDos').value,
          email: this.formularioRegistro.get('email').value,
          pass: this.formularioRegistro.get('pass').value
    };

    const datosUsuario={
      email:this.formularioRegistro.get('email').value,
      pass:this.formularioRegistro.get('pass').value
    };


   if(this.formularioRegistro.valid){
     const response = await this.firebaseauth.registrar(datosUsuario.email, datosUsuario.pass)
     .catch( error => console.log('error ->'));


     const uid = await this.firebaseauth.getIdUsuario();
     this.usuario.id= uid;
     this.guardarUsuario();
 
     //Cuando este registrado volvemos al home ya logeados
     this.route.navigate(['/home']);
   }else{
     this.presentToastNoRegistrado();
   }

  }
  
  guardarUsuario(){
    const path = 'Usuarios';
    this.firestoreService.crearDocumento(this.usuario,path, this.usuario.id).then( res=>{
      console.log('guardado con exito');//this.loading.dismiss();
    }).catch (error =>{

    });

  }


  getUserInfo(uid: string){
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<Usuario>(path,this.uid).subscribe( response => {
      this.usuario = response;
    });

  }

  
  async presentToastNoRegistrado() {
    const toast = await this.toastController.create({
      message: 'Datos incorrectos o incompletos',
      duration: 1000,
      icon: 'information-circle',
      cssClass:'danger'
    });
    await toast.present();
  }
}
