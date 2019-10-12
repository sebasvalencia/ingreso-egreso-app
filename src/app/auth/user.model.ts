
export class User {

  public nombre: string;
  public email: string;
  public uid: string;

  constructor(usuarioObjecto: UsuarioInterface) {
    this.nombre = usuarioObjecto && usuarioObjecto.nombre || null;
    this.email = usuarioObjecto && usuarioObjecto.email || null;
    this.uid = usuarioObjecto && usuarioObjecto.uid || null;
  }
}

interface UsuarioInterface {
  nombre: string;
  email: string;
  uid: string;
}






