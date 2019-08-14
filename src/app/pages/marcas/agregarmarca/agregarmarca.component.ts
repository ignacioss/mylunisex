import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';


export interface aMandar{
  nombreMarca: String;
}


@Component({
  selector: 'app-agregarmarca',
  templateUrl: './agregarmarca.component.html',
  styleUrls: ['./agregarmarca.component.css']
})
export class AgregarmarcaComponent implements OnInit {

  formulario:any;
  marca:any;
  aMandar:aMandar;

  constructor(private stockService: StockService,private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<AgregarmarcaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
        nombreMarca: [, Validators.required]
    });
   }

  ngOnInit() {

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
          nombreMarca: nombre
        }
        console.log(this.aMandar);

        
      this.stockService.insertarMarca(this.aMandar).subscribe(result => {

      if(result.estado == 1){
        alert("Marca cargada");
        this.dialogRef.close(true);
      }
    


      }, error => {
        
        console.log(<any>error);
      })
  
   


      }


  }

}
