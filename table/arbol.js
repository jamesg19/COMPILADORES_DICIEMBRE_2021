"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = void 0;
class Arbol {
    constructor(TSglobal, instrucciones) {
        this.consola = "";
        this.excepciones =
            this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
    }
}
exports.Arbol = Arbol;