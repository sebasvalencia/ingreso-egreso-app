import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate() {
    return this.authService.estaLogueado(); // regresa true si esta logueado o false si no lo esta
  }

  canLoad() {
    return this.authService.estaLogueado()
    .pipe(
      take(1)
    );
  }


}
