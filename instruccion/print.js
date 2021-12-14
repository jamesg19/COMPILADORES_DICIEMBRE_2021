"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const excepcion_1 = require("../table/excepcion");
const nodo_1 = require("../abs/nodo");
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
                let value = exp_print.interpretar(entorno, arbol);
                if (value instanceof excepcion_1.Excepcion) {
                    console.log(value);
                    return value;
                }
                if (value != undefined) {
                    value = value.toString();
                }
                else {
                    value = "Indefinido";
                }
                arbol.consola += value;
                console.log(value);
            });
        }
    }
    print_struct(exp) {
        let formato = exp.name_struct + " ( ";
        if (exp.valor instanceof Map) {
            exp.valor.forEach((element) => {
                console.log(element);
            });
        }
        return formato;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("IMPRIMIR");
        nodo.agregarHijoNodo(this.value);
        return nodo;
    }
}
exports.Print = Print;
