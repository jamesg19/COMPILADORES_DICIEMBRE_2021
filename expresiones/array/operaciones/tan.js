"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tan_Arr = void 0;
const Instruccion_1 = require("../../../abs/Instruccion");
const simbolo_1 = require("../../../table/simbolo");
const excepcion_1 = require("../../../table/excepcion");
const nodo_1 = require("../../../abs/nodo");
class Tan_Arr extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
    }
    interpretar(entorno, arbol) {
        let arr = entorno.getSimbolo(this.id);
        if (!(arr instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Internal", "V8 esta presentando errores", this.fila + "", this.columna + "");
        if (!arr)
            return new excepcion_1.Excepcion("Internal", "No existe ", this.fila + "", this.columna + "");
        if (!(arr.valor instanceof Array))
            return new excepcion_1.Excepcion("Semantico", "Se esperaba un Arrego " + this.id, this.fila + "", this.columna + "");
        let value_result = arr.valor.map((x) => Math.tan(x));
        return value_result;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("TAN #");
        nodo.agregarHijo(this.id);
        return nodo;
    }
}
exports.Tan_Arr = Tan_Arr;
