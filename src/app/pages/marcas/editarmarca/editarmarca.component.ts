import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';

export interface Marca{
  idMarca: number;
  nombreMarca: String;
}
export interface aMandar{
  idMarca: number;
  nombreMarca: String;
}



@Component({
  selector: 'app-editarmarca',
  templateUrl: './editarmarca.component.html',
  styleUrls: ['./editarmarca.component.css']
})
export class EditarmarcaComponent implements OnInit {
  formulario:any;
  marca:any;
  aMandar:aMandar;
  
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private stockService: StockService,private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<EditarmarcaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      idMarca: [, Validators.required],
      nombreMarca: [, Validators.required]
    });
   }

  ngOnInit() {
    this.marca = this.data.dialogTitle;
    this.formulario.get('idMarca').value = this.marca.idMarca;    
    this.formulario.get('nombreMarca').setValue(this.marca.nombreMarca);

  }

  cancelar() {
    this.dialogRef.close();
  }

  capitalize(string) {
    return string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase(); 
  }
  
  onSubmit(formulario){

      if(formulario.status == "VALID"){

        
        let nombre = this.capitalize(formulario.get('nombreMarca').value);

        this.aMandar = {
          idMarca: this.marca.idMarca,
          nombreMarca: nombre
        }
        console.log(this.aMandar);

        
      this.stockService.actualizarMarca(this.aMandar).subscribe(result => {

      if(result.estado == 1){
        alert("Marca Actualizada");
        this.dialogRef.close(true);
      }
    


      }, error => {
        
        console.log(<any>error);
      })
  
   


      }


  }

}
