import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ids } from 'webpack';

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  constructor(private dataBase: AngularFirestore) { }

  //crear documento
  crearDocumento(data: any,path: string, id: string){
    const colleccion= this.dataBase.collection(path);
    return colleccion.doc(id).set(data);
  };

  getDoc<T>(path: string, id: string){
    return this.dataBase.collection<T>(path).doc(id).valueChanges(); //nos devuelve un observable para estar atento a los cambios en la bbdd
  }

  deleteDoc(path: string, id: string){
   return this.dataBase.collection(path).doc(id).delete();
  }

  updateDoc(path: string, id: string, data: any){
    return this.dataBase.collection(path).doc(id).update(data);
  }

  getId(){
    return this.dataBase.createId();
  }

  getCollection<T>(path: string){
    return this.dataBase.collection<T>(path).valueChanges(); //nos devuelve todos los elementos en un observable
  }
}
