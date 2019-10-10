import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  crearUsuario(nombre: string, email: string, password: string) {

    // El usuario se loguea automaticamente
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(respuesta => {
        console.log(respuesta);
        this.router.navigate(['/']); // navega al dashboard
      }).catch(error => {
        console.error(error);
      });

  }


}
