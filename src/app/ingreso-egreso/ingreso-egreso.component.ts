import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {


  forma: FormGroup;
  tipo = 'ingreso';

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0))
    });
  }

  crearIngresoEgreso() {
    console.log(this.forma.value);
    console.log(this.tipo);

    const ingresoEgreso = new IngresoEgresoModel({ ...this.forma.value, tipo: this.tipo }); // mando pares de valores

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso).then(() => {

      this.forma.reset({
        monto: 0
      });

      Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
    });

    console.log(ingresoEgreso);
  }

}
