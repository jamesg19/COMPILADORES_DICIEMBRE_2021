"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identificador = void 0;
const Instruccion_1 = require("../abs/Instruccion");
const tipo_1 = require("../table/tipo");
const excepcion_1 = require("../table/excepcion");
const nodo_1 = require("../abs/nodo");
class Identificador extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        try {
            //obtenemos el tipo
            let simbol = entorno.getSimboloJ(this.id);
            if (simbol == undefined) {
                return new excepcion_1.Excepcion('Semantico', `La variable no existe ${this.id} `, `${this.fila}`, `${this.columna}`);
            }
            //establecemos el tipo
            this.tipo = simbol === null || simbol === void 0 ? void 0 : simbol.tipo;
            return simbol === null || simbol === void 0 ? void 0 : simbol.valor;
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", `Error al obtener valor de identificador `, `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ID");
        nodo.agregarHijo(this.id);
        return nodo;
    }
    traducir(entorno, arbol) {
        try {
            //obtenemos el tipo
            let simbol = entorno.getSimbolo(this.id);
            //establecemos el tipo
            this.tipo = simbol === null || simbol === void 0 ? void 0 : simbol.tipo;
            //return simbol?.valor;
            if (this.tipo == tipo_1.TIPO.ENTERO)
                this.tipo = tipo_1.TIPO.DECIMAL;
            //console.log("TIpo========",simbol?.tipo);
            return "stack[(int)" + (simbol === null || simbol === void 0 ? void 0 : simbol.posicion) + "]";
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", `Error al obtener valor de identificador `, `${this.fila}`, `${this.columna}`);
        }
    }
}
exports.Identificador = Identificador;
