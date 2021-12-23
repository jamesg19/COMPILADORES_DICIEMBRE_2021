"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta_Arr = void 0;
const Instruccion_1 = require("../../../abs/Instruccion");
const simbolo_1 = require("../../../table/simbolo");
const excepcion_1 = require("../../../table/excepcion");
const tipo_1 = require("../../../table/tipo");
const nodo_1 = require("../../../abs/nodo");
class Resta_Arr extends Instruccion_1.Instruccion {
    constructor(id, exp, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.exp = exp;
    }
    interpretar(entorno, arbol) {
        let arr = entorno.getSimbolo(this.id);
        if (!(arr instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Internal", "V8 esta presentando errores", this.fila + "", this.columna + "");
        if (!arr)
            return new excepcion_1.Excepcion("Internal", "No existe ", this.fila + "", this.columna + "");
        let value_exp = this.exp.interpretar(entorno, arbol);
        if (!value_exp)
            return new excepcion_1.Excepcion("Internal", "valor de expresion erroneo ", this.fila + "", this.columna + "");
        if (value_exp instanceof excepcion_1.Excepcion)
            return value_exp;
        if (!(this.exp.tipo == tipo_1.TIPO.ENTERO))
            return new excepcion_1.Excepcion("Semantico", "Se requiere un valor numerico", this.fila + "", this.columna + "");
        if (!(arr.valor instanceof Array))
            return new excepcion_1.Excepcion("Semantico", "Se esperaba un Arrego " + this.id, this.fila + "", this.columna + "");
        let value_result = arr.valor.map((x) => x - value_exp);
        return value_result;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("RESTA #");
        nodo.agregarHijo(this.id);
        nodo.agregarHijoNodo(this.exp.getNodo());
        return nodo;
    }
}
exports.Resta_Arr = Resta_Arr;
