import { Component } from '@angular/core';

declare var $: any;


@Component({
  selector: 'app-read-servicios',
  templateUrl: './read-servicios.component.html',
  styleUrls: ['./read-servicios.component.css']
})
export class ReadServiciosComponent {

//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  codigo!: number;
  nombre: string = "";
  precio!: number;

  check: boolean = false;
  DatosPrpductos: any[] = [];



//--------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Función para validar la aceptación de los términos y condiciones
  Terminos() {
    this.check = !this.check;
  } //Fin Función Terminos()

  //Función qque caga la ventana modal
  CargarModal() {
    $('#exampleModalCenter').modal('show');
  }

}
