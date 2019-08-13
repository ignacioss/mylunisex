import { Component, OnInit, Output, EventEmitter, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';


export interface paraRecibir {
  codProducto: number;
  idLocal: number;
}


@Component({
  selector: 'app-ver-ultima-actualizacion',
  templateUrl: './ver-ultima-actualizacion.component.html',
  styleUrls: ['./ver-ultima-actualizacion.component.css']
})

export class VerUltimaActualizacionComponent implements OnInit {

  cantidad: number;
  precioComprado: any;
  elemento: any;
  sucursal: any;
  formulario: any;
  hora: any;
  fecha: any;
  paraRecibir: paraRecibir;
  datosObtenidos: any;  
  @Output() submitClicked = new EventEmitter<any>();

  disabled=true;
  constructor(private frmBuilder: FormBuilder, private stockService: StockService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      
      precioComprado: [{ value: '', disabled: true }, Validators.required],      
      cantidad: [{ value: '', disabled: true}, Validators.required]
    });
  }

  ngOnInit() {    
    this.elemento = this.data.dialogTitle;
    this.sucursal = this.data.sucursal;
    this.paraRecibir = {
      codProducto: this.elemento.codProducto,
      idLocal: this.sucursal.idLocal
    }
    
  this.getDatos();

  }


  getDatos() {
    this.stockService.verUltimaModificacion(this.paraRecibir).subscribe(
      res => {

        console.log(res.datos);
        this.datosObtenidos = res.datos;
        this.cantidad = res.datos.cantidad;
        this.precioComprado = res.datos.precioComprado;
      }
    )
  }


  public slideBarEvent(event: any) {
    if (event.checked) {
    
      this.formulario.get('precioComprado').enable();
      this.formulario.get('cantidad').enable();
    } else {
      this.formulario.get('precioComprado').disable();
      this.formulario.get('cantidad').disable();
      
    }

  }


}
