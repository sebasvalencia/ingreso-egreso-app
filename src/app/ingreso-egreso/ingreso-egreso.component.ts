import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { IngresoEgresoAppState } from './ingreso-egreso.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {


  forma: FormGroup;
  tipo = 'ingreso';
  loadingSubscription: Subscription = new Subscription();
  cargando: boolean;

  constructor(private store: Store<IngresoEgresoAppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(ui => {
      this.cargando = ui.isLoading;
    });

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

  crearIngresoEgreso() {
    console.log(this.forma.value);
    console.log(this.tipo);

    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo }); // mando pares de valores

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {

      this.forma.reset({
        monto: 0
      });

      this.store.dispatch( new DesactivarLoadingAction());

      Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
    });

    console.log(ingresoEgreso);
  }

}
