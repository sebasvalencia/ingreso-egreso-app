import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import Swal from 'sweetalert2';

import { map } from 'rxjs/operators';

import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as fromUI from '../shared/ui.actions';
import { SetUserAction, UnsetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

// import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  private usuario: User;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) { }

  // Escucha cuando cambie el estado del usuario
  initAuthListener() {
    this.afAuth.authState.subscribe(firebaseUser => {
      console.log('firebaseUser', firebaseUser);
      if (firebaseUser) {
        this.userSubscription =
          this.afDB
            .doc(`${firebaseUser.uid}/usuario`)
            .valueChanges()
            .subscribe((usuarioObjDB: any) => {
              console.log('usuarioObjDB:', usuarioObjDB);

              const newUser = new User(usuarioObjDB);
              console.log(newUser);
              this.usuario = newUser;
              this.store.dispatch(new SetUserAction(newUser));
            });
      } else {
        this.usuario = null;
        this.userSubscription.unsubscribe();
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    // dispatch el loading
    const accion = new fromUI.ActivarLoadingAction();
    this.store.dispatch(accion);

    // El usuario se loguea automaticamente
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(respuesta => {
        // console.log(respuesta);

        const user: User = {
          uid: respuesta.user.uid,
          nombre,
          email: respuesta.user.email
        };

        // creamos colection/documento de datos de usuario
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigate(['/']);
            this.store.dispatch(new fromUI.DesactivarLoadingAction());
          });

        this.router.navigate(['/']); // navega al dashboard
      }).catch(error => {
        console.error(error);
        this.store.dispatch(new fromUI.DesactivarLoadingAction());
        Swal.fire('Error en login', error.message, 'error');
      });

  }

  login(email: string, password: string) {

    this.store.dispatch(new fromUI.ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password).
      then(respuestaLogin => {
        // console.log(respuestaLogin);
        this.router.navigate(['/']); // navega al dashboard
        this.store.dispatch(new fromUI.DesactivarLoadingAction());
      }).catch(error => {
        console.error(error);
        this.store.dispatch(new fromUI.DesactivarLoadingAction());
        Swal.fire('Error en login', error.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();

    this.store.dispatch(new UnsetUserAction());
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

  // El obj de usuario siempre se pasa por referencia, auqnque sea propiedad privada, extraemos todo lo del usaurio y mandamos las propiedades
  getUsuario() {
    return { ...this.usuario };
  }


}
