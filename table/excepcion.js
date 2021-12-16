"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Excepcion = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const nodo_1 = require("../abs/nodo");
class Excepcion extends Instruccion_1.Instruccion {
    /**
     * @param  {string} tipo
     * @param  {string} desc
     * @param  {string} fila
     * @param  {string} columna
     */
    constructor(tipo, desc, fila, columna) {
        super(Number(fila), Number(columna));
        this.tipo = tipo;
        this.descripcion = desc;
        this.filaa = fila;
        this.columnaa = columna;
    }
    /**
     * @returns string
     */
    toString() {
        return `${this.tipo} - ${this.descripcion} - ${this.filaa},${this.columnaa}`;
    }
    interpretar(e, arbol) {
        const err = new Excepcion(this.tipo, this.descripcion, this.filaa, this.columnaa);
        return this;
    }
    traducir(entorno, arbol) {
        return "";
    }
    getNodo() {
        return new nodo_1.NodoAST("err");
    }
}
exports.Excepcion = Excepcion;
