import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, AnimationDurations } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StockService } from 'src/app/services/stock.service';

export interface Categoria{
  idCategoria: number;
  nombreCategoria: String;
}
export interface aMandar{
  idCategoria: number;
  nombreCategoria: String;
}


@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {
  formulario:any;
  categoria:any;
  aMandar:aMandar;
  
  @Output() submitClicked = new EventEmitter<any>();

  constructor(private stockService: StockService,private frmBuilder: FormBuilder, public dialogRef: MatDialogRef<EditarCategoriaComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.formulario = this.frmBuilder.group({
      idCategoria: [, Validators.required],
      nombreCategoria: [, Validators.required]
    });
   }

  ngOnInit() {
    this.categoria = this.data.dialogTitle;
    this.formulario.get('idCategoria').value = this.categoria.idCategoria;    
    this.formulario.get('nombreCategoria').setValue(this.categoria.nombreCategoria);

  }

  cancelar() {
    this.dialogRef.close();
  }
  capitalize(string) {
    return string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase(); 
  }
  

  onSubmit(formulario){

      if(formulario.status == "VALID"){

        let nombre = this.capitalize(formulario.get('nombreCategoria').value);
        this.aMandar = {
          idCategoria: this.categoria.idCategoria,
          nombreCategoria: nombre
        }
        
      this.stockService.actualizarCategoria(this.aMandar).subscribe(result => {

      if(result.estado == 1){
        alert("Categoria Actualizada");
        this.dialogRef.close(true);
      }
    


      }, error => {
        
        console.log(<any>error);
      })
  
   


      }


  }

}
