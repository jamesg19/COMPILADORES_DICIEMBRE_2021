"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Temporal = void 0;
class Temporal {
    constructor(nombre) {
        this.nombre = nombre;
        this.utilizado = false;
    }
    obtener() {
        return this.nombre;
    }
    utilizar() {
        this.utilizado = true;
        return this.nombre;
    }
}
exports.Temporal = Temporal;
