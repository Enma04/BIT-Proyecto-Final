import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {

//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  check: boolean = false;
  

//--------------------------------------------------------------------
//OnInit() DE LA CLASE
//--------------------------------------------------------------------

  ngOnInit(){}

//--------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Función para validar la aceptación de los términos y condiciones
  Terminos() {
    this.check = !this.check;
  } //Fin Función Terminos()



}
