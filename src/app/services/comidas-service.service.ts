/* eslint-disable no-trailing-spaces */
import { Injectable } from '@angular/core';
import { Comida } from '../model/Comida';
import { FirestoreServiceService } from './firestore-service.service';

@Injectable({
  providedIn: 'root'
})
export class ComidasServiceService {

  
  constructor(private database: FirestoreServiceService) { }


  addComida(nuevaComida: Comida, idUser: string){
    const path='Usuarios/'+idUser+ '/'+ 'ComidasSemanal/';
    if(nuevaComida.nombre!==''){
      this.database.crearDocumento(nuevaComida,path,nuevaComida.id);
    }
  }

  getComidas(uidUser: string){
    const path='Usuarios/'+uidUser+ '/'+ 'ComidasSemanal/';
    return this.database.getCollection<Comida>(path);
  }


  editarComida(uidUser: string, nuevaComida: Comida, comidaActual: Comida){
    const path='Usuarios/'+uidUser+ '/'+ 'ComidasSemanal/';
    nuevaComida= comidaActual;
    if(nuevaComida.nombre!==''){
      this.database.updateDoc(path,comidaActual.id,nuevaComida);
    }
  }
  
  borrarComida(uidUser: string, idComida: string){
    const path='Usuarios/'+uidUser+ '/'+ 'ComidasSemanal/';
    this.database.deleteDoc(path,idComida);
  }

  crearId(){
    return this.database.getId();
  }
}
