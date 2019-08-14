import { Component, OnInit , Output, EventEmitter, Inject, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StockService } from 'src/app/services/stock.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import {Router} from '@angular/router';


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
  codGrupal: number;
  nombre: any;
  idMarca: any;
  idCategoria: any;
}


export interface fotoAMandar {
  codGrupal: string;
  avatar: any;
}




@Component({
  selector: 'app-editar-producto-general',
  templateUrl: './editar-producto-general.component.html',
  styleUrls: ['./editar-producto-general.component.css']
})
export class EditarProductoGeneralComponent implements OnInit {

  fotoAMandar:fotoAMandar;
  desactivarBoton: boolean;
  categorias: any[];
  marcas: any[];
  talles: any[];
  producto: Producto;
  formulario: any;
  formula: FormGroup;
  prev: Boolean = false;
  imagen: any;
  imagenSeleccionada: any;
  aMandar: Mandar;
  notificacionCargado: boolean;
  notificacionExiste: boolean;
  notificacionError:boolean;
  myInput: any;
  url: String;
  loading: boolean;
  elemento: any;
  imagenActual:any;

  @Output() submitClicked = new EventEmitter<any>();  
  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;

  constructor(private stockService: StockService, private frmBuilder: FormBuilder,private router:Router,
     @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<EditarProductoGeneralComponent>) {

    this.formulario = this.frmBuilder.group({
      nombre: ['', Validators.required],
      idMarca: [, Validators.required],
      idCategoria: [, Validators.required]
    });



   }

  ngOnInit() {
    this.elemento = this.data.dialogTitle; 
    this.formulario.get('nombre').setValue(this.elemento.nombre);
    this.formulario.get('idMarca').setValue(this.elemento.idMarca);
    this.formulario.get('idCategoria').setValue(this.elemento.idCategoria);
    this.imagenActual=this.elemento.imagen;



    this.desactivarBoton = false;
    this.loading = true;
    this.notificacionCargado = true;
    this.notificacionExiste = true;
    this.notificacionError= true;
    this.getMarcas();
    this.getCategorias();
    this.formula = this.formBuilder.group({
      avatar: ['']
    });
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

  subir() {

    const formData = new FormData();
    formData.append('avatar', this.formula.get('avatar').value);
    formData.append('codGrupal',this.elemento.codGrupal);
    console.log(formData);

    this.stockService.actualizarFotoFile(formData).subscribe(
      (res) => {

      },
      (err) => {
        console.log(err);
      }
    );

  }

  capitalize(string) {
      return string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase(); 
   
  }

  resetearCampos() {
    this.prev = false;

    this.myInputVariable.nativeElement.value = "";

    this.formulario = this.frmBuilder.group({
      nombre: [' ', Validators.required],
      idMarca: [0, Validators.required],
      idCategoria: [0, Validators.required]
    });

  }


  onSubmit(formulario) {

    this.notificacionExiste = true;
    this.notificacionCargado = true;

    if (formulario.status == "VALID" && formulario.get('nombre').value != null) {

      this.desactivarBoton = true;
      this.loading = false;

      formulario.get('nombre').value = this.capitalize(formulario.get('nombre').value);
     
      this.aMandar = {
        codGrupal: this.elemento.codGrupal,
        nombre: formulario.get('nombre').value,
        idMarca: formulario.get('idMarca').value,
        idCategoria: formulario.get('idCategoria').value
      }

 
      this.stockService.actualizarProducto(this.aMandar).subscribe(result => {
       
        this.subir();

       alert("Producto Actualizado");
       this.dialogRef.close(true);

      }, error => {
        this.notificacionError = false;
        console.log(<any>error);
      })

      this.desactivarBoton = false;
      this.loading = true;

    }



  }

  onFileSelect(event) {
    this.prev = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      this.formula.get('avatar').setValue(file);
      reader.onload = () => {
        this.imagen = (<string>reader.result).split(',')[1];
        this.imagenSeleccionada = (<string>reader.result).split(',')[1];

      }
    }
  }

  cancelar() {
    this.dialogRef.close();
  }


}
