/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularDelegate, MenuController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { Producto } from 'src/app/model/Producto';
import { FirestoreServiceService } from 'src/app/services/firestore-service.service';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.scss'],
})
export class ListaCompraComponent implements OnInit {

  newproducto: Producto = {
    id: this.productoService.crearId(),
    nombre: '',
    isChecked: false
  };

  idListaActual!:string;
  listaProductos: Producto[] = [];
  uid='';

  constructor(private productoService:ProductoServiceService, private route:ActivatedRoute) { }


  ngOnInit() {
    this.idListaActual=this.route.snapshot.params['idLista'];
    this.uid=getAuth().currentUser.uid;
    console.log(this.idListaActual);
    this.getProductos();
  }


  guardarProducto(){
    console.log('ejecutando');
    this.productoService.guardarProductoNuevo(this.newproducto,this.uid,this.idListaActual);
    this.actualizarNewProducto();
  }

  eventHandler(keyCode: number){
    if(keyCode===13){
      this.guardarProducto();
    }
  }

  getProductos(){
    this.productoService.obtenerProductos(this.uid,this.idListaActual).subscribe(
      res=>{
        this.listaProductos=res;
      }
    );
  }

  editarProducto(producto: Producto){
    this.newproducto=producto;
    this.productoService.editarProducto(this.newproducto,producto,this.uid,this.idListaActual);
  }

  eliminarProducto(id: string){
    this.productoService.borrarProducto(id,this.uid,this.idListaActual);
  }

  comprado(producto: Producto){
    this.productoService.actualizarProductoCheckeado(producto,this.newproducto,this.uid,this.idListaActual);
    
  }
  actualizarNewProducto(){
   this.newproducto = {
      id: this.productoService.crearId(),
      nombre: '',
      isChecked: false
    };
  }

}
