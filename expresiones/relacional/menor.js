"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menor = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Menor extends Instruccion_1.Instruccion {
    constructor(leftExpression, rigthExpression, linea, columna) {
        super(linea, columna);
        this.leftExpression = leftExpression;
        this.rigthExpression = rigthExpression;
        this.tipo = tipo_1.TIPO.NULL;
        Object.assign(this, { leftExpression, rigthExpression });
    }
    interpretar(e, arbol) {
        const exp1 = this.leftExpression.interpretar(e, arbol);
        const exp2 = this.rigthExpression.interpretar(e, arbol);
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (this.rigthExpression.tipo == tipo_1.TIPO.ARREGLO ||
            this.rigthExpression.tipo == tipo_1.TIPO.ARREGLO)
            return new excepcion_1.Excepcion("Semantico", "no se pueden comparar objetos ", super.fila + "", super.columna + "");
        if (this.leftExpression.tipo == tipo_1.TIPO.ARREGLO ||
            this.leftExpression.tipo == tipo_1.TIPO.ARREGLO)
            return new excepcion_1.Excepcion("Semantico", "no se pueden comparar objetos ", super.fila + "", super.columna + "");
        if (this.leftExpression.tipo == tipo_1.TIPO.NULL ||
            this.rigthExpression.tipo == tipo_1.TIPO.NULL)
            return new excepcion_1.Excepcion("Semantico", "variable NULL no se puede comparar ", super.fila + "", super.columna + "");
        //MENOR QUE
        //ENTERO < ENTERO
        if (this.leftExpression.tipo === tipo_1.TIPO.ENTERO &&
            this.rigthExpression.tipo === tipo_1.TIPO.ENTERO) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.obtenerVal(this.leftExpression.tipo, exp1) < this.obtenerVal(this.rigthExpression.tipo, exp2);
        }
        //ENTERO < DECIMAL
        else if (this.leftExpression.tipo === tipo_1.TIPO.ENTERO &&
            this.rigthExpression.tipo === tipo_1.TIPO.DECIMAL) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.obtenerVal(this.leftExpression.tipo, exp1) < this.obtenerVal(this.rigthExpression.tipo, exp2);
        }
        //DECIMAL < ENTERO
        else if (this.leftExpression.tipo === tipo_1.TIPO.DECIMAL &&
            this.rigthExpression.tipo === tipo_1.TIPO.ENTERO) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.obtenerVal(this.leftExpression.tipo, exp1) < this.obtenerVal(this.rigthExpression.tipo, exp2);
        }
        //DECIMAL < DECIMAL
        else if (this.leftExpression.tipo === tipo_1.TIPO.DECIMAL &&
            this.rigthExpression.tipo === tipo_1.TIPO.DECIMAL) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.obtenerVal(this.leftExpression.tipo, exp1) < this.obtenerVal(this.rigthExpression.tipo, exp2);
        }
        //BOOLEAN < BOOLEAN
        else if (this.leftExpression.tipo === tipo_1.TIPO.BOOLEAN &&
            this.rigthExpression.tipo === tipo_1.TIPO.BOOLEAN) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.obtenerVal(this.leftExpression.tipo, exp1) < this.obtenerVal(this.rigthExpression.tipo, exp2);
        }
    }
    traducir(e, arbol) {
        const exp1 = this.leftExpression.traducir(e, arbol);
        const exp2 = this.rigthExpression.traducir(e, arbol);
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (this.rigthExpression.tipo == tipo_1.TIPO.ARREGLO ||
            this.rigthExpression.tipo == tipo_1.TIPO.ARREGLO)
            return new excepcion_1.Excepcion("Semantico", "no se pueden comparar objetos ", super.fila + "", super.columna + "");
        if (this.leftExpression.tipo == tipo_1.TIPO.ARREGLO ||
            this.leftExpression.tipo == tipo_1.TIPO.ARREGLO)
            return new excepcion_1.Excepcion("Semantico", "no se pueden comparar objetos ", super.fila + "", super.columna + "");
        if (this.leftExpression.tipo == tipo_1.TIPO.NULL ||
            this.rigthExpression.tipo == tipo_1.TIPO.NULL)
            return new excepcion_1.Excepcion("Semantico", "variable NULL no se puede comparar ", super.fila + "", super.columna + "");
        //MENOR QUE
        //ENTERO < ENTERO
        if (this.leftExpression.tipo === tipo_1.TIPO.ENTERO &&
            this.rigthExpression.tipo === tipo_1.TIPO.ENTERO) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.return_tem(exp1, exp2);
        }
        //ENTERO < DECIMAL
        else if (this.leftExpression.tipo === tipo_1.TIPO.ENTERO &&
            this.rigthExpression.tipo === tipo_1.TIPO.DECIMAL) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.return_tem(exp1, exp2);
        }
        //DECIMAL < ENTERO
        else if (this.leftExpression.tipo === tipo_1.TIPO.DECIMAL &&
            this.rigthExpression.tipo === tipo_1.TIPO.ENTERO) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.return_tem(exp1, exp2);
        }
        //DECIMAL < DECIMAL
        else if (this.leftExpression.tipo === tipo_1.TIPO.DECIMAL &&
            this.rigthExpression.tipo === tipo_1.TIPO.DECIMAL) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.return_tem(exp1, exp2);
        }
        //BOOLEAN < BOOLEAN
        else if (this.leftExpression.tipo === tipo_1.TIPO.BOOLEAN &&
            this.rigthExpression.tipo === tipo_1.TIPO.BOOLEAN) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return this.return_tem(exp1, exp2);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("RELACIONAL");
        if (this.rigthExpression != null || this.rigthExpression != undefined) {
            nodo.agregarHijoNodo(this.leftExpression.getNodo());
            nodo.agregarHijo("<");
            nodo.agregarHijoNodo(this.rigthExpression.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("<");
            nodo.agregarHijoNodo(this.leftExpression.getNodo());
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
    return_tem(izq, der) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + "=" + izq + "<" + der + " ;\n";
        return t;
    }
}
exports.Menor = Menor;
