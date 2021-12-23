"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goto = void 0;
class Goto {
    constructor(id, fila, columna) {
        this.id = id;
        this.fila = fila;
        this.columna = columna;
    }
    traducir(e, arbol) {
        console.log(`\n` + 'goto' + this.id + ';');
    }
}
exports.Goto = Goto;
