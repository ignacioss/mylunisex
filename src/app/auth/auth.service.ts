import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  login(user: User) {
    if (user.userName !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/dashboard']);
    }
  } 

  logout() { 
    console.log("llega a deslog");
    let u: User = { userName: "", nombre: "" };
    this.userService.setUserLoggedIn(u);
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}