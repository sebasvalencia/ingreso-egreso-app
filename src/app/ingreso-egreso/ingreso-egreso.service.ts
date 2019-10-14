import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {


  constructor(private afDB: AngularFirestore, public authService: AuthService) { }

  // Grabamos a Firebase y creamos una nueva collection
  crearIngresoEgreso(ingresoEgreso: IngresoEgresoModel) {

    const user = this.authService.getUsuario();

    return this.afDB
            .doc(`${user.uid}/ingresos-egresos`)
            .collection('items')
            .add({...ingresoEgreso});
  }

}
