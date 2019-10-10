import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(dataFormulario: any) {
    console.log(dataFormulario);
    this.authService.crearUsuario(dataFormulario.nombre, dataFormulario.email, dataFormulario.password);
  }

}
