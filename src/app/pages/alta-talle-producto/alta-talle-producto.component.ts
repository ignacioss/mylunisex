import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../user/user.service';

// servicios
import { StockService } from 'src/app/services/stock.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';

export interface Respuesta {
  datos: any[];
  resultado: any[];
  estado: any[];
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

export interface Mandar {
  user:any,
  cantidad: any,
  idTalle: any,
  precioVenta: any,
  precioComprado: any,
  idLocal: any;
  codGrupal: any;
}

export interface MandarPrimero {
  idTalle: any,
  idLocal: any;
  codGrupal: any;
}


@Component({
  selector: 'app-alta-talle-producto',
  templateUrl: './alta-talle-producto.component.html',
  styleUrls: ['./alta-talle-producto.component.css'],
  providers: [StockService]
})
export class AltaTalleProductoComponent implements OnInit {

  sucursal: any;
  formulario:any;
  producto:Producto;
  @Output() submitClicked = new EventEmitter<any>();
  resp:Respuesta[];


  constructor(private frmBuilder: FormBuilder, private stockService: StockService, public dialogRef: MatDialogRef<AltaTalleProductoComponent>,
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
      idLocal: [0, Validators.required],
      precioVenta: [0, Validators.required],
      idTalle: [, Validators.required],
      cantidad: [0, Validators.required],
      precioComprado: [0, Validators.required]
    });


  }

  aMandar: Mandar;
  aMandarPrimero: MandarPrimero;
  productos: Producto;
  categorias: any[];
  marcas: any[];
  talles: any[];

  ngOnInit() {
    this.sucursal = this.data.sucursal;
    this.getMarcas();
    this.getCategorias();
    this.obtenerProductos();
    this.getTalles();
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

  obtenerProductos() {

    this.stockService.getStockGeneralSucursal(this.sucursal.idLocal).subscribe(
      res => {
        if (res.resultado == 1) {
          this.sortJSON(res.datos, 'nombre', 'asc'); // ordena ascendente el json    
          this.productos = res.datos;

        } else {
          alert("No hay productos cargados en esta sucursal");
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

  getTalles() {
    this.stockService.getTalles().subscribe(
      res => {
        this.talles = res.datos;
      }
    )
  }

 

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit(formulario) {

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

      this.aMandarPrimero = {
        idTalle: formulario.get('idTalle').value,
        idLocal: this.sucursal.idLocal,
        codGrupal: formulario.get('codGrupal').value
      }

      this.stockService.chequearSiProductoExiste(this.aMandarPrimero).subscribe(
        res => {
          if (res.resultado == 1) {

            // ya existe el producto
            alert("Ya existe el producto con el talle seleccionado en esta sucursal");

          } else {
            // insertamos
            this.stockService.insertarOActualizarProducto(this.aMandar).subscribe(
              res => {
                if (res.estado == 1) {
                  alert("Producto cargado con exito");
                  this.dialogRef.close(true);

                }
              })
          }
        })
    }
  }
}
