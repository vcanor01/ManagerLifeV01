/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { Ejercicio } from 'src/app/model/Ejercicio';
import { Rutina } from 'src/app/model/Rutina';
import { RutinasServiceService } from 'src/app/services/rutinas-service.service';


@Component({
  selector: 'app-rutina',
  templateUrl: './rutina.component.html',
  styleUrls: ['./rutina.component.scss'],
})
export class RutinaComponent implements OnInit {

  
  ejercicios: Ejercicio[]= [];
  nuevaRutina: Rutina={
    id: this.rutinaService.crearId(),
    dia: 0,
    ejercicios: this.ejercicios
  };
  listarutinas: Rutina[]=[];
  uid='';
  preparado=false;
  constructor(private rutinaService: RutinasServiceService) { 
  }
  
  ngOnInit() {
    this.uid= getAuth().currentUser.uid;
    this.getRutinas();
    setTimeout(()=>{
      this.prepararse();
    },2000);
    setTimeout(()=>{
      this.preparado=true;
    },4000);
    if(this.listarutinas.length>29){
      this.preparado=true;
    }
    
    
  }
  
 
    //OBtener las rutinas ya creadas y las ordeno.
    getRutinas(){
      this.rutinaService.getRutinas(this.uid)
      .subscribe(res=>{
        this.listarutinas=res;
        this.ordenarRutinas();
      });
    }
  
  
    ordenarRutinas(){
        this.listarutinas=this.listarutinas.sort((a: { dia: number; }, b: { dia: number; }) => {
          if(a.dia === b.dia) {
            return 0; 
          }
          if(a.dia < b.dia) {
            return -1;
          }
          return 1;
        });
        
    }

  insertarRutina(rutina:Rutina){
    this.rutinaService.creacionMesRutina(rutina,rutina.id);
    this.actualizarRutina();
  }



  crearPorDefecto(){
      let pos=0;
      do{
        let rutinaAux:Rutina={
          id: this.rutinaService.crearId(),
          dia: pos+1,
          ejercicios:this.ejercicios
        };
          pos++;
          this.listarutinas.push(rutinaAux);
          console.log(pos);
      }while(pos<=30);
  }




  prepararse(){
    this.crearPorDefectoRutinas();
  }

  //Solo se va a ejecutar una vez por usuario.
  crearPorDefectoRutinas(){
    if(this.listarutinas.length<30){
      this.crearPorDefecto();
      console.log(this.listarutinas);
      this.listarutinas.forEach(response =>{
        this.nuevaRutina=response;
       this.insertarRutina(this.nuevaRutina);
      });
    }
  }

  actualizarRutina(){
    this.nuevaRutina={
      id:this.rutinaService.crearId(),
      dia:0,
      ejercicios: this.ejercicios
    };
  }

}
