import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { InsertarCategoriaComponent } from '../insertar-categoria/insertar-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  displayedColumns = ['id', 'nombreMarca', 'actions'];
  dataSource: any;
  formulario: any;

  constructor(private dialog: MatDialog, private frmBuilder: FormBuilder, private stockService: StockService) {

    this.formulario = this.frmBuilder.group({
      idMarca: [0, Validators.required],
      nombreMarca: [0, Validators.required]
    });
  }


  ngOnInit() {

    this.getCategorias();
  }


  getCategorias() {
    this.stockService.getCategorias().subscribe(
      res => {
        this.dataSource = res.datos;
      },
      err => {
        console.log(err);
      }
    )
  }



  agregarMarca() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(InsertarCategoriaComponent, {
      width: '550px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { 
        this.getCategorias();
      } 
    });
  
  }

  editarProducto(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '550px',
      height: '300px',
      data: { dialogTitle: element }
    });

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { // user clicked ok
        console.log("OK") // close original dialog
        this.getCategorias();
      } else {
        console.log("NO OK ");
      }
    });
  }


}

