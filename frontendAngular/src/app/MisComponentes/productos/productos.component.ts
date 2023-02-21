import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  constructor(public mensaje:MensajesService) {
    
  }
}
