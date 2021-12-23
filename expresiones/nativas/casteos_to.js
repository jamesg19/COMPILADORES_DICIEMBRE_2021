"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasteosTo = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const tiponativacadena_1 = require("./tiponativacadena");
const identificador_1 = require("../identificador");
const nodo_1 = require("../../abs/nodo");
class CasteosTo extends Instruccion_1.Instruccion {
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador
     * @param identificador
     * @param fila
     * @param columna
     */
    constructor(id, tipo_casteo, fila, columna) {
        super(fila, columna);
        this.identificador = id;
        this.tipo_casteo = tipo_casteo;
        this.fila = fila;
        this.columna = columna;
        this.tipo = 9;
    }
    interpretar(entorno, arbol) {
        try {
            //VERIFICA SI ES UN IDENTIFICADOR
            if (this.identificador instanceof identificador_1.Identificador) {
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = entorno.getSimbolo(this.identificador.id + "");
                const test = this.identificador.interpretar(entorno, arbol);
                if (test instanceof excepcion_1.Excepcion) {
                    return test;
                }
                if (variable == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador}`, `${this.fila}`, `${this.columna}`);
                }
                //TIPO TYPE_OF
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TYPEOF) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (variable.tipo == tipo_1.TIPO.CADENA) {
                        return 'string';
                    }
                    else if (variable.tipo == tipo_1.TIPO.ENTERO) {
                        return 'int';
                    }
                    else if (variable.tipo == tipo_1.TIPO.DECIMAL) {
                        return 'double';
                    }
                    else if (variable.tipo == tipo_1.TIPO.BOOLEAN) {
                        return 'boolean';
                    }
                    else {
                        return 'char';
                    }
                    //return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOSTRING) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.identificador.interpretar(entorno, arbol) + "";
                }
                if (variable == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador}`, `${this.fila}`, `${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA
                if (variable.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                if (variable.tipo != tipo_1.TIPO.ENTERO) {
                    if (variable.tipo != tipo_1.TIPO.DECIMAL) {
                        return new excepcion_1.Excepcion("Semantico", "Error de operacion en Casteo variable diferente a NUMERO.. ", `${this.fila}`, `${this.columna}`);
                    }
                }
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOINT) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return Number(this.identificador.interpretar(entorno, arbol) + "");
                }
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TODOUBLE) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return Number(this.identificador.interpretar(entorno, arbol) + "") * (1.0);
                }
            }
            else {
                ///////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////
                //verifica que la expresion sea CADENA
                const test = this.identificador.interpretar(entorno, arbol);
                if (test instanceof excepcion_1.Excepcion) {
                    return test;
                }
                //TYPEOF
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TYPEOF) {
                    //this.tipo=TIPO.CADENA;
                    //console.log(this.identificador.tipo+"    TEST  ");
                    if (this.identificador.tipo == tipo_1.TIPO.CADENA) {
                        console.log("ES CADENA ");
                        return 'string';
                    }
                    else if (this.identificador.tipo == tipo_1.TIPO.ENTERO) {
                        return 'int';
                    }
                    else if (this.identificador.tipo == tipo_1.TIPO.DECIMAL) {
                        return 'double';
                    }
                    else if (this.identificador.tipo == tipo_1.TIPO.BOOLEAN) {
                        return 'boolean';
                    }
                    else if (this.identificador.tipo == tipo_1.TIPO.ARREGLO) {
                        return 'arreglo';
                    }
                    else {
                        console.log(this.identificador.tipo);
                        return 'char';
                    }
                }
                //realiza el to String()
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOSTRING) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return String(this.identificador.interpretar(entorno, arbol) + "");
                }
                if (this.identificador.tipo != tipo_1.TIPO.ENTERO) {
                    if (this.identificador.tipo != tipo_1.TIPO.DECIMAL) {
                        return new excepcion_1.Excepcion("Semantico", "Error de operacion en Casteo variable diferente a NUMERO", `${this.fila}`, `${this.columna}`);
                    }
                }
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOINT) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return Number(this.identificador.interpretar(entorno, arbol) + "");
                }
                if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TODOUBLE) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return Number(this.identificador.interpretar(entorno, arbol) + "") * (1.0);
                }
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para metodo nativo string() `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("CASTEO");
        if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.BOOLEANPARSE) {
            nodo.agregarHijo("BOOLEANPARSE");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
            nodo.agregarHijo("CARACTER_POSITION");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.DOUBLEPARSE) {
            nodo.agregarHijo("DOUBLEPARSE");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.INTPARSE) {
            nodo.agregarHijo("INTPARSE");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
            nodo.agregarHijo("LENGHT");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.REPETICION) {
            nodo.agregarHijo("REPETICION");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
            nodo.agregarHijo("SUBSTRING");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TODOUBLE) {
            nodo.agregarHijo("TODOUBLE");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOINT) {
            nodo.agregarHijo("TOINT");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
            nodo.agregarHijo("TOLOWER");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOSTRING) {
            nodo.agregarHijo("TOSTRING");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
            nodo.agregarHijo("TOUPPER");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.TYPEOF) {
            nodo.agregarHijo("TYPEOF");
        }
        else if (this.tipo_casteo == tiponativacadena_1.TIPO_NATIVA_CADENA.STRING) {
            nodo.agregarHijo("STRING");
        }
        nodo.agregarHijoNodo(this.identificador.getNodo());
        return nodo;
    }
    obtenerVal(tipo_casteo, val) {
        try {
            if (tipo_casteo === tipo_1.TIPO.ENTERO || tipo_casteo === tipo_1.TIPO.DECIMAL) {
                return Number(val);
            }
            else if (tipo_casteo === tipo_1.TIPO.BOOLEAN) {
                if (val.toLowerCase() === "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (tipo_casteo === tipo_1.TIPO.CADENA) {
                return val;
            }
            else {
                return val;
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en Sen() `, `${this.fila}`, `${this.columna}`);
        }
    }
}
exports.CasteosTo = CasteosTo;
