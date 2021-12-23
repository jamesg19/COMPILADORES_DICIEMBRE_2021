"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tangente = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Tangente extends Instruccion_1.Instruccion {
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador
     * @param operadorIzq
     * @param fila
     * @param columna
     */
    constructor(operadorIzq, fila, columna) {
        super(fila, columna);
        this.operadorIzq = operadorIzq;
        //this.operadorDer=operadorDer;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        try {
            const izq = this.operadorIzq.interpretar(entorno, arbol);
            //const der=this.operadorDer.interpretar(entorno,arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            //validaciones
            if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //sen(ENTERO);
            if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.tan(this.obtenerVal(this.operadorIzq.tipo, izq));
            }
            ////--------DECIMAL
            //SEN(DECIMAL)
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.tan(this.obtenerVal(this.operadorIzq.tipo, izq));
            }
            //SEN(BOOLEAN)
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.tan(this.obtenerVal(this.operadorIzq.tipo, izq));
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para TAN()  ${this.operadorIzq.tipo}`, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter TAN() tipo dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("TANGENTE");
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en Sen() `, `${this.fila}`, `${this.columna}`);
        }
    }
    ///////////////////////////////////////////C3D///////////////////////////////////////
    traducir(entorno, arbol) {
        try {
            const izq = this.operadorIzq.interpretar(entorno, arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            //validaciones
            if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //TAN(ENTERO);
            if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, "");
                //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq)) ;
            }
            ////--------DECIMAL
            //TAN(DECIMAL)
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, "");
                //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq));
            }
            //TAN(BOOLEAN)
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, "");
                //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq));
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para Tan()  ${this.operadorIzq.tipo}`, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter Tan() tipo dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    setAtributosC3D(izquierda, derecha) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + " = tan(" + izquierda + ");";
        principal_1.Principal.historial += "\n";
        this.tipo = tipo_1.TIPO.DECIMAL;
        return t;
    }
}
exports.Tangente = Tangente;
