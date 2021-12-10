"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = void 0;
class Arbol {
    /**
     * @param  {TablaSimbolos} TSglobal
     * @param  {Instruccion[]} instrucciones
     */
    constructor(TSglobal, instrucciones) {
        this.consola = "";
        this.excepciones =
            this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
    }
    updateConsolaError(texto) {
        this.consola += texto + '\n';
    }
    /**
     * @param  {string} nombre
     * @returns Funcion
     */
    getFunctionByName(nombre) {
        let funcion;
        this.funciones.forEach((x) => {
            if (x.id === nombre)
                funcion = x;
        });
        return funcion;
    }
}
exports.Arbol = Arbol;
