import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.model';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';


export interface aMandar {
  id: string;
  Password: string;
}

export interface Login {
  userName: string;
  nombre:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;


  id: string;
  Password: string;
  userName: string = null;
  nombre:string=null;

  Manda: Login;
  aMandar: aMandar;
  constructor(private authService: AuthService, private router: Router, private stockService: StockService, private userService: UserService
    , private appComponent: AppComponent) {


  }

  ngOnInit() {
    this.isLoggedIn$ == this.authService.isLoggedIn;
    this.Manda = this.userService.getUserLoggedIn();
    console.log(this.Manda.userName);
    console.log(this.Manda.nombre);

   /* this.Manda = {
      userName: ""
    }
    this.authService.login(this.Manda);
    let u: User = { userName: null };
    this.userService.setUserLoggedIn(u);
    this.authService.logout();
    console.log(this.authService.isLoggedIn);*/
    console.log( "lenght ",  this.Manda.userName.length);

 if (this.Manda.userName != "" && this.Manda.userName != null) {

      this.Manda = {
        userName: this.userName,
        nombre: this.nombre
      }
      this.authService.login(this.Manda);  
      this.router.navigate(['/dashboard']);
   
    }

  }

  public login(event: Event) {
    if (this.Password.length > 0 && this.id.length > 0) {


      event.preventDefault(); // Avoid default action for the submit button of the login form

      // Calls service to login user to the api rest
      this.aMandar = {
        id: this.id,
        Password: this.Password
      }


      this.stockService.login(this.aMandar).subscribe(

        res => {
          if (res.resultado > 0) {

            if(res.datos.TipoUsuario == 1){

            
      
            console.log(res.datos);
            this.Manda = {
              userName: this.id,
              nombre: res.datos.nombre
            }

            this.userService.setUserLoggedIn(this.Manda);
            this.Manda = this.userService.getUserLoggedIn();

            this.authService.login(this.Manda);
            
    this.appComponent.ngOnInit();
            //  this.navigate();

          }
          else if(res.datos.TipoUsuario >1){
            alert(res.datos.nombre + ", no tiene permisos para acceder a este sitio.");
          }else{
            alert("Datos incorrectos");
          }
          }

        },
        error => {
          console.error(error);

        }
      );
    } else {
      alert("Debe completar correctamente los campos");
    }

  }


  navigate() {
    this.router.navigateByUrl('dashboard');

  }


}