"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const excepcion_1 = require("../table/excepcion");
const identificador_1 = require("../expresiones/identificador");
const primitivo_1 = require("../expresiones/primitivo");
const nodo_1 = require("../abs/nodo");
const principal_1 = require("../principal");
const Parser = require("../analizador/variable");
class Print extends Instruccion_1.Instruccion {
    /**
     * @param  {number} fila
     * @param  {number} columna
     * @param  {Instruccion[]} value?
     */
    constructor(fila, columna, value, newLine) {
        super(fila, columna);
        this.newLine = false;
        this.fila = fila;
        this.columna = columna;
        this.value = value;
        this.newLine = newLine;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        //verifica que exista un valor para imprimir
        if (this.value != undefined) {
            //ejecuta las instrucciones para imprimir
            this.value.forEach((exp_print) => {
                //interpreta las expresiones
                let valorTemporal = "";
                let value = exp_print.interpretar(entorno, arbol);
                if (value instanceof excepcion_1.Excepcion) {
                    console.log(value);
                    return value;
                }
                //verifica que el valor resultante de la interpretacion exista
                if (value != undefined) {
                    //verifica que la expresion sea un identificador
                    if (exp_print instanceof identificador_1.Identificador) {
                        let simbol = entorno.getSimbolo(exp_print.id);
                        value = simbol.toString();
                    }
                    //caso contrario es una cadena
                    else {
                        let dolar = "$";
                        //verifica que la expresion incluya el $
                        if (value.toString().includes(dolar)) {
                            //console.log(" VALUE to.string"+value.toString());
                            //verifica que sea un primitivo de tipo cadena "asdfsdfs ${}" para verificar que venga incrustado codigo
                            if (exp_print instanceof primitivo_1.Primitivo) {
                                if (exp_print.tipo == tipo_1.TIPO.CADENA) {
                                    //analiza la cadena
                                    const instruccioness = Parser.parse(value.toString());
                                    //verifica que la lista contenga instrucciones
                                    instruccioness.forEach(element => {
                                        let tmp = element.interpretar(entorno, arbol);
                                        if (tmp instanceof excepcion_1.Excepcion) {
                                            arbol.excepciones.push(tmp);
                                            arbol.updateConsolaError(tmp + "");
                                            tmp = "";
                                            console.log("ERROR");
                                        }
                                        valorTemporal += tmp + "";
                                    });
                                    //console.log(instruccioness);
                                }
                            }
                            value = valorTemporal.toString();
                        }
                        else {
                            value = value.toString();
                        }
                    }
                }
                else {
                    value = "Indefinido";
                }
                arbol.consola += value + ((this.newLine) ? "\n" : "");
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
        let contador = 0;
        (_a = this.value) === null || _a === void 0 ? void 0 : _a.forEach((x) => {
            contador++;
            let tr = x.traducir(entorno, arbol); //t[0]
            if (x instanceof identificador_1.Identificador) {
                Print.print = true;
                principal_1.Principal.addComentario("Imprimiendo una expresion cadena tr" + tr);
                principal_1.Principal.historial += "P = " + tr + ";\n";
                principal_1.Principal.historial += "printString();\n";
                //Principal.historial += "printf(\"%s\",\"\");\n"
            }
            else if (tipo_1.TIPO.CADENA == x.tipo) {
                Print.print = true;
                cadena += this.transform_cadena(x.value, arbol);
            }
            else if (tipo_1.TIPO.ENTERO == x.tipo) {
                cadena += 'printf("%d",' + tr + ");\n";
            }
            else if (tipo_1.TIPO.BOOLEAN == x.tipo) {
                cadena += 'printf("%f",' + tr + ");\n";
            }
            else if (tipo_1.TIPO.DECIMAL == x.tipo) {
                principal_1.Principal.addComentario("Imprimiendo Decimal");
                cadena += 'printf("%f",' + tr + ");\n";
            }
            else if (tipo_1.TIPO.CARACTER == x.tipo) {
                cadena += 'printf("%c",' + "(int)(" + tr + "));\n";
            }
            /*
            encerrar en un if para ver si requiere saltos de linea
             */
            cadena += (this.newLine) ? 'printf("\\n");\n' : "\n";
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
        if (!x)
            x = "c";
        for (let i = 0; i < x.length - 1; i++) {
            let item = x.charCodeAt(i);
            return_string += "heap[(int)H] = " + item + " ;\n";
            return_string += "H = H + 1;\n";
            //console.log(item);
        }
        return_string += "heap[(int)H] = -1 ;\n";
        return_string += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        //Principal.posicion;
        return_string +=
            "t" + principal_1.Principal.temp + " = P + " + principal_1.Principal.posicion + ";\n";
        return return_string;
    }
}
exports.Print = Print;
Print.print = false;
