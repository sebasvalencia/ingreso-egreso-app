
import { User } from './user.model';
import * as fromAuth from './auth.actions';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: null
};

export function AuthReducer(state = initialState, action: fromAuth.accionesAuth): AuthState {
  switch (action.type) {
    case fromAuth.SET_USER:
      return {
        user: {
          ...action.user // tomo cada una de las propiedades del objecto user y hago pares de valores
        }
      };
      case fromAuth.UNSET_USER:
      return {
        user: null
      };

    default:
      return state;
  }
};
