"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.And = void 0;
const excepcion_1 = require("../../table/excepcion");
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class And extends Instruccion_1.Instruccion {
    /**
     * @param  {Primitivo} leftExpressio
     * @param  {Primitivo} rightExpression
     * @param  {number} linea
     * @param  {number} columna
     */
    constructor(leftExpressio, rightExpression, linea, columna) {
        super(linea, columna);
        this.rightExpression = rightExpression;
        this.leftExpressio = leftExpressio;
        this.tipo = tipo_1.TIPO.NULL;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        const exp1 = this.leftExpressio.interpretar(entorno, arbol);
        const exp2 = this.rightExpression.interpretar(entorno, arbol);
        //comprobacion de errores
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (this.leftExpressio.tipo === tipo_1.TIPO.BOOLEAN && this.rightExpression.tipo == tipo_1.TIPO.BOOLEAN) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return exp1 && exp2;
        }
        console.log("ERROR EN && ");
        return new excepcion_1.Excepcion("Semantico", "Se requiere un tipo Boolean ", super.fila + "", super.columna + "");
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
        const nodo = new nodo_1.NodoAST("LOGICA");
        if ((this.rightExpression != null) || (this.rightExpression != undefined)) {
            nodo.agregarHijoNodo(this.leftExpressio.getNodo());
            nodo.agregarHijo(" AND");
            nodo.agregarHijoNodo(this.rightExpression.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("AND");
            nodo.agregarHijoNodo(this.leftExpressio.getNodo());
            return nodo;
        }
    }
    traducir(entorno, arbol) {
        const exp1 = this.leftExpressio.traducir(entorno, arbol);
        const exp2 = this.rightExpression.traducir(entorno, arbol);
        //comprobacion de errores
        if (exp1 instanceof excepcion_1.Excepcion)
            return exp1;
        if (exp2 instanceof excepcion_1.Excepcion)
            return exp2;
        if (this.leftExpressio.tipo === tipo_1.TIPO.BOOLEAN && this.rightExpression.tipo == tipo_1.TIPO.BOOLEAN) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            let temp = principal_1.Principal.temp;
            temp++;
            let t = "t" + temp;
            principal_1.Principal.historial += t + " = " + exp1 + " && " + exp2 + ";\n";
            principal_1.Principal.temp = temp;
            return t;
        }
        console.log("ERROR EN && ");
        return new excepcion_1.Excepcion("Semantico", "Se requiere un tipo Boolean ", super.fila + "", super.columna + "");
    }
}
exports.And = And;
