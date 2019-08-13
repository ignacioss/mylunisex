import { Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatCalendar } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



import { UserService } from '../../user/user.service';
import { StockService } from 'src/app/services/stock.service';



export interface Mandar  {
  user:any,
  cantidad: number,
  idTalle:number,
  precioVenta: number,
  precioComprado: number,
  idLocal: number,
  codGrupal: number
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




@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  elemento: any;
  sucursal:any;
  formulario: any;
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private frmBuilder: FormBuilder, private stockService: StockService, public dialogRef: MatDialogRef<EditarProductoComponent>,
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
      nombre: [0, Validators.required],
      precioVenta: [0, Validators.required],
      categoria: [0, Validators.required],
      marca: [0, Validators.required]
      //falta imagen
    });


  }


  producto: Producto;
  categorias: any[];
  marcas: any[];
  aMandar: Mandar;

  ngOnInit() {
    this.elemento = this.data.dialogTitle;

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

    if (formulario.status == "VALID" && formulario.get('cantidad').value != 0) {

      let cantidadDada = formulario.get('cantidad').value;
      let precioCompradoDado = formulario.get('precioComprado').value;
      let user = this.userService.getUserLoggedIn();


      this.aMandar = {
        user: user.userName,
        cantidad: cantidadDada,
        idTalle: this.elemento.idTalle,
        precioVenta: this.elemento.precioVenta,
        precioComprado: precioCompradoDado,
        idLocal: this.sucursal.idLocal,
        codGrupal: this.elemento.codGrupal
      }

      console.log(this.aMandar);

      this.stockService.insertarOActualizarProducto(this.aMandar).subscribe(result => {

        console.log(result);
        alert("Producto actualizado con exito");
        this.dialogRef.close();

      }, error => {
        console.log(<any>error);
      })



    } else {
      alert("Debe completar los campos");
    }


  }





}
