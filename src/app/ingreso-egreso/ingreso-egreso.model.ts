
export class IngresoEgresoModel {
  description: string;
  monto: number;
  tipo: string; // ingreso | egreso
  uid?: string;

  constructor(ieObject: IngresoEgresoInterface) {
    this.description = ieObject && ieObject.nombre || null;
    this.monto = ieObject && ieObject.monto || null;
    this.tipo = ieObject && ieObject.tipo || null;
    this.uid = ieObject && ieObject.uid || null;
  }

}

interface IngresoEgresoInterface {
  nombre: string;
  monto: number;
  tipo: string;
  uid: string;
}


