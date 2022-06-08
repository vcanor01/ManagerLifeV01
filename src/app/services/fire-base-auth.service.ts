/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FireBaseAuthService {

  constructor(private auth: AngularFireAuth) {
    //Para que cuando abramos la aplicacion ya nos coja el uid del usuario que se ha logeado.
    this.getIdUsuario();
    
   }
  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email,password); 
  }

  logout(){
   return this.auth.signOut();
  }

  registrar(email: string, password: string){
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

 async getIdUsuario(){
   //Nos retorna una promesa donde podremos coger las credenciales del usuario, nosotros cogeremos el id.
    const user = await this.auth.currentUser;
    if(user === null){
      return null;
    }else {
      return user.uid;
    }
  }

  estadoAutenticacion(){
    //nos devuelve un observable para saber el estado de la autenticacion. 
    return this.auth.authState;
  }

  
  cambiarCredencialesUsuario(){
    
  }
}
