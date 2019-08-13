import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';

export interface aMandar{
  nombreCategoria: String;
}



@Component({
  selector: 'app-insertar-categoria',
  templateUrl: './insertar-categoria.component.html',
  styleUrls: ['./insertar-categoria.component.css']
})
export class InsertarCategoriaComponent implements OnInit {

  formulario:any;
  categoria:any;
  aMandar:aMandar;

  constructor(private stockService: StockService,private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<InsertarCategoriaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      nombreCategoria: [, Validators.required]
    });
   }

  ngOnInit() {

  }

  cancelar() {
    this.dialogRef.close();
  }

  onSubmit(formulario){

      if(formulario.status == "VALID"){

        this.aMandar = {
          nombreCategoria: formulario.get('nombreCategoria').value
        }
        console.log(this.aMandar);

        
      this.stockService.insertarCategoria(this.aMandar).subscribe(result => {

      if(result.estado == 1){
        alert("Categoria cargada");
        this.dialogRef.close(true);
      }
    
      }, error => {
        
        console.log(<any>error);
      })
  
   


      }


  }

}
