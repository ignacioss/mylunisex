import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { EditartalleComponent } from '../editartalle/editartalle.component';
import { AgregartalleComponent } from '../agregartalle/agregartalle.component';



@Component({
  selector: 'app-talles',
  templateUrl: './talles.component.html',
  styleUrls: ['./talles.component.css']
})
export class TallesComponent implements OnInit {

  displayedColumns = ['id', 'nombreTalle', 'actions'];
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

    this.getTalles();
  }


  getTalles() {
    this.stockService.getTalles().subscribe(
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
    const dialogRef = this.dialog.open(AgregartalleComponent, {
      width: '550px',
      height: '300px',
    });
    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { // user clicked ok
        console.log("OK") // close original dialog
        this.getTalles();
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
    const dialogRef = this.dialog.open(EditartalleComponent, {
      width: '550px',
      height: '300px',
      data: { dialogTitle: element }
    });

    dialogRef.afterClosed().subscribe((result?: boolean) => {
      if (result) { // user clicked ok
        console.log("OK") // close original dialog
        this.getTalles();
      } else {
        console.log("NO OK ");
      }
    });
  }


}


