"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const excepcion_1 = require("../table/excepcion");
const instancia_struct_1 = require("../expresiones/struct/instancia_struct");
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
                    if (exp_print instanceof instancia_struct_1.Dec_Struct) {
                        console.log("mal");
                        value = value.valor;
                    }
                    else
                        value - value.valor;
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
            exp.valor.forEach(element => {
                console.log(element);
            });
        }
        return formato;
    }
}
exports.Print = Print;
