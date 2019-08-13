import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { StockService } from 'src/app/services/stock.service';
import { EditarProductoGeneralComponent } from '../editar-producto-general/editar-producto-general.component';
import { MatTableDataSource } from '@angular/material/table';

export interface Producto {
  codGrupal: number,
  nombre: string,
  idCategoria: number;
  idMarca: number;
  imagen: string;
  nombreMarca: string;
  nombreCategoria: string;
}

export interface Owner {
  codProducto: number;
  nombre: string;
  nombreMarca: string;
  nombreCategoria: string;
  nombreTalle: string;
  precioVenta: number;
  cantidad: number;

}


@Component({
  selector: 'app-listar-todos-productos',
  templateUrl: './listar-todos-productos.component.html',
  styleUrls: ['./listar-todos-productos.component.css']
})

export class ListarTodosProductosComponent implements OnInit {

  constructor(private dialog: MatDialog, private _stockservice: StockService) { }


  displayedColumns = ['position', 'name', 'marca', 'categoria', 'imagen', 'actions'];
  public dataSource;
  URLIMAGEN: String = "https://holanosoynada222.000webhostapp.com/Zapat/Productos/ImagenesProductos/";

  ngOnInit() {

    this.ObtenerProductos();
  }



  ObtenerProductos() {

    this._stockservice.getTodosLosProductos().subscribe(
      res => {
        if (res.resultado == 1) {
          console.log(res);
          this.sortJSON(res.datos, 'nombre', 'asc'); // ordena ascendente el json 
          this.dataSource = new MatTableDataSource<Producto>();
          this.dataSource.data = res.datos as Producto[];
          for (let i = 0; i < res.datos.length; i++) {
            this.dataSource.data[i].imagen = this.URLIMAGEN + res.datos[i].imagen;
          }
          //this.ocultarBotonAgregarTalle = false;
          //  this.ocultarSlide = false;
        }else{
          alert("No hay ningun producto cargado.");
        }
      })
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


  
  editarProducto(element: Producto) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditarProductoGeneralComponent, {
      width: '700px',
      height: '600px',
      data: { dialogTitle: element}
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { 
        this.ObtenerProductos();
      } 
    });
  }


  applyFilter(filterValue: string) {
   this.dataSource.filter = filterValue.trim().toLowerCase();
  
  }


}
