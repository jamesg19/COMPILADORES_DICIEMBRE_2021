"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class Push extends Instruccion_1.Instruccion {
    constructor(id, exp, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.exp = exp;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        let exp_value = this.exp.interpretar(entorno, arbol);
        if (exp_value instanceof excepcion_1.Excepcion)
            return exp_value;
        let arr_value = entorno.getSimbolo(this.id);
        //if (arr_value.tipo != this.exp.tipo) return new Excepcion("Semantico","No coinciden los tipos", super.fila+"",super.columna+"");
        if (arr_value instanceof excepcion_1.Excepcion)
            return arr_value;
        if (!arr_value)
            return new excepcion_1.Excepcion("Semantico", "la variable" + this.id + " no existe ", "" + super.fila, "" + super.columna);
        if (arr_value.tipo)
            return new excepcion_1.Excepcion("Semantico", "la variable" + this.id + " no es un array ", "" + super.fila, "" + super.columna);
        this.tipo = arr_value.tipo;
        if (arr_value.valor instanceof Array) {
            arr_value.valor.push(exp_value);
            //return last_value_array
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return true;
        }
        this.tipo = tipo_1.TIPO.NULL;
        return new excepcion_1.Excepcion("Semantico", "Push se aplica en arrays, " + this.id + " no es un array", super.fila + "", super.columna + "");
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("PUSH");
        nodo.agregarHijo(this.id);
        return nodo;
    }
}
exports.Push = Push;
