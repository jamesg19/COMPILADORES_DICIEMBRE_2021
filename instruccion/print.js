"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const excepcion_1 = require("../table/excepcion");
const identificador_1 = require("../expresiones/identificador");
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
                    if (exp_print instanceof identificador_1.Identificador) {
                        let simbol = entorno.getSimbolo(exp_print.id);
                        value = simbol.toString();
                    }
                    else
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
        var _a;
        const nodo = new nodo_1.NodoAST("IMPRIMIR");
        (_a = this.value) === null || _a === void 0 ? void 0 : _a.forEach((x) => {
            nodo.agregarHijoNodo(x.getNodo());
        });
        //un nodo
        return nodo;
    }
}
exports.Print = Print;
