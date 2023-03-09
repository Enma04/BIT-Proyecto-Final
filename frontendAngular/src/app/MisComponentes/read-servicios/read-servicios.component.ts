import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $: any;


@Component({
  selector: 'app-read-servicios',
  templateUrl: './read-servicios.component.html',
  styleUrls: ['./read-servicios.component.css']
})
export class ReadServiciosComponent implements OnInit {



//--------------------------------------------------------------------
//VARIABLES DE LA CLASE
//--------------------------------------------------------------------

  codigo!: number;
  nombre: string = "";
  precio!: number;

  check: boolean = true;
  check2: boolean = true;
  check3: boolean = true;
  actualizar: boolean = false;

  servicio: any[] = [];
  DatosPrpductos: any[] = [];






//--------------------------------------------------------------------
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------
  constructor(private PeticionDeLlegada: PeticionService, private dir: Router, public msj: MensajesService ){}



//--------------------------------------------------------------------
//INICIALIZADOR DE LA CLASE
//--------------------------------------------------------------------
  ngOnInit(): void {
    this.ListarProductos();
  }




  

//--------------------------------------------------------------------
//FUNCIONES DE LA CLASE
//--------------------------------------------------------------------

  //Funciones de los Modales
  //Función para validar la aceptación de los términos y condiciones
  Terminos() {
    this.check = !this.check;
  } //Fin Función Terminos()

  //Función para validar la aceptación de los términos y condiciones
  Terminos2() {
    this.check2 = !this.check2;
  } //Fin Función Terminos()

  //Función para validar la aceptación de los términos y condiciones
  Terminos3() {
    this.check3 = !this.check3;
  } //Fin Función Terminos()

  //Función qque caga la ventana modal
  CargarModal() {
    $('#registroModal').modal('show');
  }

  //Función qque caga la ventana modal
  CargarModal2() {
    $('#eliminarModal').modal('show');
  }

  //Función qque caga la ventana modal
  CargarModal3() {
    $('#actualizarModal').modal('show');
  }


  //Funciones del CRUD

  //Funcion para conectarse al Backend y listar lso usuarios
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

  //VALIDAR DATOS FRONTEND
  ValidacionRegistro():boolean {


    //VALIDACIONES DE LOS DATOS

    //NOMBRE
    if (this.nombre == "" || this.nombre == null || this.nombre == undefined || this.nombre == " ") {
      this.msj.Cargar("danger", "El campo nombre es obligatorio", 4000);
      return false;
    }
    else {
      if (this.nombre.length < 4 || this.nombre.length > 20) {
        this.msj.Cargar("danger", "El campo nombre debe tener entre 4 y 20 caracteres", 4000);
        return false;
      }
      else {
        //APELLIDO
        if (this.codigo == 0 || this.codigo == null || this.codigo == undefined) {
          this.msj.Cargar("danger", "El campo codigo es obligatorio", 4000);
          return false;
        }
        else {
          if (this.codigo < 0 || this.codigo > 9999) {
            this.msj.Cargar("danger", "El campo codigo debe tener entre 4 y 20 caracteres", 4000);
            return false;
          }
          else {
            //CEDULA
            if (this.precio < 0 || this.precio == null || this.precio == undefined) {
              this.msj.Cargar("danger", "El precio no puede ser negativo", 4000);
              return false;
            }
            else {  
                return true;
            } //Fin del quinto else
          } //Fin del cuarto else
        } //Fin del tercer else
      } //Fin del segundo else
    } //Fin del porimer else

  } //Fin de la función de validación de datos desde el FrontEnd

  //Guardar la información del cliente
  RegistrarProducto() {

    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Servicio/GuardarProducto",
      payload: {
        codigo      : this.codigo,
        nombre      : this.nombre,
        precio      : this.precio,
      }
    }


    //VALIDAMOS LA INFORMACIÓN PARA SABER SI SE LE PASA AL BACKEND
    if (this.ValidacionRegistro()) {
      //Petición de tipo Post
      this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
        (respuesta: any) => {

          if (respuesta.state == false) {
            //Cargamos el mensaje de peligro, si falta un campo
            this.msj.Cargar("danger", respuesta.mensaje, 4000);
          }
          else {
            //Cargamos el mensaje exitoso
            this.msj.Cargar("success", respuesta.mensaje, 4000);

            //Lo último que se hace (limpiar datos)
            this.codigo = 0;
            this.nombre = "";
            this.precio = 0;

            this.ListarProductos();
            $('#registrarModal').modal('hide');
          }
        })
    }
  } //Fin Función Registrar()

  EliminarProducto() {

    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Servicio/EliminarProducto",
      payload: {
        codigo      : this.codigo,
      }
    }


  //Petición de tipo Post
  this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
    (respuesta: any) => {

      if (respuesta.state == false) {

        this.msj.Cargar("danger", respuesta.mensaje, 4000);
      }
      else {
        //Cargamos el mensaje exitoso
        this.msj.Cargar("success", respuesta.mensaje, 4000);

        this.codigo = 0;

        this.ListarProductos();
        $('#eliminarModal').modal('hide');
      }
    })
  }

  BuscarProducto(){
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Servicio/ListarServicio",
      payload:{
        codigo: this.codigo,
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

          this.servicio = respuesta.data;
          this.actualizar = true;
        }

      })
  }

  ActualizarServicio(){
    
  }

} //Fin de la clase
