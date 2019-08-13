import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { EditarmarcaComponent } from 'src/app/pages/marcas/editarmarca/editarmarca.component';
import { AgregarmarcaComponent } from '../agregarmarca/agregarmarca.component';


@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  displayedColumns = ['id', 'nombreMarca', 'actions'];
  dataSource: any;
  categorias: any[];
  marcas: any[];
  formulario: any;

  constructor(private dialog: MatDialog, private frmBuilder: FormBuilder, private stockService: StockService) {

    this.formulario = this.frmBuilder.group({
      idMarca: [0, Validators.required],
      nombreMarca: [0, Validators.required]
    });
  }


  ngOnInit() {

    this.getMarcas();
  }


  getMarcas() {
    this.stockService.getMarcas().subscribe(
      res => {
        this.dataSource = res.datos;
      }
    )
  }


  agregarMarca() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(AgregarmarcaComponent, {
      width: '550px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { // user clicked ok
        console.log("OK") // close original dialog
        this.getMarcas();
      } else {
        console.log("NO OK ");
      }
    });
  
  }

  editarProducto(element) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    const dialogRef = this.dialog.open(EditarmarcaComponent, {
      width: '550px',
      height: '300px',
      data: { dialogTitle: element }
    });

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { // user clicked ok
        console.log("OK") // close original dialog
        this.getMarcas();
      } else {
        console.log("NO OK ");
      }
    });
  }


}


