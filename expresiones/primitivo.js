"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
class Primitivo {
    constructor(fila, columna, tipo, value) {
        //super(fila,columna);
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.value = value;
        this.struct = false;
        this.arra = false;
    }
    interpretar(entorno, arbol) {
        return this.value;
    }
}
exports.Primitivo = Primitivo;
