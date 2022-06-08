/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable no-var */
/* eslint-disable @angular-eslint/contextual-lifecycle */
/* eslint-disable no-trailing-spaces */
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ListaCompra } from '../model/ListaCompra';
import { Usuario } from '../model/Usuario';
import { FireBaseAuthService } from './fire-base-auth.service';
import { FirestoreServiceService } from './firestore-service.service';
import { getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class ListaCompraServiceService{


  constructor(private database: FirestoreServiceService, private firebaseauth: FireBaseAuthService, private auth: AngularFireAuth) {

   }

  getListas(uidUser: string){
    let pathListaDos='Usuarios/' +uidUser+ '/' +'ListasCompra/';
    return this.database.getCollection<ListaCompra>(pathListaDos);
  }

  crearNuevaLista(lista: ListaCompra, idLista: string,uidUser: string){
    let pathLista='Usuarios/' +uidUser+ '/' +'ListasCompra/';
   return this.database.crearDocumento(lista,pathLista, idLista);
  }


  borrarListaCompra(idLista: string, uidUser: string){
    let pathLista='Usuarios/' +uidUser+ '/' +'ListasCompra/';
   return this.database.deleteDoc(pathLista,idLista);
  }

  crearId(){
    return this.database.getId();
  }

 

}

