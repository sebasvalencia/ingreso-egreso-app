import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';

import { User } from './user.model';

// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) { }

  // Escucha cuando cambie el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe(firebaseUser => {
      console.log('firebaseUser', firebaseUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    // El usuario se loguea automaticamente
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(respuesta => {
        console.log(respuesta);

        const user: User = {
          uid: respuesta.user.uid,
          nombre,
          email: respuesta.user.email
        };

        // creamos colection/documento de datos de usuario
        this.afDB.doc(`${ user.uid }/usuario`)
          .set( user )
          .then( () => {
            this.router.navigate(['/']);
          });

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

  estaLogueado() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (fbUser == null) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        })
      );
  }


}
