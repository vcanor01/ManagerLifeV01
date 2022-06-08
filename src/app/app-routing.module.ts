import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SetListaCompraComponent } from './adminComponents/set-lista-compra/set-lista-compra.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { ComidaDiariaComponent } from './components/home/comida-diaria/comida-diaria.component';
import { ComidaHorariosComponent } from './components/home/comida-diaria/comida-horarios/comida-horarios.component';
import { HomeComponent } from './components/home/home.component';
import { ListaCompraComponent } from './components/home/listas-compra/lista-compra/lista-compra.component';
import { ListasCompraComponent } from './components/home/listas-compra/listas-compra.component';
import { RutinaDetalleComponent } from './components/home/rutina-gimnasio/rutina-detalle/rutina-detalle.component';
import { RutinaComponent } from './components/home/rutina-gimnasio/rutina.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent},
  {path: 'listaCompra/:idLista',component:ListaCompraComponent},
  {path: 'listasCompra',component:ListasCompraComponent},
  {path: '',component:HomeComponent},//ruta por defecto si no hay ninguna ruta, en ese caso nos rederidige a home
  {path: 'perfilUsuario', component: PerfilUsuarioComponent},
  {path: 'editarUsuario/:userId', component: EditarUsuarioComponent},
  {path: 'comidas', component: ComidaDiariaComponent},
  {path: 'rutina', component: RutinaComponent},
  {path: 'rutinaDetalle/:dia/:idRutinas', component: RutinaDetalleComponent},
  {path: 'comidasHorario/:dia/:horarioComida', component: ComidaHorariosComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
