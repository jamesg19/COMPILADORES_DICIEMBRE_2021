"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso_Struct = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
const acceso_1 = require("../array/acceso");
class Acceso_Struct extends Instruccion_1.Instruccion {
    constructor(id, ids, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.ids = ids;
        this.exist = false;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        let sim_struct = entorno.getSimbolo(this.id);
        if (!sim_struct)
            return new excepcion_1.Excepcion("Semantico", "No se encontro " + this.id, this.fila + "", this.columna + "");
        if (!(sim_struct instanceof simbolo_1.Simbolo))
            return new excepcion_1.Excepcion("Error Interno", "v8 is update", this.fila + "", this.columna + "");
        if ((sim_struct === null || sim_struct === void 0 ? void 0 : sim_struct.tipo) != tipo_1.TIPO.STRUCT)
            return new excepcion_1.Excepcion("Semantico", "Se requiere un Struct para " + this.id, this.fila + "", this.columna + "");
        let contador = this.ids.length;
        let temp = sim_struct; //guardo la estructura en un temporal
        // console.log("temp", temp)
        let value_return;
        //let value_return =new Excepcion("Semantico",this.ids[this.ids.length-1]+" no se encontro en "+this.id,this.fila+"",this.columna+"");
        this.ids.forEach((x) => {
            if (temp.valor instanceof Map) {
                if (temp.valor.has(x) && contador == 1) {
                    let simbolo = Object.setPrototypeOf(temp.valor.get(x), simbolo_1.Simbolo.prototype);
                    if (simbolo instanceof simbolo_1.Simbolo) {
                        value_return = temp.valor.get(x); //simbolo
                    }
                }
                else if (x instanceof acceso_1.Acceso) {
                    let id_arr = x.id;
                    let lst_exp = x.list_expresiones;
                    if (!temp.valor.has(id_arr)) {
                        return new excepcion_1.Excepcion("Semantico", "Struct no tiene " + id_arr, super.fila + "", super.columna + "");
                    }
                    // if(!((temp.valor.get(id_arr) instanceof Array))){
                    //   return new Excepcion("Semantico", id_arr+" No es un arreglo",super.fila+"",super.columna+"");
                    // }
                    let temp_arr = temp.valor.get(id_arr).valor;
                    let contador = lst_exp.length;
                    //if (contador != 1) temp_arr = 
                    lst_exp.forEach((xx) => {
                        let index = xx.interpretar(entorno, arbol);
                        if (index instanceof excepcion_1.Excepcion)
                            return index;
                        contador--;
                        if (contador == 0) {
                            if (temp_arr instanceof Array) {
                                if (index < 0 || index > temp_arr.length)
                                    return value_return = new excepcion_1.Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);
                                return value_return = JSON.parse(JSON.stringify(temp_arr[parseInt(index)]));
                            }
                            //this.tipo = exist.tipo;
                            return value_return = JSON.parse(JSON.stringify(temp_arr[parseInt(index)]));
                        }
                        else {
                            temp_arr = (temp_arr)[index];
                        }
                    });
                }
                return value_return; //value_return =  temp.valor.get(x).valor;
                //temp = temp.valor.get(x);
            }
            contador -= 1;
            //return new Excepcion("Semantico",x+" no se encontro en "+this.id,this.fila+"",this.columna+"");
        });
        return value_return;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ACCESO STRUCT");
        nodo.agregarHijo(this.id);
        const acceso = new nodo_1.NodoAST("IDS");
        if (this.ids != null || this.ids != undefined) {
            this.ids.forEach((instr) => {
                acceso.agregarHijo(instr);
            });
            nodo.agregarHijoNodo(acceso);
        }
        return nodo;
    }
}
exports.Acceso_Struct = Acceso_Struct;
