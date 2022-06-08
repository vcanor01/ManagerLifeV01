import { Injectable } from '@angular/core';
import { Ejercicio } from '../model/Ejercicio';
import { FirestoreServiceService } from './firestore-service.service';

@Injectable({
  providedIn: 'root'
})
export class EjercicioServiceService {

  constructor(private database: FirestoreServiceService) { }


  guardarEjercicioNuevo(nuevoEjercicio: Ejercicio, uidUser: string, idRutinas: string){
    const pathEjercicios= 'Usuarios/'+uidUser+ '/'+ 'Rutinas/'+ idRutinas + '/'+ 'Ejercicios/';
    if(nuevoEjercicio.nombreEjercicio!==''){
      this.database.crearDocumento(nuevoEjercicio,pathEjercicios,nuevoEjercicio.id);
    }
  }

  borrarEjercicio(idEjercicio: string, uidUser: string, idRutinas: string){
    const pathEjercicios= 'Usuarios/'+uidUser+ '/'+ 'Rutinas/'+ idRutinas + '/'+ 'Ejercicios/';
    this.database.deleteDoc(pathEjercicios,idEjercicio);
  }

  editarEjercicio(nuevoEjercicio: Ejercicio, ejercicioActual: Ejercicio,uidUser: string, idRutinas: string){
    const pathEjercicios= 'Usuarios/'+uidUser+ '/'+ 'Rutinas/'+ idRutinas + '/'+ 'Ejercicios/';
    nuevoEjercicio=ejercicioActual;
    if(nuevoEjercicio.nombreEjercicio!==''){
      this.database.updateDoc(pathEjercicios,ejercicioActual.id,nuevoEjercicio);
    }
  }

  obtenerEjercicios(uidUser: string, idRutinas: string){
    const pathEjercicios= 'Usuarios/'+uidUser+ '/'+ 'Rutinas/'+ idRutinas + '/'+ 'Ejercicios/';
    return this.database.getCollection<Ejercicio>(pathEjercicios);
  }


  crearId(){
    return this.database.getId();
  }

}
