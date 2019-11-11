
import * as fromIngresoEgreso from './ingreso-egreso.actions';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState {
  items: IngresoEgresoModel[];
}

// Para expandir mi store actual
// Tomamos el AppState y
// extiendo las propiedades osea que le agrego reglas de negocio
export interface IngresoEgresoAppState extends AppState {
  ingresoEgreso: IngresoEgresoState;

}

const estadoInicial: IngresoEgresoState = {
  items: []
};

export function ingresoEgresoReducer(state = estadoInicial, action: fromIngresoEgreso.accionesIngresoEgreso): IngresoEgresoState {
  switch (action.type) {
    case fromIngresoEgreso.SET_ITEMS:
      return {
        items: [
          ...action.items.map(item => { // recorro todo el arreglo de items q viene en la action, y regreso un nuevo elemento
            return {
              ...item
            };
          })
        ]
      };

    case fromIngresoEgreso.UNSET_ITEMS:
      return {
        items: []
      };

    default:
      return state;
  }
}
