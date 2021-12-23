"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pop_List = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class Pop_List extends Instruccion_1.Instruccion {
    constructor(id, list_expresiones, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.list_expresiones = list_expresiones;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        let arr_value = entorno.getSimbolo(this.id);
        if (arr_value instanceof excepcion_1.Excepcion)
            return arr_value;
        if (!arr_value)
            return new excepcion_1.Excepcion("Semantico", "la variable '" + this.id + "' no existe ", "" + super.fila, "" + super.columna);
        if (!arr_value.arreglo)
            return new excepcion_1.Excepcion("Semantico", "la variable '" + this.id + "' no es un array ", "" + super.fila, "" + super.columna);
        // this.tipo = arr_value.tipo;
        // if(arr_value.valor instanceof Array){
        //     let last_value_array = arr_value.valor[arr_value.valor.length-1];
        //     arr_value.valor.pop();
        //     this.tipo = arr_value.tipo;
        //     return last_value_array
        // }
        let contador = this.list_expresiones.length;
        let temp = arr_value.valor; //:any = undefined;
        let value_return;
        //if (contador == 1) temp = arr_value?.valor;
        this.list_expresiones.forEach((x) => {
            let index = x.interpretar(entorno, arbol);
            if (index instanceof excepcion_1.Excepcion)
                return index;
            if (!(x.tipo == tipo_1.TIPO.ENTERO))
                return new excepcion_1.Excepcion("Semantico", "Se esperaba una expresion numerica", super.fila + "", super.columna + "");
            contador--;
            if (contador == 0) {
                if (temp instanceof Array) {
                    if (index < 0 || index > temp.length)
                        return (value_return = new excepcion_1.Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna));
                    value_return = (temp[index])[temp[index].length - 1];
                    temp[index].pop();
                    this.tipo = arr_value.tipo;
                    return value_return;
                }
                return (value_return = new excepcion_1.Excepcion("Semantico", "El indice indicado para " + this.id + " debe ser un arreglo", "" + super.fila, "" + super.columna));
            }
            else {
                this.tipo = arr_value.tipo;
                temp = temp[index];
            }
        });
        return value_return;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("POP LIST");
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
exports.Pop_List = Pop_List;
