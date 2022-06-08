import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { ListaCompraComponent } from './home/listas-compra/lista-compra/lista-compra.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { ComidaDiariaComponent } from './home/comida-diaria/comida-diaria.component';
import { ComidaHorariosComponent } from './home/comida-diaria/comida-horarios/comida-horarios.component';
import { RutinaComponent } from './home/rutina-gimnasio/rutina.component';
import { RutinaDetalleComponent } from './home/rutina-gimnasio/rutina-detalle/rutina-detalle.component';
import { ListasCompraComponent } from './home/listas-compra/listas-compra.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';



@NgModule({
  declarations: [
    HomeComponent,
    ListaCompraComponent,
    PerfilUsuarioComponent,
    ComidaDiariaComponent,
    ComidaHorariosComponent,
    RutinaComponent,
    RutinaDetalleComponent,
    ListasCompraComponent,
    EditarUsuarioComponent
],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
