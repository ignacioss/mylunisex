import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



import { StockService } from 'src/app/services/stock.service';

export interface Producto {
  codProducto: string,
  numDia: string,
  numMes: string,
  numAnio: string,
  idLocal: number;
  nombre: string;
  idCategoria: number;
  idMarca: number;
  cantidad: number;
  talle: number;
  precioVenta: number;
  precioCompra: number;
  imagen: string;
}


export interface Mandar {
  codProducto: any,
  idLocal: any,
  precioVenta: any
}



@Component({
  selector: 'app-editar-precio-venta',
  templateUrl: './editar-precio-venta.component.html',
  styleUrls: ['./editar-precio-venta.component.css']
})
export class EditarPrecioVentaComponent implements OnInit {

  sucursal:any;
  formulario:any;
  elemento: any;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private frmBuilder: FormBuilder, private stockService: StockService, public dialogRef: MatDialogRef<EditarPrecioVentaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.producto = {
      codProducto: '',
      numDia: '',
      numMes: '',
      numAnio: '',
      idLocal: null,
      nombre: '',
      idCategoria: null,
      idMarca: null,
      cantidad: null,
      talle: null,
      precioVenta: null,
      precioCompra: null,
      imagen: ''
    }

    this.formulario = this.frmBuilder.group({
      precioVenta: [0, Validators.required]
    });


  }

  aMandar:Mandar;
  producto: Producto;
  categorias: any[];
  marcas: any[];

  ngOnInit() {
    this.elemento = this.data.dialogTitle;
    this.sucursal = this.data.sucursal;
    
    this.formulario.get('precioVenta').value = this.elemento.precioVenta;    

    this.getMarcas();
    this.getCategorias();
  }

 

  getCategorias() {
    this.stockService.getCategorias().subscribe(
      res => {
        this.categorias = res.datos;
      },
      err => {
        console.log(err);
      }
    )
  }

  getMarcas() {
    this.stockService.getMarcas().subscribe(
      res => {
        this.marcas = res.datos;
      }
    )
  }

  cancelar() {
    this.dialogRef.close();
  }


  
  onSubmit(formulario) {

    if (formulario.status == "VALID" && formulario.get('precioVenta').value != 0) {

      //// falta hacer el php y mandar,
      // despues, hacer la opcion crear producto. y despues lo estetico.


      this.aMandar = {
        codProducto: this.elemento.codProducto,
        idLocal: this.sucursal.idLocal,
        precioVenta: formulario.get('precioVenta').value
      
      }

      console.log(this.aMandar);

      this.stockService.actualizarPrecioVenta(this.aMandar).subscribe(result => {

        console.log(result);
        alert("Producto actualizado con exito");
        this.dialogRef.close(true);

      }, error => {
        console.log(<any>error);
      })



    } else {
      alert("Debe completar los campos");
    }


  }





}
