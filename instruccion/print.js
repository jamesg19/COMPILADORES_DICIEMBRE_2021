"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const excepcion_1 = require("../table/excepcion");
class Print extends Instruccion_1.Instruccion {
    constructor(fila, columna, value) {
        super(fila, columna);
        this.fila = fila;
        this.columna = columna;
        this.expresion = value;
    }
    interpretar(entorno, arbol) {
        //console.log('antes: ',this.expresion);
        const value = this.expresion.interpretar(entorno, arbol);
        //console.log('despues: ',value);
        if (value instanceof excepcion_1.Excepcion) {
            return value;
        }
        console.log(value);
        arbol.consola += value;
        //console.log(value);
    }
}
exports.Print = Print;
