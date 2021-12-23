"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion_Struct_Exp = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class Asignacion_Struct_Exp extends Instruccion_1.Instruccion {
    constructor(acceso, exp, fila, columna) {
        super(fila, columna);
        this.acceso = acceso;
        this.exp = exp;
    }
    interpretar(entorno, arbol) {
        let value_acceso = this.acceso.interpretar(entorno, arbol);
        if (value_acceso instanceof excepcion_1.Excepcion) {
            arbol.excepciones.push(value_acceso);
            return value_acceso;
        }
        let value_exp = this.exp.interpretar(entorno, arbol);
        if (value_exp instanceof excepcion_1.Excepcion)
            return value_exp;
        if (value_exp == undefined)
            return new excepcion_1.Excepcion("Semantico", "Se requiere de un valor para la asignacion en un struct", "" + this.fila, "" + this.columna);
        if (!(this.exp.tipo == value_acceso.tipo))
            return new excepcion_1.Excepcion("Semantico", "tipos diferentes en asignacion, struct: " + value_acceso.tipo, "" + this.fila, "" + this.columna);
        value_acceso.valor = value_exp;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ASIGNACION STRUCT");
        nodo.agregarHijo(this.acceso.id);
        nodo.agregarHijoNodo(this.exp.getNodo());
        return nodo;
    }
}
exports.Asignacion_Struct_Exp = Asignacion_Struct_Exp;
