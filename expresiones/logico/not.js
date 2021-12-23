"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Not = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Not extends Instruccion_1.Instruccion {
    /**
     * @param  {Primitivo} expression
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(expression, fila, columna) {
        super(fila, columna);
        this.expression = expression;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        const expression1 = this.expression.interpretar(entorno, arbol);
        if (expression1 === undefined || expression1 == null)
            return new excepcion_1.Excepcion("Semantico", "No se puede negar, indefinido", super.fila + "", super.columna + "");
        if (expression1 instanceof excepcion_1.Excepcion)
            return expression1;
        if (this.expression.tipo === tipo_1.TIPO.BOOLEAN) {
            this.tipo = tipo_1.TIPO.BOOLEAN;
            return !expression1;
        }
        return new excepcion_1.Excepcion("Semantico", "Se requiere un tipo Boolean ", super.fila + "", super.columna + "");
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("LOGICA");
        nodo.agregarHijo("NOT");
        nodo.agregarHijoNodo(this.expression.getNodo());
        return nodo;
    }
    traducir(entorno, arbol) {
        const expression1 = this.expression.traducir(entorno, arbol);
        if (expression1 === undefined || expression1 == null)
            return new excepcion_1.Excepcion("Semantico", "No se puede negar, indefinido", super.fila + "", super.columna + "");
        if (expression1 instanceof excepcion_1.Excepcion)
            return expression1;
        if (this.expression.tipo === tipo_1.TIPO.BOOLEAN) {
            let temp = principal_1.Principal.temp;
            temp++;
            let t = "t" + temp;
            let value = (expression1 == true) ? 0 : 1;
            principal_1.Principal.temp = temp;
            principal_1.Principal.historial += t + " = " + value + ";\n";
            return t;
        }
        console.log("ERROR EN !  not");
        return new excepcion_1.Excepcion("Semantico", "Se requiere un tipo Boolean ", super.fila + "", super.columna + "");
    }
}
exports.Not = Not;
