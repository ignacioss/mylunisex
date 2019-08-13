import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { StockControlComponent } from './pages/stock-control/stock-control.component';
import { AlertModule } from 'ngx-alerts';

//ANGULAR MATERIAL
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material';
import {MatProgressBarModule } from '@angular/material/progress-bar';1
import {MatSortModule } from '@angular/material';


import { AltaProductoComponent } from './pages/alta-producto/alta-producto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifyStockComponent } from './pages/modify-stock/modify-stock.component';
import { EditarProductoComponent } from './pages/editar-producto/editar-producto.component';
import { ActualizarstockComponent } from './pages/actualizarstock/actualizarstock.component';
import { EditarPrecioVentaComponent } from './pages/editar-precio-venta/editar-precio-venta.component';
import { AltaTalleProductoComponent } from './pages/alta-talle-producto/alta-talle-producto.component';
import { CrearproductoComponent } from './pages/crearproducto/crearproducto.component';
import { ListarTodosProductosComponent } from './pages/listar-todos-productos/listar-todos-productos.component';
import { EditarProductoGeneralComponent } from './pages/editar-producto-general/editar-producto-general.component';
import { MarcasComponent } from './pages/marcas/marcasprincipal/marcas.component';
import { AgregarmarcaComponent } from './pages/marcas/agregarmarca/agregarmarca.component';
import { EditarmarcaComponent } from './pages/marcas/editarmarca/editarmarca.component';
import { CategoriasComponent } from './pages/categorias/categorias/categorias.component';
import { InsertarCategoriaComponent } from './pages/categorias/insertar-categoria/insertar-categoria.component';
import { EditarCategoriaComponent } from './pages/categorias/editar-categoria/editar-categoria.component';
import {UserService} from './user/user.service';


import { AppMaterialModule } from './app-material/app-material.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TallesComponent } from './pages/talles/tallesprincipal/talles.component';
import { AgregartalleComponent } from './pages/talles/agregartalle/agregartalle.component';
import { EditartalleComponent } from './pages/talles/editartalle/editartalle.component';
import { VerUltimaActualizacionComponent } from './pages/ver-ultima-actualizacion/ver-ultima-actualizacion.component';

const routes: Routes = [{
  path: '',
  loadChildren: './pages/login/login.module#LoginModule'
}];
@NgModule({
  declarations: [
    AppComponent,
    StockControlComponent,
    AltaProductoComponent,
    ModifyStockComponent,
    EditarProductoComponent,
    ActualizarstockComponent,
    EditarPrecioVentaComponent,
    AltaTalleProductoComponent,
    CrearproductoComponent,
    ListarTodosProductosComponent,
    EditarProductoGeneralComponent,
    MarcasComponent,
    CategoriasComponent,
    AgregarmarcaComponent,
    EditarmarcaComponent,
    InsertarCategoriaComponent,
    EditarCategoriaComponent,
    TallesComponent,
    AgregartalleComponent,
    EditartalleComponent,
    VerUltimaActualizacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    HttpClientModule,
    HttpModule,
    MatSelectModule,    
    ReactiveFormsModule,
    MatSlideToggleModule,
    AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    MatProgressBarModule,
    MatSortModule,
    AppMaterialModule
  ],
  providers: [UserService,AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents:[AltaProductoComponent]
})
export class AppModule { }
