import { Component, OnInit } from '@angular/core';  //Se importa el OnInit
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { Persona } from 'src/app/interfaces/persona';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
  
  
  
  //--------------------------------------------------------------------
  //CLASE: RegistroComponent
  //--------------------------------------------------------------------
export class RegistroComponent implements OnInit {


  //--------------------------------------------------------------------
  //VARIABLES DE LA CLASE
  //--------------------------------------------------------------------

  cedula: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  edad: number = 0;
  direccion: string = "";
  telefono: string = "";
  estadocivil: string = "";
  password: string = "";

  mostrar: boolean = true;
  mostrar_tabla: boolean = false;
  ListaDatos: any[] = [];

  //VARIABLES DE TIPO OBJETO
  persona1: Persona = {
    nombre: "Enmanuel",
    apellido: "Berruecos",
    edad: 25,
    habilidades: ["programar", "Streamer", 1],
  }




  /*
    ORDEN DE CARGA DE ELEMENTOS EN UNA CLASE:
      1.) constructor()              --> Espacio donde carga los elementos necesarios
      2.) ngOnChanges()              --> Esta constantemente cargando los cambios
      3.) ngOnInit()                 --> Se encarga de hacerlas peticiones para cargar los elementos en el html
      4.) ngOnCheck()                --> 
            -ngAfterContentInit      -->
            -ngAfterContentChecked   -->
            -ngAfterViewInit         --> Después de que se cargue la vista
            -ngAfterViewChecked      -->
      5.) ngOnDestroy                --> Cuando cambia de una vista a otra
  */


  //Es el tercer elemento que se carga, luego del constructor
  //y el ngOnChanges. (lo pusimos aqui para ver el nivel de carga)
  ngOnInit(): void {
    console.log("Cargando el OnInit");
    this.ListarUsuarios();
  }


  


  //--------------------------------------------------------------------
  //CONSTRUCTOR DE LA CLASE
  //--------------------------------------------------------------------

  /*
  El constructor es lo primero que se carga en Angular.

  Definimos una variable msj de tipo MensajeService
  para podeer hacer uso de este servicio, sus variables
  y métodos; msj debe ser público para usar la variable
  en el html, de lo contrario, es mejor manejarla privada
  para uso local (solamente en el TypeScript).

  Las variables de tipo "MensajeService" y "PeticionService", sirven para
  indicarle al constructor que se van a usar estos servicios
  */

  constructor(public msj:MensajesService, private PeticionDeLlegada:PeticionService, private dir:Router){ 
    console.log("Yo tengo más poder");
  }





  //--------------------------------------------------------------------
  // FUNCIONES DE LA CLASE RegistroComponent
  //--------------------------------------------------------------------



    //Mostrar u Ocultar el registro
  MostrarOcultar() {
    this.mostrar = !this.mostrar;
  }

  //Mostrar u Ocultar el registro
  MostrarTabla() {
    this.mostrar_tabla = !this.mostrar_tabla;
  }






  //--------------------------------------------------------------------
  //C.R.U.D
  //--------------------------------------------------------------------

  //VALIDAR DATOS FRONTEND
  ValidacionDatosFront():boolean {

    //VALIDACIONES DE LOS DATOS
    //CEDULA
    if (this.cedula == "" || this.cedula == null || this.cedula == undefined || this.cedula == " ") {
        this.msj.Cargar("danger", "El campo Cedula es obligatorio", 4000);
        return false;
    }

    else {
      //PASSWORD
      if (this.password == "" || this.password == null || this.password == undefined || this.password == " ") {
        this.msj.Cargar("danger", "El campo Contraseña es obligatorio", 4000);
        return false;
      }
      else {
        //NOMBRE
        if (this.nombre == "" || this.nombre == null || this.nombre == undefined || this.nombre == " ") {
          this.msj.Cargar("danger", "El campo Nombre es obligatorio", 4000);
          return false;
        }
        else {
          if (this.nombre.length < 4 || this.nombre.length > 20) {
            this.msj.Cargar("danger", "El campo Nombre debe tener entre 4 y 20 caracteres", 4000);
            return false;
          }
          else {
            //APELLIDO
            if (this.apellido == "" || this.apellido == null || this.apellido == undefined || this.apellido == " ") {
              this.msj.Cargar("danger", "El campo Apellido es obligatorio", 4000);
              return false;
            }
            else {
              if (this.apellido.length < 4 || this.apellido.length > 20) {
                this.msj.Cargar("danger", "El campo Apellido debe tener entre 4 y 20 caracteres", 4000);
                return false;
              }
              else {
                return true;
              }
            }
          }
        }
      }
    }

  } //Fin de la función de validación de datos desde el FrontEnd


  //Guardar la información del cliente
  Registrar() {

    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/Guardar",
      payload: {
        cedula      : this.cedula,
        name        : this.nombre,
        apellido    : this.apellido,
        edad        : this.edad,
        direccion   : this.direccion,
        telefono    : this.telefono,
        estadocivil : this.estadocivil,
        email       : this.email,
        password    : this.password,
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
            this.cedula = "";
            this.nombre = "";
            this.apellido = "";
            this.edad = 0;
            this.direccion = "";
            this.telefono = "";
            this.estadocivil = "";
            this.email = "";
            this.password = "";

            this.ListarUsuarios();
            this.dir.navigate(["/Login"]); //Enviamos al usuario al Login
          }
        
      })
    }

  } //Fin Función Registrar()
  


  //Funcion para conectarse al Backend y listar lso usuarios
  ListarUsuarios() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/ListarUsuarios",
      payload:{}
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {
        console.log(respuesta);
        this.ListaDatos = respuesta.data;
      })

  } //Fin de la función: ListarUsuarios()

  

} //FIN DE LA CLASE: RegistrosComponent
