import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../user/user.service';
// servicios
import { StockService } from 'src/app/services/stock.service';

export interface Respuesta {
  datos: any[];
}
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


export interface ProductoNuevo {
  codGrupal: any,
  nombre: string;
  idCategoria: number;
  idMarca: number;
  imagen: string;
  nombreMarca: string;
  nombreCategoria: string;
}

export interface Mandar {
  user: any;
  cantidad: any,
  idTalle: any,
  precioVenta: any,
  precioComprado: any,
  idLocal: any;
  codGrupal: any;
}


@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.scss'],
  providers: [StockService]
})
export class AltaProductoComponent implements OnInit {

  sucursal: any;
  formulario: any;
  @Output() submitClicked = new EventEmitter<any>();


  constructor(private stockService: StockService, public dialogRef: MatDialogRef<AltaProductoComponent>, private frmBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserService) {
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
      codGrupal: [, Validators.required],
      idMarca: [0, Validators.required],
      idTalle: [, Validators.required],
      cantidad: [0, Validators.required],
      precioVenta: [0, Validators.required],
      precioComprado: [0, Validators.required]
    });



  }

  aMandar: Mandar;
  producto: Producto;
  categorias: any[];
  marcas: any[];
  productosCargados: ProductoNuevo;
  talles: any[];

  ngOnInit() {
    this.sucursal = this.data.sucursal;
    console.log(this.sucursal.idLocal);
    this.getTalles();
    this.getProductosQueNoEstanEnUnaSucursal(this.sucursal.idLocal);
  }


  getTalles() {
    this.stockService.getTalles().subscribe(
      res => {
        this.talles = res.datos;
      }
    )
  }

  getProductosQueNoEstanEnUnaSucursal(idLocal) {

    this.stockService.getProductosQueNoEstanEnUnaSucursal(idLocal).subscribe(
      res => {
        if (res.resultado == 1) {

          console.log(res);
          this.sortJSON(res.datos, 'nombreCategoria', 'asc');
          this.productosCargados = res.datos;

        } else {
          alert("Ya tienes todos los productos cargados disponibles en esta sucursal, o no hay ningun producto cargado en stock general");
          this.dialogRef.close();

        }
      }
    )

  }

  sortJSON(data: any, key: any, orden: any) {
    return data.sort(function (a, b) {
      var x = a[key],
        y = b[key];

      if (orden === 'asc') {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      }

      if (orden === 'desc') {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit(formulario) {
    console.log(formulario);

    if (formulario.status == "VALID" && formulario.get('cantidad').value != 0
      && formulario.get('precioComprado').value != 0 && formulario.get('precioVenta').value != 0) {

      let user = this.userService.getUserLoggedIn();

      this.aMandar = {
        user: user.userName,
        cantidad: formulario.get('cantidad').value,
        idTalle: formulario.get('idTalle').value,
        precioVenta: formulario.get('precioVenta').value,
        precioComprado: formulario.get('precioComprado').value,
        idLocal: this.sucursal.idLocal,
        codGrupal: formulario.get('codGrupal').value
      }

      console.log(this.aMandar);

      this.stockService.insertarOActualizarProducto(this.aMandar).subscribe(
        res => {
          console.log(res);
          if (res.estado == 1) {
            alert("Producto cargado con exito");
            this.dialogRef.close(true);

          }
        })
    } else {
      alert("Debe completar correctamente todos los campos");
    }

  }



}