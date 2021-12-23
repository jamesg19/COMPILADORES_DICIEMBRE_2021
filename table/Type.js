"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const simbolo_1 = require("./simbolo");
class Type {
    /**
     * @param  {string} id
     * @param  {Map<String} atributos
     * @param  {} Simbolo>
     */
    constructor(id, atributos) {
        this.id = id;
        this.atributos = atributos;
        Object.assign(this, { id, atributos });
    }
    /**
     * @param  {string} id
     */
    hasAtributo(id) {
        return this.atributos.has(id);
    }
    /**
     * @param  {string} id
     * @returns Simbolo
     */
    getAtributo(id) {
        //return this.atributos.get(id);
        return this.atributos.get(id);
    }
    /**
     * @param  {Simbolo} variable
     */
    setAtributo(variable) {
        this.atributos.set(variable.id, variable);
    }
    /**
     * @returns string
     */
    toString() {
        let salida = '{';
        let i = 0;
        const size = this.atributos.size - 1;
        for (let [key, value] of this.atributos) {
            salida += `${key}: `;
            if (value instanceof simbolo_1.Simbolo) {
                salida += `${value.valor}`;
            }
            else {
                salida += `${value}`;
            }
            if (i != size) {
                salida += ', ';
            }
            i++;
        }
        salida += '}';
        return salida;
    }
    /**
     * @returns String
     */
    getSalidaBase() {
        let salida = `${this.id} = {`;
        let i = 0;
        const size = this.atributos.size - 1;
        for (let [key, value] of this.atributos) {
            salida += `${key}`;
            if (i != size) {
                salida += ', ';
            }
            i++;
        }
        salida += '}';
        return salida;
    }
}
exports.Type = Type;
