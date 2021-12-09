"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Primitivo = void 0;
const Instruccion_1 = require("../abs/Instruccion");
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
        return this.value;
    }
}
exports.Primitivo = Primitivo;
