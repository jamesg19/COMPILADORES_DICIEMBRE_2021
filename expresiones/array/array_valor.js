"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arreglo_Valor = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
class Arreglo_Valor extends Instruccion_1.Instruccion {
    constructor(tipo, id, id_valor, fila, columna) {
        super(fila, columna);
        this.tipo = tipo;
        this.id = id;
        this.id_valor = id_valor;
    }
    interpretar(entorno, arbol) {
        let simbolo = entorno.getSimbolo(this.id_valor);
        if (simbolo == undefined) {
            return new excepcion_1.Excepcion("Semantico", "No se encuentra el Array: " + this.id_valor, "" + this.fila, this.columna + "");
        }
        if (!simbolo.arreglo)
            return new excepcion_1.Excepcion("Semantico", "No es un Array: " + this.id_valor, "" + this.fila, this.columna + "");
        if (this.tipo != simbolo.tipo)
            return new excepcion_1.Excepcion("Semantico", "No Coinciden los tipos " + this.id_valor, "" + this.fila, this.columna + "");
        let sim = entorno.getSimbolo(this.id);
        if (sim == undefined) {
            let value = JSON.parse(JSON.stringify(simbolo.valor));
            let new_array = new simbolo_1.Simbolo(this.id, this.tipo, super.fila, super.columna, value, true, false);
            entorno.addSimbolo(new_array);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("VALOR ARRAY");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.id_valor);
        return nodo;
    }
}
exports.Arreglo_Valor = Arreglo_Valor;
