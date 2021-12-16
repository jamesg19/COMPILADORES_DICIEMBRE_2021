"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const excepcion_1 = require("../table/excepcion");
const identificador_1 = require("../expresiones/identificador");
const nodo_1 = require("../abs/nodo");
const principal_1 = require("../principal");
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
    traducir(entorno, arbol) {
        var _a;
        let cadena = "";
        let value_cadena = "";
        //me sirve para agregarle las comillas a la cadena
        (_a = this.value) === null || _a === void 0 ? void 0 : _a.forEach((x) => {
            let tr = x.traducir(entorno, arbol);
            //PRINT(5+6+7);
            //exp=5+6+7
            //exp.traducri
            //t1=5+6;
            //t2=t1+7;
            //return t2;
            //print(t2);
            //if(x instanceof Identificador) return this.print_Cadena(x.)
            if (tipo_1.TIPO.CADENA == x.tipo) {
                Print.print = true;
                cadena += "/*Imprimiendo secuencia de caracteres*/\n";
                cadena +=
                    "/*Imprimiendo secuencia de caracteres\n---->" +
                        tr +
                        "<----\n*/\n";
                cadena += this.transform_cadena(tr, arbol);
                cadena += "printString();\n";
            }
            if (tipo_1.TIPO.ENTERO == x.tipo) {
                cadena += "/*Imprimiendo secuencia de caracteres*/\n";
                cadena +=
                    "/*Imprimiendo secuencia de caracteres\n---->" +
                        tr +
                        "<----\n*/\n";
                cadena += 'printf("%d\\n",' + tr + ");\n";
            }
            if (tipo_1.TIPO.DECIMAL == x.tipo) {
                cadena += "/*Imprimiendo secuencia de caracteres*/\n";
                cadena +=
                    "/*Imprimiendo secuencia de caracteres\n---->\n" +
                        x.value +
                        "<----\n*/\n";
                cadena += 'printf("%f\\n",' + tr + ");\n";
            }
            //if (TIPO.ENTERO == x.tipo) cadena += 'printf("%f"+stack['+x.posicion+']);';
            //cadena += " %f";
            // value_cadena += isCadena ? ', "' + x.value + '"' : "," + x.value;
            // isCadena = false;
        });
        principal_1.Principal.historial += cadena;
        return "";
    }
    //TRANSFORMA CADENA A CODIGO ASCII DE CADA CARACTER QUE CONTENGA
    transform_cadena(x, arbol) {
        let return_string = "";
        return_string = "t" + principal_1.Principal.temp + " = H;\n";
        //obtener codigo ASCII de cada caracter de la cadena
        //cadena en el heap
        for (let i = 0; i < x.length; i++) {
            let item = x.charCodeAt(i);
            return_string += "heap[(int)H] = " + item + " ;\n";
            return_string += "H = H + 1;\n";
            //console.log(item);
        }
        return_string += "heap[(int)H] = -1 ;\n";
        return_string += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        principal_1.Principal.posicion++;
        return_string +=
            "t" + principal_1.Principal.posicion + " = P + " + principal_1.Principal.posicion + ";\n";
        return return_string;
    }
}
exports.Print = Print;
Print.print = false;
