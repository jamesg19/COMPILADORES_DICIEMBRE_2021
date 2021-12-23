"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NegacionNum = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class NegacionNum extends Instruccion_1.Instruccion {
    constructor(operador, operadorIzq, operadorDer, fila, columna) {
        super(fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.fila = fila;
        this.columna = columna;
        this.operador = operador;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        try {
            const izq = this.operadorIzq.interpretar(entorno, arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            if (this.operador === 6 /* UMENOS */) {
                //validaciones
                if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO
                if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return (this.obtenerVal(this.operadorIzq.tipo, izq)) * (-1);
                }
                //DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return (this.obtenerVal(this.operadorIzq.tipo, izq)) * (-1);
                }
                return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para negacion numero ${this.operadorIzq.tipo} * ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter negacion numero ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("NEGACION");
        nodo.agregarHijo(this.operadorIzq.value + "");
        return nodo;
    }
    obtenerVal(tipo, val) {
        try {
            if (tipo === tipo_1.TIPO.ENTERO || tipo === tipo_1.TIPO.DECIMAL) {
                return Number(val);
            }
            else if (tipo === tipo_1.TIPO.BOOLEAN) {
                if (val.toLowerCase() === "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (tipo === tipo_1.TIPO.CADENA) {
                return val;
            }
            else {
                return val;
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en negacion `, `${this.fila}`, `${this.columna}`);
        }
    }
}
exports.NegacionNum = NegacionNum;
