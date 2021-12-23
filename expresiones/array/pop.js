"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class Pop extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        let arr_value = entorno.getSimbolo(this.id);
        if (arr_value instanceof excepcion_1.Excepcion)
            return arr_value;
        if (!arr_value)
            return new excepcion_1.Excepcion("Semantico", "la variable '" + this.id + "' no existe ", "" + super.fila, "" + super.columna);
        if (!arr_value.arreglo)
            return new excepcion_1.Excepcion("Semantico", "la variable '" + this.id + "' no es un array ", "" + super.fila, "" + super.columna);
        this.tipo = arr_value.tipo;
        if (arr_value.valor instanceof Array) {
            let last_value_array = arr_value.valor[arr_value.valor.length - 1];
            arr_value.valor.pop();
            this.tipo = arr_value.tipo;
            return last_value_array;
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("POP");
        nodo.agregarHijo(this.id);
        return nodo;
    }
}
exports.Pop = Pop;
