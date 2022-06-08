/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Producto } from '../model/Producto';
import { FireBaseAuthService } from './fire-base-auth.service';
import { FirestoreServiceService } from './firestore-service.service';
import { ListaCompraServiceService } from './lista-compra-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {


  constructor(private database: FirestoreServiceService, private firebaseauth: FireBaseAuthService, private listaService: ListaCompraServiceService) {
   }

  
  guardarProductoNuevo(nuevoProducto: Producto, uidUser: string, idLista: string){
    const pathProductos= 'Usuarios/'+uidUser+ '/'+ 'ListasCompra/'+ idLista + '/'+ 'Productos/';
    if(nuevoProducto.nombre!==''){
      this.database.crearDocumento(nuevoProducto,pathProductos,nuevoProducto.id);
    }

  }

  borrarProducto(idProducto: string,uidUser: string, idLista: string){
    const pathProductos= 'Usuarios/'+uidUser+ '/'+ 'ListasCompra/'+ idLista + '/'+ 'Productos/';
    this.database.deleteDoc(pathProductos,idProducto);
  }


  editarProducto(nuevoProducto: Producto, productoActual: Producto,uidUser: string, idLista: string){
    const pathProductos= 'Usuarios/'+uidUser+ '/'+ 'ListasCompra/'+ idLista + '/'+ 'Productos/';
    nuevoProducto=productoActual;
    if(nuevoProducto.nombre!==''){
      this.database.updateDoc(pathProductos,productoActual.id,nuevoProducto);
    }
  }

  actualizarProductoCheckeado(producto: Producto, newProducto: Producto,uidUser: string, idLista: string){
    const pathProductos= 'Usuarios/'+uidUser+ '/'+ 'ListasCompra/'+ idLista + '/'+ 'Productos/';
    newProducto=producto;
    if(producto.isChecked){
      producto.isChecked=false;
    }else if (!producto.isChecked){
      producto.isChecked=true;
    }
    this.database.updateDoc(pathProductos,producto.id,newProducto);
  }

  crearId(){
    return this.database.getId();
  }

  obtenerProductos(uidUser: string, idLista: string){
    const pathProductos= 'Usuarios/'+uidUser+ '/'+ 'ListasCompra/'+ idLista + '/'+ 'Productos/';
    return this.database.getCollection<Producto>(pathProductos);
  }
}
