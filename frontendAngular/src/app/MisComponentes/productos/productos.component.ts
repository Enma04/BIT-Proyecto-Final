import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  carrito_id: any;
  producto_id: any;
  DatosCarrito: any[] = [];





//--------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------

  constructor(private PeticionDeLlegada: PeticionService, public mensaje:MensajesService) { }






//--------------------------------------------------------------------
//INICIALIZADOR DE LA CLASE
//--------------------------------------------------------------------
ngOnInit(): void {
  this.ListarCarrito();
  //DatosCarrito[0].
}






//--------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Funcion para conectarse al Backend y listar lso usuarios
  ListarCarrito() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Carrito/ListarMiCarrito",
      payload:{}
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta);
        this.DatosCarrito = respuesta.data;
      })

  } //Fin de la función: ListarServicios()


} //Fin de la clase
