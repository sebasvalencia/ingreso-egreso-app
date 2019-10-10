import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  // Escucha cuando cambie el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe( firebaseUser => {
      console.log('firebaseUser', firebaseUser);
    });
  }

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
