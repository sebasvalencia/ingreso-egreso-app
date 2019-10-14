import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {


  forma: FormGroup;
  tipo = 'ingreso';

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      descripcion: new FormControl( '', Validators.required ),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    console.log(this.forma.value);
    console.log(this.tipo);

    const ingresoEgreso = new IngresoEgresoModel({...this.forma.value, tipo: this.tipo}); // mando pares de valores

    console.log(ingresoEgreso);
  }

}
