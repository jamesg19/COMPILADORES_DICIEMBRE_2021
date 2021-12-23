"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Acceso extends Instruccion_1.Instruccion {
    /**
     * @param  {string} id
     * @param  {Instruccion[]} list_expresiones
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(id, list_expresiones, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.list_expresiones = list_expresiones;
        this.tipo = tipo_1.TIPO.NULL;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        let exist = entorno.getSimbolo(this.id); //verifico que exista la variable
        if (!exist)
            return new excepcion_1.Excepcion("Semantico", "No se encontro " + this.id, super.fila + "", super.columna + "");
        if (!exist.arreglo)
            //verifico que sea un arreglo
            new excepcion_1.Excepcion("Semantico", "No es un arragle " + this.id, super.fila + "", super.columna + "");
        let contador = this.list_expresiones.length;
        let temp = (exist.valor);
        let value_return;
        this.tipo = exist.tipo;
        if (contador == 1)
            temp = exist === null || exist === void 0 ? void 0 : exist.valor;
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
                        return value_return = new excepcion_1.Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);
                    return value_return = JSON.parse(JSON.stringify(temp[parseInt(index)]));
                }
                this.tipo = exist.tipo;
                value_return = JSON.parse(JSON.stringify(temp));
                //if()
                //value_return = new Excepcion("Semantico","no existe el indice indicado para el arreglo "+this.id,""+super.fila,""+super.columna);
                //return (value_return = JSON.parse(JSON.stringify(temp[index])));
            }
            else {
                this.tipo = exist.tipo;
                temp = (temp)[index];
            }
        });
        return value_return;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ACCESO");
        nodo.agregarHijo(this.id);
        const lista_expresiones = new nodo_1.NodoAST("LISTA EXPRESIONES");
        if (this.list_expresiones != null || this.list_expresiones != undefined) {
            this.list_expresiones.forEach((instr) => {
                lista_expresiones.agregarHijoNodo(instr.getNodo());
            });
            nodo.agregarHijoNodo(lista_expresiones);
        }
        return nodo;
    }
    traducir(entorno, arbol) {
        let exist = entorno.getSimbolo(this.id); //verifico que exista la variable
        if (!exist)
            return new excepcion_1.Excepcion("Semantico", "No se encontro " + this.id, super.fila + "", super.columna + "");
        if (!exist.arreglo)
            //verifico que sea un arreglo
            new excepcion_1.Excepcion("Semantico", "No es un arragle " + this.id, super.fila + "", super.columna + "");
        let contador = this.list_expresiones.length;
        let temp = (exist.valor);
        let value_return;
        this.tipo = exist.tipo;
        if (contador == 1)
            temp = exist === null || exist === void 0 ? void 0 : exist.valor;
        this.list_expresiones.forEach((x) => {
            let index = x.traducir(entorno, arbol);
            if (index instanceof excepcion_1.Excepcion)
                return index;
            if (!(x.tipo == tipo_1.TIPO.ENTERO))
                return new excepcion_1.Excepcion("Semantico", "Se esperaba una expresion numerica", super.fila + "", super.columna + "");
            principal_1.Principal.addComentario("Accediendo a un Arreglo");
            let temp = principal_1.Principal.temp;
            temp++;
            let t = "t" + temp;
            principal_1.Principal.temp = temp;
            Acceso.ACCCESO = true;
            principal_1.Principal.historial += "stack[(int)" + (principal_1.Principal.posicion + 1) + "] = " + exist.posicion + ";\n";
            principal_1.Principal.historial += "stack[(int)" + (principal_1.Principal.posicion + 2) + "] = " + index + ";\n";
            principal_1.Principal.historial += "P = " + (principal_1.Principal.posicion + 1) + ";\n";
            principal_1.Principal.historial += "acces();\n";
            principal_1.Principal.historial += t + " = P;\nprintString();\n";
            value_return = t + "/* esta es la referencia del heap*/";
            // contador--;
            // if (contador == 0) {
            //   if (temp instanceof Array) {
            //     if (index < 0 || index > temp.length)
            //       return value_return = new Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);
            //     return value_return = JSON.parse(JSON.stringify(temp[parseInt(index)]));
            //   }
            //   this.tipo = exist.tipo;
            //   value_return = JSON.parse(JSON.stringify(temp));
            //   //if()
            //   //value_return = new Excepcion("Semantico","no existe el indice indicado para el arreglo "+this.id,""+super.fila,""+super.columna);
            //   //return (value_return = JSON.parse(JSON.stringify(temp[index])));
            // } else {
            //   this.tipo = exist.tipo;
            //   temp = (temp)[index];
            // }
        });
        return value_return;
        //return value_return;
    }
}
exports.Acceso = Acceso;
Acceso.ACCCESO = false;
