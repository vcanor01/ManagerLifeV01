/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Ejercicio } from 'src/app/model/Ejercicio';
import { EjercicioServiceService } from 'src/app/services/ejercicio-service.service';

@Component({
  selector: 'app-rutina-detalle',
  templateUrl: './rutina-detalle.component.html',
  styleUrls: ['./rutina-detalle.component.scss'],
})
export class RutinaDetalleComponent implements OnInit {

  estadoAdd=false;
  dia!:number;
  idListaRutina!:string;
  uid='';


  nuevoEjercicio: Ejercicio={
    id: this.ejercicioService.crearId(),
    nombreEjercicio: '',
    minutos: 0,
    series: ''
  };
  listaEjercicios: Ejercicio[]=[];
  constructor(private route: ActivatedRoute, private ejercicioService: EjercicioServiceService) { }

  ngOnInit() {
    this.dia=this.route.snapshot.params['dia'];
    this.idListaRutina=this.route.snapshot.params['idRutinas'];
    this.uid = getAuth().currentUser.uid;
    this.getEjercicios();
  }

  add(){
    if(this.estadoAdd===false){
      this.estadoAdd=true;
    }else{
      this.estadoAdd=false;
    }
  }

  getEjercicios(){
    this.ejercicioService.obtenerEjercicios(this.uid,this.idListaRutina).subscribe(res=>{
      this.listaEjercicios = res;
    });
  }

  guardarEjercicio(){
    this.ejercicioService.guardarEjercicioNuevo(this.nuevoEjercicio,this.uid,this.idListaRutina);
    this.actualizarNuevaComida();
  }

  editarEjercicio(ejercicio: Ejercicio){
    if(this.estadoAdd===false){
      this.estadoAdd=true;
    }
    this.nuevoEjercicio=ejercicio;
    this.ejercicioService.editarEjercicio(this.nuevoEjercicio,ejercicio,this.uid,this.idListaRutina);
  }

  eventHandler(keyCode: number){
    if(keyCode===13){
      this.guardarEjercicio();
    }
  }

  borrarEjercicio(ejercicio: Ejercicio){
    this.ejercicioService.borrarEjercicio(ejercicio.id, this.uid,this.idListaRutina);
  }

  actualizarNuevaComida(){
    this.nuevoEjercicio={
      id: this.ejercicioService.crearId(),
      nombreEjercicio: '',
      minutos: 0,
      series: ''
    };
  }

}
