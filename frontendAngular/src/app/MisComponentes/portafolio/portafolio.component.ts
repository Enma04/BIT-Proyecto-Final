import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {

//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  codigo!: number;
  nombre: string = "";
  precio!: number;
  usuario_id: any;
  producto_id: any;

  DatosPrpductos: any[] = [];

//--------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------
  constructor(private PeticionDeLlegada:PeticionService, public msj: MensajesService ){}


//--------------------------------------------------------------------
//INICIALIZADOR DE LA CLASE
//--------------------------------------------------------------------
ngOnInit(): void {
  this.ListarProductos();
  this.MostrarCookies();
  console.log(this.DatosPrpductos);
}




//--------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Funcion para conectarse al Backend y listar lso servicios
  ListarProductos() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Servicio/ListarProductos",
      payload:{}
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta);
        this.DatosPrpductos = respuesta.data;
      })

  } //Fin de la función: ListarUsuarios()

  //Función para ver las Cookies y almacenar el id del producto
  MostrarCookies() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/MostrarCookies",
      payload: {
      }
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta);
        console.log(respuesta.clave._id);
        this.usuario_id = respuesta.clave._id;
      })

  } //Fin función: MostrarCookies()

  //Función para añadir artículos al carrito
  AdicionarAlCarrito(){
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Carrito/AdicionarAlCarrito",
      payload:{
        producto_id  :this.producto_id,
      }
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        
        console.log(respuesta);

        if (respuesta.state == false) {
          //Cargamos el mensaje de peligro, si falta un campo
          this.msj.Cargar("danger", respuesta.mensaje, 4000);
        }
        else {
          //Cargamos el mensaje exitoso
          this.msj.Cargar("success", respuesta.mensaje, 4000);
        }

        
      })
  } //Fin de la función para añadir al carrito
  

  //Funciones para añadir productos al carrito
  elemento1(){ 
    this.producto_id = this.DatosPrpductos[0]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }
  elemento2(){ 
    this.producto_id = this.DatosPrpductos[1]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }
  elemento3(){ 
    this.producto_id = this.DatosPrpductos[2]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }
  elemento4(){ 
    this.producto_id = this.DatosPrpductos[3]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }
  elemento5(){ 
    this.producto_id = this.DatosPrpductos[4]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }
  elemento6(){ 
    this.producto_id = this.DatosPrpductos[5]._id;
    console.log("producto_id = " + this.producto_id);
    this.AdicionarAlCarrito();
  }


} //Fin de la clase
