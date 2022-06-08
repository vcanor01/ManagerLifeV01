/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { Usuario } from 'src/app/model/Usuario';
import { FireBaseAuthService } from 'src/app/services/fire-base-auth.service';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {

  intentoRegistro=false;
  formularioEdicion = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    apellidoUno: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    aprellidoDos: new FormControl('', [Validators.required, Validators.maxLength(50)]),
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
  constructor(private router: ActivatedRoute,public toastController: ToastController, private route: Router, private firebaseauth: FireBaseAuthService, private firestoreService: FirestoreServiceService) { 
  }

  async ngOnInit() {
     this.uid=this.router.snapshot.params['userId'];
     this.getUserInfo(this.uid);
     console.log("ahora si: "+ this.uid);
   }


  getUserInfo(uid: string){
    const path = 'Usuarios';
    this.suscriberUserInfo= this.firestoreService.getDoc<Usuario>(path,this.uid).subscribe( response => {
      this.usuario = response;
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


    editar(){
      this.intentoRegistro=true;
      const path = 'Usuarios';
      this.usuario = {
        id: this.usuario.id,
        nombre: this.formularioEdicion.get('nombre').value,
        apellidoUno: this.formularioEdicion.get('apellidoUno').value,
        aprellidoDos: this.formularioEdicion.get('aprellidoDos').value,
        email: this.usuario.email,
        pass: this.usuario.pass
      }
      if(this.formularioEdicion.valid){
        this.firestoreService.updateDoc(path, this.uid, this.usuario)
        .then( res=>{this.presentToast()})
        .catch((error => {this.presentToast()})
        );
      }else{
        this.presentToastNoEditado();
      }
      console.log(this.formularioEdicion.valid);
    }


    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Perfil editado con éxito',
        duration: 1000,
        icon: 'information-circle',
        cssClass:'primary'
      });
      await toast.present();
    }
    async presentToastNoEditado() {
      const toast = await this.toastController.create({
        message: 'El perfil no pudo ser modificado',
        duration: 1000,
        icon: 'information-circle',
        cssClass:'danger'
      });
      await toast.present();
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
