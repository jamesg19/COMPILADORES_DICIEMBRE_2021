"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Etiqueta = void 0;
class Etiqueta {
    constructor(id, linea, columna) {
        this.id = id;
        this.linea = linea;
        this.columna = columna;
    }
    traducir(entorno, arbol) {
        console.log(`\n` + this.id + ':');
    }
}
exports.Etiqueta = Etiqueta;
