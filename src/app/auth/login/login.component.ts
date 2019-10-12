import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {


  estaCargandoLoading: boolean;
  subscription: Subscription; // me permite para llamar el unsubscribe cuando se destruya el componente

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store
                        .select('ui')
                        .subscribe( ui => this.estaCargandoLoading = ui.isLoading );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmitLogin(dataLoginFormulario: any) {
    // console.log(dataLoginFormulario);
    this.authService.login(dataLoginFormulario.email, dataLoginFormulario.password);
  }

}
