
export class IngresoEgresoModel {
  descripcion: string;
  monto: number;
  tipo: string; // ingreso | egreso
  uid?: string;

  constructor(ieObject: IngresoEgresoInterface) {
    this.descripcion = ieObject && ieObject.descripcion || null;
    this.monto = ieObject && ieObject.monto || null;
    this.tipo = ieObject && ieObject.tipo || null;
    // this.uid = ieObject && ieObject.uid || null;
  }

}

interface IngresoEgresoInterface {
  descripcion: string;
  monto: number;
  tipo: string;
  // uid: string;
}


