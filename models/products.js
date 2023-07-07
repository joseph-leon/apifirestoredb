//modelo de productos
class Products {
    constructor(id, nombre, descripcion, precio, barCode, cantidad, imagenId, imagenUrl, usuarioId, fecha, hora) {
            this.id = id;
            this.nombre = nombre;
            this.descripcion = descripcion;
            this.precio = precio;
            this.barCode = barCode;
            this.cantidad = cantidad; 
            this.imagenId = imagenId; 
            this.imagenUrl = imagenUrl; 
            this.usuarioId = usuarioId;
            this.fecha = fecha;
            this.hora = hora;
    }
}

module.exports = Products;