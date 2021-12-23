"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Push_List = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
class Push_List extends Instruccion_1.Instruccion {
    constructor(id, list_expresiones, exp, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.exp = exp;
        this.list_expresiones = list_expresiones;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        let exp_value = this.exp.interpretar(entorno, arbol);
        if (exp_value instanceof excepcion_1.Excepcion)
            return exp_value;
        let arr_value = entorno.getSimbolo(this.id);
        //if (arr_value.tipo != this.exp.tipo) return new Excepcion("Semantico","No coinciden los tipos", super.fila+"",super.columna+"");
        if (arr_value instanceof excepcion_1.Excepcion)
            return arr_value;
        if (!arr_value)
            return new excepcion_1.Excepcion("Semantico", "la variable" + this.id + " no existe ", "" + super.fila, "" + super.columna);
        if (arr_value.tipo)
            return new excepcion_1.Excepcion("Semantico", "la variable" + this.id + " no es un array ", "" + super.fila, "" + super.columna);
        // this.tipo = arr_value.tipo;   
        // if(arr_value.valor instanceof Array){ 
        //     arr_value.valor.push(exp_value);
        //     //return last_value_array
        //     this.tipo = TIPO.BOOLEAN;
        //     return true;
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
                if (temp[index] instanceof Array) {
                    if (index < 0 || index > temp.length)
                        return (value_return = new excepcion_1.Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna));
                    temp[index].push(exp_value);
                    this.tipo = arr_value === null || arr_value === void 0 ? void 0 : arr_value.tipo;
                    return value_return = true;
                }
                return (value_return = new excepcion_1.Excepcion("Semantico", "El indice indicado para " + this.id + " debe ser un arreglo", "" + super.fila, "" + super.columna));
            }
            else {
                this.tipo = arr_value.tipo;
                temp = temp[index];
            }
        });
        this.tipo = tipo_1.TIPO.NULL;
        return value_return;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("PUSH LIST");
        nodo.agregarHijo(this.id);
        const pos = new nodo_1.NodoAST("POSICION");
        if (this.list_expresiones != null || this.list_expresiones != undefined) {
            this.list_expresiones.forEach((element) => {
                pos.agregarHijoNodo(element.getNodo());
            });
            nodo.agregarHijoNodo(pos);
        }
        nodo.agregarHijoNodo(this.exp.getNodo());
        return nodo;
    }
}
exports.Push_List = Push_List;
