"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atributo = void 0;
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Atributo {
    constructor(id, tipo, arreglo, fila, columna) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        //this.valor = valor;
        this.arreglo = arreglo;
        //this.struct = struct;
        this.constante = false;
        this.valor = null;
        this.struct = (tipo == tipo_1.TIPO.STRUCT) ? true : false;
    }
    toString() {
        return "hola";
        // let value:string  = this.valor;
        // if(this.struct){
        //     value = "";
        //     value = this.name_struct + "( ";
        //     console.log()
        //       if (this.valor instanceof Map) {
        //         //sim.valor.map((x)=> console.log(x));
        //         this.valor.forEach((x) => {
        //             //if(x instanceof Simbolo)
        //             value += x.id+ " = "+x.valor+", ";//x.toString()//x();
        //         });
        //         value = value.slice(0, value.length - 2);
        //         value += " )";
        //       }
        //     //else if(this.valor instanceof )
        // }
        // return value;
    }
    interpretar(entorno, arbol) {
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ATRIBUTO");
        nodo.agregarHijo(this.id);
        return nodo;
    }
}
exports.Atributo = Atributo;
