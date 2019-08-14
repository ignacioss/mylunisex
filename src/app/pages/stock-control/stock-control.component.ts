import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AltaProductoComponent } from '../alta-producto/alta-producto.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { StockService } from 'src/app/services/stock.service';
import { ActualizarstockComponent } from '../actualizarstock/actualizarstock.component';
import { EditarPrecioVentaComponent } from '../editar-precio-venta/editar-precio-venta.component';
import { VerUltimaActualizacionComponent } from '../ver-ultima-actualizacion/ver-ultima-actualizacion.component'
import { AltaTalleProductoComponent } from '../alta-talle-producto/alta-talle-producto.component';
import { UserService } from '../../user/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSortModule, MatSort, MatTableDataSource } from '@angular/material';
import { ViewChild } from '@angular/core';



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

export interface Owner {
  codGrupal:string;
  codProducto: string;
  nombre: string;
  nombreMarca: string;
  nombreCategoria: string;
  nombreTalle: string;
  precioVenta: number;
  cantidad: number;

}

export interface OwnerGrupal {
  codGrupal: number;
}



export interface Owner2 {
  codGrupal: number;
  nombre: string;
  nombreMarca: string;
  nombreCategoria: string;

}

export interface PeriodicElement {
  activo: number;
  cantidad: number;
  codGrupal: number;
  codProducto: number;
  idCategoria: number;
  idMarca: number;
  idTalle: number;
  imagen: string;
  nombre: string;
  nombreCategoria: string;
  nombreMarca: string;
  nombreTalle: string;
  precioVenta: number;
}
export interface Login {
  userName: string;
  nombre: string;
}


@Component({
  selector: 'app-stock-control',
  templateUrl: './stock-control.component.html',
  styleUrls: ['./stock-control.component.scss'],
  providers: [StockService]
})
export class StockControlComponent implements OnInit, AfterViewInit {

  Manda: Login;
  dni: any;
  public dataSource = new MatTableDataSource<Owner>();
  
  nameFilter = new FormControl('');

  filterValues = {    codGrupal: ''};

  formulario: any;
  constructor(private frmBuilder: FormBuilder, private dialog: MatDialog, private _stockservice: StockService, 
    private userService: UserService) {
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
      username: [, Validators.required]
    });


    this.dataSource.filterPredicate = this.tableFilter();


  }





  ocultarTabla1: boolean;
  ocultarTabla2: boolean;
  ocultarSlide: boolean;
  ocultarBotonAgregarProducto: boolean;
  ocultarBotonAgregarTalle: boolean;
  producto: Producto;
  sucursales: any[];
  SucursalSeleccionada: any;
  username: any;
  usserLogged: string;
  eventCheked: any;
  displayedColumns = ['codGrupal', 'position', 'name', 'marca', 'categoria', 'talle', 'precioComprado', 'precioVenta', 'cantidad', 'actions'];



  URLIMAGEN: String = "https://holanosoynada222.000webhostapp.com/Zapat/Productos/ImagenesProductos/";
  displayedColumns2 = ['position', 'name', 'marca', 'categoria', 'imagen', 'actions'];

  imagenes: any;
  aTabla: any;
  public dataSourceCodGrupal = new MatTableDataSource<OwnerGrupal>();
  public dataSource2;
  public dataSourceCodGrupal2 = new MatTableDataSource<OwnerGrupal>();
  slideBar: boolean;

  

  @ViewChild(MatSort, { static: true }) sort: MatSort;


  ngOnInit() {

    this.nameFilter.valueChanges
    .subscribe(
      name => {
        this.filterValues.codGrupal = name;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      })
    


    this.slideBar = false;
    this.username = this.userService.getUserLoggedIn();
    this.formulario.get('username').setValue(this.username);
    console.log(this.username);
    this.ocultarSlide = true;
    this.ocultarTabla2 = true;
    this.ocultarBotonAgregarTalle = true;
    this.ocultarBotonAgregarProducto = true;
    this.getSucursales();
     
  }

  tableFilter(): (data: any, filter: string) => boolean {
    console.log("hola");
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.codGrupal.toLowerCase().indexOf(searchTerms.codGrupal) !== -1
    }
    return filterFunction;
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
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  nuevoProducto() {
    console.log(this.dni);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AltaTalleProductoComponent, {
      width: '600px',
      height: '570px',
      data: { sucursal: this.SucursalSeleccionada }
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.onChangeSucursal(this.SucursalSeleccionada);
      }
    });

  }

  nuevoProductoSucursal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AltaProductoComponent, {
      width: '750px',
      height: '600px',
      data: { sucursal: this.SucursalSeleccionada }
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.onChangeSucursal(this.SucursalSeleccionada);
      }
    });
  }



  verUltModif(element: Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(VerUltimaActualizacionComponent, {
      width: '600px',
      height: '470px',
      data: { dialogTitle: element, sucursal: this.SucursalSeleccionada }
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.onChangeSucursal(this.SucursalSeleccionada);
      }
    });
  }


  editarStock(element: Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(ActualizarstockComponent, {
      width: '550px',
      height: '400px',
      data: { dialogTitle: element, sucursal: this.SucursalSeleccionada }
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.onChangeSucursal(this.SucursalSeleccionada);
      }
    });
  }



  editarProducto(element: Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditarPrecioVentaComponent, {
      width: '650px',
      height: '300px',
      data: { dialogTitle: element, sucursal: this.SucursalSeleccionada }
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) {
        this.onChangeSucursal(this.SucursalSeleccionada);
      }
    });
  }


  getSucursales() {
    this._stockservice.getSucursales().subscribe(
      res => {
        this.sucursales = res.datos;
      }
    )
  }

  onChangeSucursal(sucursal) {


    this.dataSource = null;
    this.dataSource2 = null;


    this.slideBar = false;
    this.ocultarTabla1 = false;
    this.ocultarTabla2 = true;
    this.ocultarBotonAgregarTalle = true;
    this.ocultarBotonAgregarProducto = true;



    for (let i = 0; i < this.sucursales.length; i++) {
      if (this.sucursales[i].idLocal == sucursal.idLocal) {
        this.SucursalSeleccionada = this.sucursales[i];
      }
    }




    this._stockservice.getStockSucursal(sucursal.idLocal).subscribe(
      res => {
        if (res.datos != null) {
          this.sortJSON(res.datos, 'codGrupal', 'asc');// ordena ascendente el json 
          this.dataSource = new MatTableDataSource<Owner>();
          this.dataSource.data = res.datos as Owner[];

          this.nameFilter.valueChanges
          .subscribe(
            codGrupal => {
              this.filterValues.codGrupal = codGrupal;
              this.dataSource.filter = JSON.stringify(this.filterValues);
            }
          )
      

         this.dataSourceCodGrupal = new MatTableDataSource<OwnerGrupal>();

          let codigosGrupales = new Array();
          for (let i = 0; i < res.datos.length; i++) {
            codigosGrupales[i] = res.datos[i].codGrupal;
            
                  var resultado = codigosGrupales.map(function(elemento){
                    return {codGrupal: elemento};
                  });
          }

          this.dataSourceCodGrupal.data = resultado as OwnerGrupal[];



          this._stockservice.getStockGeneralSucursal(sucursal.idLocal).subscribe(
            res => {
              if (res.resultado == 1) {
                this.sortJSON(res.datos, 'codGrupal', 'asc'); // ordena ascendente el json 
                this.dataSource2 = new MatTableDataSource<Owner2>();
                this.dataSource2.data = res.datos as Owner2[];


                for (let i = 0; i < res.datos.length; i++) {
                  this.dataSource2.data[i].imagen = this.URLIMAGEN + res.datos[i].imagen;                  
                }

                
                console.log("DATA1: " + this.dataSourceCodGrupal.data);
                console.log("DATA2: " + this.dataSource2.data);

                this.ocultarBotonAgregarTalle = false;
                this.ocultarSlide = false;
                this.ocultarBotonAgregarProducto = true;
              }
            })
        } else {
          alert("No hay productos cargados en esta sucursal");
          this.ocultarBotonAgregarTalle = true;
          this.ocultarTabla1 = false;
          this.ocultarSlide = true;
          this.ocultarBotonAgregarProducto = false;

        }
      }
    )
  }



  public slideBarEvent(event: any) {
    if (event.checked) {
      this.ocultarTabla1 = true;
      this.ocultarTabla2 = false;

      this.ocultarBotonAgregarTalle = true;
      this.ocultarBotonAgregarProducto = false;
    } else {
      this.ocultarTabla1 = false;
      this.ocultarTabla2 = true;

      this.ocultarBotonAgregarTalle = false;
      this.ocultarBotonAgregarProducto = true;
    }

  }


  applyFilterCodGrupal(filterValue: string) {

    this.dataSource.filterPredicate =
    (data: Owner, filter: string) => !filter || data.codProducto == filter;


      this.dataSourceCodGrupal.filter = filterValue.trim().toLowerCase();
  }

  applyFilter(filterValue: string) {
    if (this.ocultarTabla2) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    } else {
      this.dataSource2.filter = filterValue.trim().toLowerCase();
    }
  }


}
