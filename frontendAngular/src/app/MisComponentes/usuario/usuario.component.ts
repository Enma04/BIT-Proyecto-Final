import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';
import { MensajesComponent } from '../mensajes/mensajes.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {



  //--------------------------------------------------------------------------------------------------
  //Declaracion de variables con un valor inicial
  //--------------------------------------------------------------------------------------------------
  DatosUsuario: any[] = [];

  cedula: string = "";
  nombre: string = "";
  apellido: string = "";
  email: string = "";
  edad!: number;      //Se establece como propiedad definitiva
  direccion: string = "";
  telefono: string = "";
  estadocivil: string = "";
  password: string = "";
  password_check: string = "";


  //--------------------------------------------------------------------------------------------------
  //Constructor de la clase que recibe un servicio de peticiones
  //--------------------------------------------------------------------------------------------------
  constructor(private PeticionDeLlegada: PeticionService, private dir: Router, public msj: MensajesService) { }



  //--------------------------------------------------------------------------------------------------
  //Inicializador de la clase que actualiza los datos al valor actual del usuario
  //--------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.listarDatos();
  }
  



  //--------------------------------------------------------------------------------------------------
  //Funciones de la clase
  //--------------------------------------------------------------------------------------------------
  //Funcion para listar la información del usuario
  listarDatos() {
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/ListarUsuario",
      payload:{}
    }

    //Petición de tipo Post
    this.PeticionDeLlegada.Post(post.host + post.path, post.payload).then(
      (respuesta: any) => {

        console.log(respuesta);

        this.DatosUsuario = respuesta.data;

        this.nombre = respuesta.data[0].nombre;
        this.apellido = respuesta.data[0].apellido;
        this.cedula = respuesta.data[0].cedula;
        this.telefono = respuesta.data[0].telefono;
        this.direccion = respuesta.data[0].direccion;
        this.edad = respuesta.data[0].edad;
        //console.log(this.DatosUsuario);

      })
    

  }//Fin de la función listarDatos


  //Función para actualizar los datos
  ActualizarUsuario() {
    
    let post = {
      host: this.PeticionDeLlegada.url_local,
      path: "/Cliente/Modificar",
      payload: {
        cedula      : this.cedula,
        name        : this.nombre,
        apellido    : this.apellido,
        edad        : this.edad,
        direccion   : this.direccion,
        telefono    : this.telefono,
        estadocivil : this.estadocivil,
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

  }// Fin de la función ActualizarUsuario()



} //Fin de la clase
