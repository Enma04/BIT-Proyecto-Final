import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './MisComponentes/home/home.component';
import { ProductosComponent } from './MisComponentes/productos/productos.component';
import { Page404Component } from './MisComponentes/page404/page404.component';
import { LoginComponent } from './MisComponentes/login/login.component';
import { RegistroComponent } from './MisComponentes/registro/registro.component';
import { DashboardComponent } from './MisComponentes/dashboard/dashboard.component';
import { UsuarioComponent } from './MisComponentes/usuario/usuario.component';
import { PortafolioComponent } from './MisComponentes/portafolio/portafolio.component';
import { NosotrosComponent } from './MisComponentes/nosotros/nosotros.component';


//Se crea una constante de tipo Routes que es una clase que se crea desde
//una importación de Angular @angular/router
const routes: Routes = [
  //Agregamos 2 palabras clave para ir a la ruta del Home
  //El pathMatch: 'full', se utiliza para que la sintaxis sea
  //exactamente igual, de lo contrario puede enviar a otros lugares
  { path: '', component: HomeComponent, pathMatch:'full' }, //Por defecto tomará el Home (no hay parámetros)
  { path: 'Home', component: HomeComponent, pathMatch:'full' },
  { path: 'casa', component: HomeComponent },
  { path: 'Productos', component: ProductosComponent, pathMatch: 'full' },
  { path: 'Login', component: LoginComponent, pathMatch: 'full' },
  { path: 'Registro', component: RegistroComponent, pathMatch: 'full' },
  { path: 'Dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'Usuario', component: UsuarioComponent, pathMatch: 'full' },
  { path: 'Portafolio', component: PortafolioComponent, pathMatch: 'full' },
  { path: 'Nosotros', component: NosotrosComponent, pathMatch: 'full' },
  { path:'**', component: Page404Component, pathMatch: 'full' },  //Envía a esta página si no se especifica bien la ruta
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule,],
})
export class AppRoutingModule { }
