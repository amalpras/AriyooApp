import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../navbar/navbar.component';

@NgModule({
  declarations: [HomeComponent,NavbarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
