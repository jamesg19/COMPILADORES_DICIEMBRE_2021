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
}
exports.Excepcion = Excepcion;
