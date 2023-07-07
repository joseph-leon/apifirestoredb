//modelo de usuarios
class Users {
    constructor(id, rol, nombre, correo, pass) {
            this.id = id;
            this.rol = rol;
            this.nombre = nombre;
            this.correo = correo;
            this.pass = pass; 
    }
}

module.exports = Users;