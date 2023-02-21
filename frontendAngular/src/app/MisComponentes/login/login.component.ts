import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
  
  
//--------------------------------------------------------------------
//CLASE: LoginComponen
//--------------------------------------------------------------------
  
export class LoginComponent {




  //--------------------------------------------------------------------
  //VARIABLES DE LA CLASE
  //--------------------------------------------------------------------

  cedula       : string = "";
  nombre       : string = "";
  apellido     : string = "";
  email        : string = "";
  edad         : number = 0;
  direccion    : string = "";
  telefono     : string = "";
  estadocivil  : string = "";
  password     : string = "";
  pag_activa   : string = "";

  mostrar: boolean = true;
  mostrar_tabla: boolean = false;
  ListaDatos: any[] = [];



  //--------------------------------------------------------------------
  //CONSTRUCTOR DE LA CLASE
  //--------------------------------------------------------------------
  constructor(private dir: Router) {
    this.pag_activa = "active";
  }


    //--------------------------------------------------------------------
  //VARIABLES DE LA CLASE
  //--------------------------------------------------------------------

  iniciarSesion() {
    //Navegar cierto punto
    this.dir.navigate(["/Dashboard"]);
  }



} //FIN DE LA CLASE: LoginComponen
