import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//Angula va importando automáticamente los componentes creados con su ruta
import { HomeComponent } from './MisComponentes/home/home.component';
import { ProductosComponent } from './MisComponentes/productos/productos.component';
import { AppRoutingModule } from './app-routing.module';
import { Page404Component } from './MisComponentes/page404/page404.component';
import { MenuComponent } from './MisComponentes/menu/menu.component';
import { LoginComponent } from './MisComponentes/login/login.component';
import { RegistroComponent } from './MisComponentes/registro/registro.component';
import { FormsModule } from '@angular/forms';
import { MensajesComponent } from './MisComponentes/mensajes/mensajes.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { DashboardComponent } from './MisComponentes/dashboard/dashboard.component';
import { MenuLateralComponent } from './MisComponentes/menu-lateral/menu-lateral.component';

//HttpClientModule se encarga de realizar la petición
//HTTP_INTERCEPTORS es una petición antes de que salga la petición real
//para organizar cabeceras, tipos de datos, etc.



@NgModule({
  //Declaraciones de los componentes que se van a usar
  declarations: [
    AppComponent,
    HomeComponent,
    ProductosComponent,
    Page404Component,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    MensajesComponent,
    DashboardComponent,
    MenuLateralComponent
  ],
  imports: [
    HttpClientModule,  //Se importa
    BrowserModule,
    AppRoutingModule,
    //Se importa esta librería "FormsModule" para utilizar el modelo banana in box en html
    // [(ngModel)] = "nombre"
    FormsModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
