import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

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
//CONSTRUCTOR DE LA CLASE
//--------------------------------------------------------------------
  constructor(private PeticionDeLlegada: PeticionService, private dir: Router, public msj: MensajesService ){}




  

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

  //VALIDAR DATOS FRONTEND
  ValidacionDatosFront():boolean {


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
    if (this.ValidacionDatosFront()) {
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

            //this.ListarUsuarios();
            //this.dir.navigate(["/Login"]); //Enviamos al usuario al Login
          }
        })
    }
  } //Fin Función Registrar()
  
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

}
