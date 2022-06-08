/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Rutina } from '../model/Rutina';
import { FirestoreServiceService } from './firestore-service.service';

@Injectable({
  providedIn: 'root'
})
export class RutinasServiceService {

  constructor(private database: FirestoreServiceService) { }


  creacionMesRutina(rutina: Rutina , idRutina: string){
    const uidUser = getAuth().currentUser.uid;
    const pathLista='Usuarios/' +uidUser+ '/' +'Rutinas/';
    return this.database.crearDocumento(rutina,pathLista, idRutina);
  }


  getRutinas(uidUser: string){
    const pathLista='Usuarios/' +uidUser+ '/' +'Rutinas/';
    return this.database.getCollection<Rutina>(pathLista);
  }


  crearId(){
    return this.database.getId();
  }
}
