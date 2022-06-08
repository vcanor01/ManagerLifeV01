/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Comida } from 'src/app/model/Comida';
import { ComidasServiceService } from 'src/app/services/comidas-service.service';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-comida-horarios',
  templateUrl: './comida-horarios.component.html',
  styleUrls: ['./comida-horarios.component.scss'],
})
export class ComidaHorariosComponent implements OnInit {

  contenido=false;
  dia!:string;
  horarioComida!:string;
  listaComidas: Comida[] = [];
  addComida=false;
  uid='';

  nuevaComida: Comida ={
    id: this.comidaService.crearId(),
    nombre: '',
    diaSemana: '',
    timeComida: ''
  };

  constructor(private comidaService: ComidasServiceService, private route:ActivatedRoute) { }

  ngOnInit() {
    this.uid= getAuth().currentUser.uid;
    this.dia=this.route.snapshot.params['dia'];
    this.horarioComida=this.route.snapshot.params['horarioComida'];
    this.getComidas();
   
  }

  addComidaLista(){
    this.nuevaComida.diaSemana=this.dia;
    this.nuevaComida.timeComida=this.horarioComida;
    this.comidaService.addComida(this.nuevaComida,this.uid);
    this.actualizarNuevaComida();
  }

  getComidas(){
    this.comidaService.getComidas(this.uid).subscribe( res=>
     {this.listaComidas= res.filter(element=> (element.diaSemana===this.dia) && (element.timeComida===this.horarioComida));
      if(this.listaComidas.length<1){
        this.contenido=true;
      }
    }
    );  
      
      
  }

  editarComida(comida: Comida){
    if(this.addComida===false){
      this.addComida=true;
    }
    this.nuevaComida= comida;
    this.comidaService.editarComida(this.uid,this.nuevaComida,comida);
  }
  borrarComida(idComida: string){
    this.comidaService.borrarComida(this.uid,idComida);
  }

  actualizarNuevaComida(){
    this.nuevaComida={
      id: this.comidaService.crearId(),
      nombre: '',
      diaSemana: '',
      timeComida: ''
    };
  }

  eventHandler(keyCode: number){
    if(keyCode===13){
      this.addComidaLista();
    }
  }
  
  cambiarEstado(){
    if(this.addComida===false){
      this.addComida=true;
    }else{
      this.addComida=false;
    }
    this.contenido=false;
  }
          
}
        