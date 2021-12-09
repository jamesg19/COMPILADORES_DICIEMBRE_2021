"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const excepcion_1 = require("../table/excepcion");
class Print extends Instruccion_1.Instruccion {
    /**
     * @param  {number} fila
     * @param  {number} columna
     * @param  {Instruccion[]} value?
     */
    constructor(fila, columna, value) {
        super(fila, columna);
        this.fila = fila;
        this.columna = columna;
        this.value = value;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        //console.log('antes: ',this.expresion);
        //const value = this.value.interpretar(entorno,arbol);
        if (this.value != undefined) {
            this.value.forEach((exp_print) => {
                const value = exp_print.interpretar(entorno, arbol);
                if (value instanceof excepcion_1.Excepcion) {
                    console.log(value);
                    return value;
                }
                arbol.consola += value;
                console.log(value);
            });
        }
    }
}
exports.Print = Print;
