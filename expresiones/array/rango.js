"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rango = void 0;
const util_1 = require("util");
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
class Rango extends Instruccion_1.Instruccion {
    constructor(id, inicio, fin, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.fin = fin;
        this.inicio = inicio;
    }
    interpretar(entorno, arbol) {
        let final_value = this.fin.interpretar(entorno, arbol);
        if (final_value instanceof excepcion_1.Excepcion)
            return final_value;
        if (!final_value)
            return new excepcion_1.Excepcion("Semantico", " Se requiere una expresion ", this.fila + "", this.columna + "");
        final_value = Number(final_value);
        if (!(0, util_1.isNumber)(final_value))
            return new excepcion_1.Excepcion("Semantico", " Se requiere una expresion  numerica", this.fila + "", this.columna + "");
        let init_value = this.inicio.interpretar(entorno, arbol);
        if (init_value instanceof excepcion_1.Excepcion)
            return final_value;
        if (!init_value)
            return new excepcion_1.Excepcion("Semantico", " Se requiere una expresion ", this.fila + "", this.columna + "");
        init_value = Number(final_value);
        if (!(0, util_1.isNumber)(init_value))
            return new excepcion_1.Excepcion("Semantico", " Se requiere una expresion  numerica", this.fila + "", this.columna + "");
        let array_val = entorno.getSimbolo(this.id);
        if (!(array_val instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Semantico", " Error al transpilar ", this.fila + "", this.columna + "");
        if (!array_val.arreglo)
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        if (!(array_val.valor instanceof Array))
            return new excepcion_1.Excepcion("Semantico", " No es un Arreglo ", this.fila + "", this.columna + "");
        if (!(final_value <= array_val.valor.length && final_value >= 0))
            return new excepcion_1.Excepcion("Semantico", " expresion final excede la longitud del arreglo ", this.fila + "", this.columna + "");
        if ((init_value >= 0 && init_value <= array_val.valor.length))
            return array_val.valor.slice(init_value, final_value);
        return new excepcion_1.Excepcion("Semantico", " Expresiones ingresadas exceden los limites del Arreglo ", this.fila + "", this.columna + "");
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("RANGO");
        const inicio = new nodo_1.NodoAST("INICIO");
        const fin = new nodo_1.NodoAST("FIN");
        nodo.agregarHijo(this.id);
        inicio.agregarHijoNodo(this.inicio.getNodo());
        fin.agregarHijoNodo(this.fin.getNodo());
        nodo.agregarHijoNodo(inicio);
        nodo.agregarHijoNodo(fin);
        return nodo;
    }
}
exports.Rango = Rango;
