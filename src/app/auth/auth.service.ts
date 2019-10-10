import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        Swal.fire('Error en login', error.message, 'error');
      });

  }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).
      then(respuestaLogin => {
        console.log(respuestaLogin);
        this.router.navigate(['/']); // navega al dashboard
      }).catch(error => {
        console.error(error);
        Swal.fire('Error en login', error.message, 'error');
      });
  }

  logout() {

    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

  }


}
