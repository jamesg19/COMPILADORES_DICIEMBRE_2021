"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asignacion_VAR_STRUCT = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Asignacion_VAR_STRUCT extends Instruccion_1.Instruccion {
    /**
     * @param  {string} id
     * @param  {Acceso_Struct} acceso
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(id, acceso, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.acceso = acceso;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        let value = this.id.interpretar(entorno, arbol); //entorno.getSimbolo(this.id);
        if (value instanceof excepcion_1.Excepcion)
            return value;
        if (!value)
            return new excepcion_1.Excepcion("Semantico", "No existe la variable " + this.id, this.fila + "", this.columna + "");
        let acceso_value = this.acceso.interpretar(entorno, arbol);
        if (acceso_value instanceof excepcion_1.Excepcion)
            return acceso_value;
        if (!(acceso_value instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Semantico", "error en el valor de struct ", this.fila + "", this.columna + "");
        if ((this.id.tipo == tipo_1.TIPO.ENTERO || this.id.tipo == tipo_1.TIPO.DECIMAL) && (acceso_value.tipo == tipo_1.TIPO.ENTERO || acceso_value.tipo == tipo_1.TIPO.DECIMAL)) {
            acceso_value.valor = Number(value);
        }
        else if (acceso_value.tipo != this.id.tipo)
            return new excepcion_1.Excepcion("Semantico", "error en el valor de struct ", this.fila + "", this.columna + "");
        // console.log(acceso_value);
        //value.valor = acceso_value.valor;
        acceso_value.valor = value;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ASIGNACION VAR STRUCT");
        nodo.agregarHijo(this.acceso.id);
        nodo.agregarHijoNodo(this.id.getNodo());
        return nodo;
    }
}
exports.Asignacion_VAR_STRUCT = Asignacion_VAR_STRUCT;
