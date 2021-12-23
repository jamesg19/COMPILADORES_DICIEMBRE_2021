"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modificar = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Modificar extends Instruccion_1.Instruccion {
    /**
     * @param  {string} id
     * @param  {Instruccion[]} list_expresiones
     * @param  {Instruccion} exp
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(id, list_expresiones, exp, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.list_expresiones = list_expresiones;
        this.exp = exp;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        let exist = entorno.getSimbolo(this.id); //verifico que exista la variable
        if (!exist)
            return new excepcion_1.Excepcion("Semantico", "No se encontro " + this.id, super.fila + "", super.columna + "");
        if (!exist.arreglo)
            //verifico que sea un arreglo
            new excepcion_1.Excepcion("Semantico", "No es un arragle " + this.id, super.fila + "", super.columna + "");
        let value_exp = this.exp.interpretar(entorno, arbol);
        if (value_exp instanceof excepcion_1.Excepcion)
            return value_exp; //verifico la expresion
        if (!(exist.tipo == this.exp.tipo))
            return new excepcion_1.Excepcion("Semantico", "No coinciden los tipos " + this.id, super.fila + "", super.columna + "");
        let contador = this.list_expresiones.length;
        let temp;
        if (contador == 1)
            temp = (exist === null || exist === void 0 ? void 0 : exist.valor);
        this.list_expresiones.forEach((x) => {
            let index = x.interpretar(entorno, arbol);
            if (index instanceof excepcion_1.Excepcion)
                return index;
            if (!(x.tipo == tipo_1.TIPO.ENTERO))
                return new excepcion_1.Excepcion("Semantico", "Se esperaba una expresion numerica", super.fila + "", super.columna + "");
            contador--;
            if ((contador == 0)) {
                let val = JSON.parse(JSON.stringify(value_exp));
                if ((exist === null || exist === void 0 ? void 0 : exist.valor) instanceof Array)
                    (temp)[index] = val;
            }
            else {
                temp = (exist === null || exist === void 0 ? void 0 : exist.valor)[index];
            }
        });
    }
    modificarIndex(lst, valor, entorno, arbol) {
        this.lst.forEach((x) => {
            let index = x.interpretar(entorno, arbol);
            if (index instanceof excepcion_1.Excepcion)
                return index;
            if (!(x.tipo == tipo_1.TIPO.ENTERO))
                return new excepcion_1.Excepcion("Semantico", "Se esperaba una expresion numerica", super.fila + "", super.columna + "");
            let val = JSON.parse(JSON.stringify(value_exp));
            if ((exist === null || exist === void 0 ? void 0 : exist.valor) instanceof Array)
                (exist === null || exist === void 0 ? void 0 : exist.valor)[index] = val;
        });
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("MODIFICAR ARRAY");
        nodo.agregarHijo(this.id);
        const pos = new nodo_1.NodoAST("POSICION");
        if (this.list_expresiones != null || this.list_expresiones != undefined) {
            this.list_expresiones.forEach((element) => {
                pos.agregarHijoNodo(element.getNodo());
            });
            nodo.agregarHijoNodo(pos);
        }
        return nodo;
    }
}
exports.Modificar = Modificar;
