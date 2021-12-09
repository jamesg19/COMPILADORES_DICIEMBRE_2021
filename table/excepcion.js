"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
class Excepcion {
    /**
     * @param  {string} tipo
     * @param  {string} desc
     * @param  {string} fila
     * @param  {string} columna
     */
    constructor(tipo, desc, fila, columna) {
        this.tipo = tipo;
        this.descripcion = desc;
        this.fila = fila;
        this.columna = columna;
    }
    /**
     * @returns string
     */
    toString() {
        return `${this.tipo} - ${this.descripcion} - ${this.fila},${this.columna}`;
    }
}
exports.Excepcion = Excepcion;
