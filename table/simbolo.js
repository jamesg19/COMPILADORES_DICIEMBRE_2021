"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    constructor(id, tipo, fila, columna, valor, arreglo, struct) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
        this.arreglo = arreglo;
        this.struct = struct;
        this.constante = false;
    }
    getID() {
        return this.id;
    }
    setID(id) {
        this.id = id;
    }
    getTipo() {
        return this.tipo;
    }
    setTipo(tipo) {
        this.tipo = tipo;
    }
    getValor() {
        return this.valor;
    }
    setValor(valor) {
        this.valor = valor;
    }
    getArreglo() {
        return this.arreglo;
    }
    getStruct() {
        return this.struct;
    }
}
exports.Simbolo = Simbolo;
