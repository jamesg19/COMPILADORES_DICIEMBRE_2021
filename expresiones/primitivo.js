"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const nodo_1 = require("../abs/nodo");
class Primitivo extends Instruccion_1.Instruccion {
    /**
     * @param  {TIPO} tipo
     * @param  {any} value
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(tipo, value, fila, columna) {
        super(fila, columna);
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo;
        this.value = value;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        //console.log(this.value);
        if (this.tipo == tipo_1.TIPO.ENTERO || this.tipo == tipo_1.TIPO.DECIMAL) {
            return this.value;
        }
        return this.value;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("PRIMITIVO");
        nodo.agregarHijo(this.value);
        return nodo;
    }
}
exports.Primitivo = Primitivo;
