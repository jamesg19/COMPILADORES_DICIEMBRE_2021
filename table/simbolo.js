"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Simbolo = void 0;
class Simbolo {
    /**
     * @param  {string} id
     * @param  {TIPO} tipo
     * @param  {number} fila
     * @param  {number} columna
     * @param  {any} valor
     * @param  {boolean} arreglo
     * @param  {boolean} struct
     */
    constructor(id, tipo, fila, columna, valor, arreglo, struct) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        this.arreglo = arreglo;
        this.valor = valor; //arreglo? JSON.parse(JSON.stringify(valor)):valor;
        this.struct = struct;
        this.constante = false;
    }
    /**
     */
    getID() {
        return this.id;
    }
    /**
     * @param  {string} id
     */
    setID(id) {
        this.id = id;
    }
    /**
     */
    getTipo() {
        return this.tipo;
    }
    /**
     * @param  {TIPO} tipo
     */
    setTipo(tipo) {
        this.tipo = tipo;
    }
    /**
     */
    getValor() {
        return this.valor;
    }
    /**
     * @param  {any} valor
     */
    setValor(valor) {
        this.valor = valor;
    }
    /**
     */
    getArreglo() {
        return this.arreglo;
    }
    /**
     */
    getStruct() {
        return this.struct;
    }
}
exports.Simbolo = Simbolo;
