import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '',
    loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule', // habilita el lazyload, importa el modulo
    canLoad: [ AuthGuardService ], // No carges el modulo si no se cumple una serie de condiciones
  },
  {path: '**', redirectTo: ''}
  // {path: '', component: DashboardComponent, children: dashboardRoutes,
  // canActivate: [ AuthGuardService ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
