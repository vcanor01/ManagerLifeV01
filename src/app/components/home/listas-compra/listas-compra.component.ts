/* eslint-disable no-trailing-spaces */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { ListaCompra } from 'src/app/model/ListaCompra';
import { Producto } from 'src/app/model/Producto';
import { ListaCompraServiceService } from 'src/app/services/lista-compra-service.service';

@Component({
  selector: 'app-listas-compra',
  templateUrl: './listas-compra.component.html',
  styleUrls: ['./listas-compra.component.scss'],
})
export class ListasCompraComponent implements OnInit {
 
  contenido=false;
  preparado=false;
  producto: Producto[]=[];
  listaOfListaCompra: ListaCompra={
    id: this.listaService.crearId(),
    nombreLista: '',
    productos: this.producto
  };
  uid='';
  addLista=false;

  listaListasCompra: ListaCompra[] = [];
  constructor(private alertController: AlertController,private listaService: ListaCompraServiceService) {
    
   }

  ngOnInit() {
    this.uid= getAuth().currentUser.uid;
    this.getListas();
    setTimeout(()=>{
      this.preparado=true;
    },1800);
    
  }

 
  getListas(){
    this.listaService.getListas(this.uid).subscribe(res=>{
      this.listaListasCompra=res;
      if(this.listaListasCompra.length<1){
        this.contenido=true;
      }
    });
  }

  borrarListaCompra(idLista: string){
    this.listaService.borrarListaCompra(idLista, this.uid);
  }
  nuevaLista(){
    if(this.addLista){
      this.addLista=false;
    }else{
      this.addLista=true;
    }
    this.contenido=false;
  }

  crearLista(){
    this.listaService.crearNuevaLista(this.listaOfListaCompra,this.listaOfListaCompra.id, this.uid);
    this.actualizarNewLista();
  }

  eventHandler(keyCode: number){
    if(keyCode===13){
     this.crearLista();
    }
  }

  actualizarNewLista(){
    this.listaOfListaCompra={
      id: this.listaService.crearId(),
      nombreLista: '',
      productos: this.producto
    };
  }

  async avisoBorrarLista(listasId: string){
    
      const alert = await this.alertController.create({
        header: 'Borrar lista de la compra',
        message: '¿Seguro que quiere borrar esta lista de la compra?',
        buttons: [
          {
            text: 'Cancelar',
            cssClass: 'primary',
            id: 'cancelar-boton',
            handler: (a)=>{
              console.log('cancelar borrado');
            }
          },
          {
            text: 'Aceptar',
            cssClass: 'primary',
            id: 'aceptar-boton',
            handler: (b)=>{
              this.borrarListaCompra(listasId);
            }
          }
        ]
      });

      await alert.present();
    }
  


}
