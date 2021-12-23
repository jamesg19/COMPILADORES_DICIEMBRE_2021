"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rango_Complete = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
class Rango_Complete extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
    }
    interpretar(entorno, arbol) {
        let array_val = entorno.getSimbolo(this.id);
        if (!(array_val instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Semantico", " Error al transpilar ", this.fila + "", this.columna + "");
        if (!array_val.arreglo)
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        if (!(array_val.valor instanceof Array))
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        return array_val.valor;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("RANGO");
        nodo.agregarHijo(this.id);
        return nodo;
    }
}
exports.Rango_Complete = Rango_Complete;
