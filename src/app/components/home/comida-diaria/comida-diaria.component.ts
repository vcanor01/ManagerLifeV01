/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Comida } from 'src/app/model/Comida';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';

@Component({
  selector: 'app-comida-diaria',
  templateUrl: './comida-diaria.component.html',
  styleUrls: ['./comida-diaria.component.scss'],
})
export class ComidaDiariaComponent implements OnInit {

  preparado=false;
  diasSemana = Array.of('Lunes','Martes', 'Miercoles', 'Jueves','Viernes', 'Sabado','Domingo');
  comidasTexto = Array.of('Desayuno', 'Comida', 'Cena', 'Entre comidas');
  

  
  constructor( ) { }

  ngOnInit() {
    setTimeout(()=>{
      this.preparado=true;
    },2000);
  }

}
