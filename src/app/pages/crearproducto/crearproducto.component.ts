import { Component, OnInit, ElementRef } from '@angular/core';

import { ViewChild } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
  nombre: any,
  idMarca: any,
  idCategoria: any
}


@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})


export class CrearproductoComponent implements OnInit {


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

  @ViewChild('myInput', { static: false }) myInputVariable: ElementRef;


  constructor(private stockService: StockService, private frmBuilder: FormBuilder, private formBuilder: FormBuilder) {

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
      nombre: ['', Validators.required],
      idMarca: [, Validators.required],
      idCategoria: [, Validators.required]
    });

  }

  ngOnInit() {
    this.desactivarBoton = false;
    this.loading = true;
    this.notificacionCargado = true;
    this.notificacionExiste = true;
    this.notificacionError= true;
    this.getTalles();
    this.getMarcas();
    this.getCategorias();
    this.formula = this.formBuilder.group({
      avatar: ['']
    });
  }


  getTalles() {
    this.stockService.getTalles().subscribe(
      res => {
        this.talles = res.datos;
      }
    )
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

    this.stockService.uploadFile(formData).subscribe(
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
        nombre: formulario.get('nombre').value,
        idMarca: formulario.get('idMarca').value,
        idCategoria: formulario.get('idCategoria').value
      }

      this.stockService.VerificarSiNoExisteUnProductoParaCrearlo(this.aMandar).subscribe(result => {

        if (result.resultado == 2) {
          this.notificacionExiste = false;

        } else {

          this.stockService.insertarProducto(this.aMandar).subscribe(result => {
            this.subir();
            this.resetearCampos();
            alert("Producto creado correctamente");

            this.notificacionCargado = false
            

          }, error => {
            this.notificacionError = false;
            console.log(<any>error);
          })
        }

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




}
