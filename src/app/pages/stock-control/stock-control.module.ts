import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule  } from '@angular/material/table';
  

import { StockControlRoutingModule } from './stock-control-routing.module';
import { StockControlComponent } from './stock-control.component';
import { AltaProductoComponent } from '../alta-producto/alta-producto.component';

@NgModule({
  declarations: [StockControlComponent, AltaProductoComponent],
  imports: [
    CommonModule,
    StockControlRoutingModule,
    MatTableModule
  ],
  entryComponents:[AltaProductoComponent]
})
export class StockControlModule {



 }
