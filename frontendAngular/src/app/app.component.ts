import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontendAngular';

  variable1: string = "Pasando valor al html";
  nombre: string = "John";
}
