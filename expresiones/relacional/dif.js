"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Diff = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Diff extends Instruccion_1.Instruccion {
    constructor(expIzq, expDer, fila, columna) {
        super(fila, columna);
        this.expDer = expDer;
        this.expIzq = expIzq;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        const exp1 = this.expIzq.interpretar(entorno, arbol);
        const exp2 = this.expDer.interpretar(entorno, arbol);
        //verificar si son struct o arrayg
        //Validacion item por item solo si se esta comparando arreglos
        if (exp1.tipo == tipo_1.TIPO.ARREGLO && exp2.tipo == tipo_1.TIPO.ARREGLO) {
            //Si no tienen la misma cantidad de items no son iguales
            if (exp1.getSize() != exp2.getSize()) {
                this.tipo = tipo_1.TIPO.BOOLEAN;
                return true;
            }
            //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
            for (let i = 0; i < exp1.getSize(); i++) {
                if (exp1.getValue(i) != exp2.getValue(i)) {
                    this.tipo = tipo_1.TIPO.BOOLEAN;
                    return true;
                }
            }
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return false;
        }
        this.tipo = tipo_1.TIPO.BOOLEAN;
        return this.obtenerVal(this.expIzq.tipo, exp1) != this.obtenerVal(this.expDer.tipo, exp2);
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("RELACIONAL");
        if ((this.expDer != null) || (this.expDer != undefined)) {
            nodo.agregarHijoNodo(this.expIzq.getNodo());
            nodo.agregarHijo("DIFERENTE");
            nodo.agregarHijoNodo(this.expDer.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("DIFERENTE");
            nodo.agregarHijoNodo(this.expIzq.getNodo());
            return nodo;
        }
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en division`, `${this.fila}`, `${this.columna}`);
        }
    }
    traducir(entorno, arbol) {
        const exp1 = this.expIzq.traducir(entorno, arbol);
        const exp2 = this.expDer.traducir(entorno, arbol);
        //verificar si son struct o arrayg
        //Validacion item por item solo si se esta comparando arreglos
        if (exp1.tipo == tipo_1.TIPO.ARREGLO && exp2.tipo == tipo_1.TIPO.ARREGLO) {
            //Si no tienen la misma cantidad de items no son iguales
            if (exp1.getSize() != exp2.getSize()) {
                this.tipo = tipo_1.TIPO.BOOLEAN;
                return true;
            }
            //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
            for (let i = 0; i < exp1.getSize(); i++) {
                if (exp1.getValue(i) != exp2.getValue(i)) {
                    this.tipo = tipo_1.TIPO.BOOLEAN;
                    return true;
                }
            }
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return false;
        }
        this.tipo = tipo_1.TIPO.BOOLEAN;
        this.obtenerVal(this.expIzq.tipo, exp1) != this.obtenerVal(this.expDer.tipo, exp2);
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + "= " + exp1 + " != " + exp2 + ";\n";
        return t;
    }
}
exports.Diff = Diff;
