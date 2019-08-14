import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';

export interface Marca{
  idTalle: number;
  nombreTalle: String;
}
export interface aMandar{
  idTalle: number;
  nombreTalle: String;
}


@Component({
  selector: 'app-editartalle',
  templateUrl: './editartalle.component.html',
  styleUrls: ['./editartalle.component.css']
})
export class EditartalleComponent implements OnInit {
  formulario:any;
  marca:any;
  aMandar:aMandar;
  
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private stockService: StockService,private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<EditartalleComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      idTalle: [, Validators.required],
      nombreTalle: [, Validators.required]
    });
   }

  ngOnInit() {
    this.marca = this.data.dialogTitle;
    this.formulario.get('idTalle').value = this.marca.idTalle;    
    this.formulario.get('nombreTalle').setValue(this.marca.nombreTalle);

  }

  cancelar() {
    this.dialogRef.close();
  }

  mayusculas(string) {
    return string.trim().slice(0).toUpperCase();
  }

  onSubmit(formulario){

      if(formulario.status == "VALID"){
        let nombre = this.mayusculas(formulario.get('nombreTalle').value);

        this.aMandar = {
          idTalle: this.marca.idTalle,
          nombreTalle: nombre
        }
        console.log(this.aMandar);

        
      this.stockService.actualizarTalle(this.aMandar).subscribe(result => {

      if(result.estado == 1){
        alert("Talle Actualizado");
        this.dialogRef.close(true);
      }
    


      }, error => {
        
        console.log(<any>error);
      })
  
   


      }


  }

}
