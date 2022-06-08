/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import { Component } from '@angular/core';
import { FireBaseAuthService } from './services/fire-base-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  /*
  * Necesitamos poner el firebaseauth para que se construya cuando iniciamos la aplicacion. 
  * En su constructor tendremos un metodo getIdUsuario Para que cuando abramos la aplicacion ya nos coja el uid del usuario que se ha logeado.
  */
  constructor(private firebaseAuth: FireBaseAuthService) {}
}
