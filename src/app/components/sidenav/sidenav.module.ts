import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';



@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule, MatSidenavModule,RouterModule,MatListModule, MatIconModule,
    MatCardModule
  ]
})
export class SidenavModule { }
