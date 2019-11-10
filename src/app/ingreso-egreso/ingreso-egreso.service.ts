import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription: Subscription = new Subscription();

  constructor(private afDB: AngularFirestore, public authService: AuthService, private store: Store<AppState>) { }

  // Grabamos a Firebase y creamos una nueva collection
  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {

    const user = this.authService.getUsuario();

    return this.afDB
      .doc(`${user.uid}/ingresos-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  borrarIngresoEgreso(uid: string) {
    const user = this.authService.getUsuario();

    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${uid}`)
            .delete();
  }

  // Esucha cualquier cambio de la collection
  initIngresoEgresoListener() {

    // get uid
    this.ingresoEgresoListenerSubcription = this.store.select('auth').pipe(
      // transformar en algo diferente, filtra por una condicion, solo llega al subscribe si se cumple la condicion
      filter(auth => auth.user != null)
    ).subscribe(auth => {
      this.ingresoEgresoItems(auth.user.uid);
    });

  }

  // Obtenemos la info de los items de  firebase y el uid de los items para formar un objecto
  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
              // monto: doc.payload.doc.data().monto
            };
          });
        })
      )
      .subscribe((coleccion: any) => { // IngresoEgresoModel[]
        console.log(coleccion);
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }

  cancelarSubscriptions() {
    this.ingresoEgresoListenerSubcription.unsubscribe();
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }

}
