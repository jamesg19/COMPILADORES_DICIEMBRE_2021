"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fin_Rango = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
class Fin_Rango extends Instruccion_1.Instruccion {
    constructor(id, fin, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.fin = fin;
    }
    interpretar(entorno, arbol) {
        let final_value = this.fin.interpretar(entorno, arbol);
        if (final_value instanceof excepcion_1.Excepcion)
            return final_value;
        if (!final_value)
            return new excepcion_1.Excepcion("Semantico", " Se requiere una expresion ", this.fila + "", this.columna + "");
        // if (!isNumber(final_value))
        //   return new Excepcion(
        //     "Semantico",
        //     " Se requiere una expresion  numerica",
        //     this.fila + "",
        //     this.columna + ""
        //   );
        let array_val = entorno.getSimbolo(this.id);
        if (!(array_val instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Semantico", " Error al transpilar ", this.fila + "", this.columna + "");
        if (!array_val.arreglo)
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        if (!(array_val.valor instanceof Array))
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        if (!(final_value <= array_val.valor.length && final_value >= 0))
            return new excepcion_1.Excepcion("Semantico", " expresion final excede la longitud del arreglo ", this.fila + "", this.columna + "");
        return array_val.valor.slice(final_value, array_val.valor.length - 1);
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST(":END");
        nodo.agregarHijo(this.id);
        nodo.agregarHijoNodo(this.fin.getNodo());
        return nodo;
    }
}
exports.Fin_Rango = Fin_Rango;
