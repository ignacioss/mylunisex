
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../app/user/user.service';

export interface Login {
  userName: string;
  nombre:string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `]
})
export class AppComponent implements OnInit  {
 
  isLoggedIn$: Observable<boolean> ;
  Manda: Login;
  nombre:string;

  constructor(private authService: AuthService,private userService: UserService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    
    this.Manda = this.userService.getUserLoggedIn();
    
    this.nombre = this.Manda.nombre;
    
    this.nombre = this.capitalize (this.nombre);
    console.log("este de abajo");
    console.log(this.Manda);

        
    if (this.Manda.userName != "" && this.Manda.userName != null) {

      this.authService.login(this.Manda);
 
    }else{
      this.authService.logout();
    }

  }

  onLogout() {
    console.log("llega a deslog");
    this.authService.logout();
  }
  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

}
