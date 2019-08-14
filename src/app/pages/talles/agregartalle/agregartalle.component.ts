import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';


export interface aMandar{
  nombreTalle: String;
}

@Component({
  selector: 'app-agregartalle',
  templateUrl: './agregartalle.component.html',
  styleUrls: ['./agregartalle.component.css']
})
export class AgregartalleComponent implements OnInit {

  formulario: any;
  marca: any;
  aMandar: aMandar;

  constructor(private stockService: StockService, private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<AgregartalleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      nombreTalle: [, Validators.required]
    });
  }

  ngOnInit() {

  }

  cancelar() {
    this.dialogRef.close();
  }

  mayusculas(string) {
    return string.trim().slice(0).toUpperCase();
  }

  onSubmit(formulario) {

    if (formulario.status == "VALID") {
      let nombre = this.mayusculas(formulario.get('nombreTalle').value);
 
      this.aMandar = {
        nombreTalle: nombre
      }
      console.log(this.aMandar);


      this.stockService.insertarTalle(this.aMandar).subscribe(result => {

        if (result.estado == 1) {
          alert("Talle cargado");
          this.dialogRef.close(true);
        }



      }, error => {

        console.log(<any>error);
      })




    }


  }

}
