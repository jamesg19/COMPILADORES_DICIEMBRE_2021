"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IgualIgual = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class IgualIgual extends Instruccion_1.Instruccion {
    constructor(leftExpression, rightExpression, fila, columna) {
        super(fila, columna);
        this.rightExpression = rightExpression;
        this.leftExpression = leftExpression;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        const exp1 = this.leftExpression.interpretar(entorno, arbol);
        const exp2 = this.rightExpression.interpretar(entorno, arbol);
        //Validacion item por item solo si se esta comparando arreglos
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (exp1.tipo == tipo_1.TIPO.ARREGLO && exp2.tipo == tipo_1.TIPO.ARREGLO) {
            //Si no tienen la misma cantidad de items no son iguales
            if (exp1.getSize() != exp2.getSize())
                return false;
            //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
            for (let i = 0; i < exp1.getSize(); i++) {
                if (exp1.getValue(i) != exp2.getValue(i)) {
                    this.tipo = tipo_1.TIPO.BOOLEAN;
                    return false;
                }
            }
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return true;
        }
        //console.log("falta comparar el struct")
        this.tipo = tipo_1.TIPO.BOOLEAN;
        return this.obtenerVal(this.leftExpression.tipo, exp1) == this.obtenerVal(this.rightExpression.tipo, exp2);
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
    getNodo() {
        const nodo = new nodo_1.NodoAST("RELACIONAL");
        if ((this.rightExpression != null) || (this.rightExpression != undefined)) {
            nodo.agregarHijoNodo(this.leftExpression.getNodo());
            nodo.agregarHijo("==");
            nodo.agregarHijoNodo(this.rightExpression.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("==");
            nodo.agregarHijoNodo(this.leftExpression.getNodo());
            return nodo;
        }
    }
    traducir(entorno, arbol) {
        const exp1 = this.leftExpression.traducir(entorno, arbol);
        const exp2 = this.rightExpression.traducir(entorno, arbol);
        //Validacion item por item solo si se esta comparando arreglos
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (exp1.tipo == tipo_1.TIPO.ARREGLO && exp2.tipo == tipo_1.TIPO.ARREGLO) {
            //Si no tienen la misma cantidad de items no son iguales
            if (exp1.getSize() != exp2.getSize())
                return false;
            //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
            for (let i = 0; i < exp1.getSize(); i++) {
                if (exp1.getValue(i) != exp2.getValue(i)) {
                    this.tipo = tipo_1.TIPO.BOOLEAN;
                    return false;
                }
            }
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return true;
        }
        //console.log("falta comparar el struct")
        this.tipo = tipo_1.TIPO.BOOLEAN;
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + " = " + exp1 + " == " + exp2 + ";\n";
        return t;
    }
}
exports.IgualIgual = IgualIgual;
