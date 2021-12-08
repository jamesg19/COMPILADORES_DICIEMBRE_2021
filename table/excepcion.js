"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion {
    constructor(tipo, desc, fila, columna) {
        this.tipo = tipo;
        this.descripcion = desc;
        this.fila = fila;
        this.columna = columna;
    }
    toString() {
        return `${this.tipo} - ${this.descripcion} - ${this.fila},${this.columna}`;
    }
}
exports.Excepcion = Excepcion;
