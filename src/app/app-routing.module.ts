import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { StockControlComponent } from './pages/stock-control/stock-control.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { ActualizarstockComponent } from './pages/actualizarstock/actualizarstock.component';
import { EditarPrecioVentaComponent } from './pages/editar-precio-venta/editar-precio-venta.component';
import { AltaTalleProductoComponent } from './pages/alta-talle-producto/alta-talle-producto.component';
import { CrearproductoComponent } from './pages/crearproducto/crearproducto.component';
import { ListarTodosProductosComponent } from './pages/listar-todos-productos/listar-todos-productos.component';
import { EditarProductoGeneralComponent } from './pages/editar-producto-general/editar-producto-general.component';
import { MarcasComponent } from './pages/marcas/marcasprincipal/marcas.component';
import { EditarmarcaComponent } from './pages/marcas/editarmarca/editarmarca.component';
import { AgregarmarcaComponent } from './pages/marcas/agregarmarca/agregarmarca.component';
import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { InsertarCategoriaComponent } from './pages/categorias/insertar-categoria/insertar-categoria.component';
import { EditarCategoriaComponent } from './pages/categorias/editar-categoria/editar-categoria.component';

import { TallesComponent } from './pages/talles/tallesprincipal/talles.component';
import { AgregartalleComponent } from './pages/talles/agregartalle/agregartalle.component';
import { EditartalleComponent } from './pages/talles/editartalle/editartalle.component';

import { VerUltimaActualizacionComponent } from './pages/ver-ultima-actualizacion/ver-ultima-actualizacion.component';

import { VentasComponent } from './pages/ventas/ventas/ventas.component';
import { NuevaVentaComponent } from './pages/ventas/nueva-venta/nueva-venta.component';


const routes: Routes = [{
  path: '',
  loadChildren: './pages/login/login.module#LoginModule'
},

{
  path: 'dashboard', component: SidenavComponent,
  children: [{ path: 'controlStock', component: StockControlComponent },
  { path: 'crearProducto', component: CrearproductoComponent },
  { path: 'listarProductos', component: ListarTodosProductosComponent },
  {
    path: 'marcas', component: MarcasComponent,
    children: [{ path: 'editarMarca', component: EditarmarcaComponent },
    { path: 'agregarMarca', component: AgregarmarcaComponent }]
  },
  {   path: 'categorias', component: CategoriasComponent,
    children: [{ path: 'editarCategoria', component: EditarCategoriaComponent },
    { path: 'agregarCategoria', component: InsertarCategoriaComponent }]

  },
  {   path: 'talles', component: TallesComponent,
  children: [{ path: 'editarTalle', component: EditartalleComponent },
  { path: 'agregarTalle', component: AgregartalleComponent }]

}]
},

{
  path: 'ventas', component: VentasComponent,
  children: [{
    path: 'nuevaVenta', component: NuevaVentaComponent 
  }]

}


,
{ path: 'editarProducto', component: EditarProductoComponent },
{ path: 'editarProductoGeneral', component: EditarProductoGeneralComponent },
{ path: 'actualizarstock', component: ActualizarstockComponent },
{ path: 'editarPrecioVEnta', component: EditarPrecioVentaComponent },
{ path: 'altaTalleProducto', component: AltaTalleProductoComponent },
{ path: 'verUltActualiz', component: VerUltimaActualizacionComponent },

{ path: '**', redirectTo: ''}// este es para cuando pone /cualquiercosa, vaya al principal

];

@NgModule({
  imports: [RouterModule.forRoot(routes), SidenavModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
