import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

export interface Login {
  userName: string;
  nombre:string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isLoggedIn$: Observable<boolean> ;
  Manda: Login;
  constructor(private authService: AuthService,private userService: UserService) { }


  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.Manda = this.userService.getUserLoggedIn();

    if (this.Manda.userName != "" && this.Manda.userName != null) {
      this.authService.login(this.Manda);
 
    }else{
      this.authService.logout();
    }


  }

}
