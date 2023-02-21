import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
  
  
  
  
//-------------------------------------------------------------------------------
//CLASE: MenuLateralComponent
//-------------------------------------------------------------------------------
export class MenuLateralComponent {


//-------------------------------------------------------------------------------
//VARIABLES DE LA CLASE
//-------------------------------------------------------------------------------
  datosMenu = [
    { nombre: 'Datos Usuario', destino: '/Usuario' },
    { nombre: 'Dashboard', destino: '/Dashboard' },
    {nombre:'Productos',destino:'/Productos'},
  ]



//-------------------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//-------------------------------------------------------------------------------
  
  constructor(private dir:Router) {
    
  }
  


//-------------------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//-------------------------------------------------------------------------------

  CerrarSesion() {
    this.dir.navigate(['/']);
  }

}
