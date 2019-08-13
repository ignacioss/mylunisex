import { Component, OnInit, Output, EventEmitter, Inject, } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from '../../user/user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface paraRecibir {
  codProducto: number;
  idLocal: number;
}

export interface Mandar {
  id: any,
  user: any,
  codProducto: any,
  cantidad: any,
  precioComprado: any,
  idLocal: any;
}

export interface Mandar2 {
  codProducto: any,
  cantidad: any,
  precioComprado: any,
  idLocal: any;
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
  aMandar: Mandar;
  aMandar2:Mandar2;
  @Output() submitClicked = new EventEmitter<any>();

  disabled = true;
  constructor(private frmBuilder: FormBuilder, private stockService: StockService, @Inject(MAT_DIALOG_DATA) public data: any
    , public dialogRef: MatDialogRef<VerUltimaActualizacionComponent>, private userService: UserService) {
    this.formulario = this.frmBuilder.group({

      precioComprado: [{ value: '', disabled: true }, Validators.required],
      cantidad: [{ value: '', disabled: true }, Validators.required]
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

  cancelar() {
    this.dialogRef.close();
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





  onSubmit(formulario) {

    if (formulario.status == "VALID" && formulario.get('cantidad').value != 0) {

      let cantidadDada = formulario.get('cantidad').value;
      let precioCompradoDado = formulario.get('precioComprado').value;

      let user = this.userService.getUserLoggedIn();

      this.aMandar = {
        id: this.datosObtenidos.id,
        user: user.userName,
        codProducto: this.elemento.codProducto,
        cantidad: cantidadDada,
        precioComprado: precioCompradoDado,
        idLocal: this.sucursal.idLocal
      }

      console.log(this.aMandar);

      this.stockService.actualizarProductoEnPrecios(this.aMandar).subscribe(result => {

        this.aMandar2 = {
          codProducto: this.elemento.codProducto,
          cantidad: cantidadDada,
          precioComprado: precioCompradoDado,
          idLocal: this.sucursal.idLocal
        }



        this.stockService.actualizarPrecioCompradoYCantidadAProducto(this.aMandar2).subscribe(result => {

          alert("Se actualizó con exito");

          this.dialogRef.close(true);

        }, error => {
          console.log(<any>error);
        })


      }, error => {
        console.log(<any>error);
      })



    } else {
      alert("Debe completar los campos");
    }


  }

}
