"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arreglo = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Arreglo extends Instruccion_1.Instruccion {
    /**
     * @param  {string} id
     * @param  {TIPO} tipo
     * @param  {TIPO} t_esperado
     * @param  {number} corchete
     */
    constructor(tipo, id, lst_expresiones, t_esperado, corchete, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.lst_expresiones = lst_expresiones;
        this.tipo = tipo;
        this.t_esperado = t_esperado;
        this.corchete = corchete;
    }
    /**para array's de tipo int[] a = [lista_expresion]
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        let value_array = [];
        this.lst_expresiones.forEach((x) => {
            let result_value;
            if (x instanceof Instruccion_1.Instruccion) {
                result_value = x.interpretar(entorno, arbol);
                if (x.tipo != this.tipo) {
                    console.log("x.tipo != this.tipo", x.tipo != this.tipo, x.tipo, this.tipo);
                    return new excepcion_1.Excepcion("Semantico", "Se esta asigando un tipo de valor inesperado", "" + super.fila, "" + this.columna);
                }
            }
            else {
                result_value = this.copyExpDeep(entorno, arbol, x);
            }
            if (result_value instanceof excepcion_1.Excepcion)
                return result_value;
            let value = JSON.parse(JSON.stringify(result_value));
            if (value instanceof excepcion_1.Excepcion)
                return value;
            value_array.push(value);
        });
        let value_object = JSON.parse(JSON.stringify(value_array));
        let simbolo = new simbolo_1.Simbolo(this.id, this.tipo, super.fila, super.columna, value_object, true, false);
        entorno.addSimbolo(simbolo);
    }
    copyExpDeep(entorno, arbol, element) {
        let value_array = [];
        let result_value;
        element.forEach((x) => {
            if (!(x instanceof Instruccion_1.Instruccion)) {
                result_value = this.copyExpDeep(entorno, arbol, x);
            }
            else {
                result_value = x.interpretar(entorno, arbol);
                if (x.tipo != this.tipo) {
                    return new excepcion_1.Excepcion("Semantico", "Se esta asigando un tipo de valor inesperado", "" + super.fila, "" + this.columna);
                }
            }
            if (result_value instanceof excepcion_1.Excepcion)
                return result_value;
            let value = JSON.parse(JSON.stringify(result_value));
            if (value instanceof excepcion_1.Excepcion)
                return value;
            value_array.push(value);
        });
        return value_array;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("DECLARACION ARRAY");
        const lista_expresiones = new nodo_1.NodoAST("LISTA EXPRESION");
        if (this.tipo == tipo_1.TIPO.ARREGLO) {
            nodo.agregarHijo("ARREGLO");
        }
        else if (this.tipo == tipo_1.TIPO.BOOLEAN) {
            nodo.agregarHijo("BOOLEAN");
        }
        else if (this.tipo == tipo_1.TIPO.CADENA) {
            nodo.agregarHijo("CADENA");
        }
        else if (this.tipo == tipo_1.TIPO.CARACTER) {
            nodo.agregarHijo("CARACTER");
        }
        else if (this.tipo == tipo_1.TIPO.DECIMAL) {
            nodo.agregarHijo("DECIMAL");
        }
        else if (this.tipo == tipo_1.TIPO.ENTERO) {
            nodo.agregarHijo("ENTERO");
        }
        else if (this.tipo == tipo_1.TIPO.NULL) {
            nodo.agregarHijo("NULL");
        }
        else if (this.tipo == tipo_1.TIPO.STRUCT) {
            nodo.agregarHijo("STRUCT");
        }
        else if (this.tipo == tipo_1.TIPO.VOID) {
            nodo.agregarHijo("VOID");
        }
        nodo.agregarHijo(this.id);
        if (this.lst_expresiones != null || this.lst_expresiones != undefined) {
            this.lst_expresiones.forEach((element) => {
                lista_expresiones.agregarHijoNodo(element.getNodo());
            });
            nodo.agregarHijoNodo(lista_expresiones);
        }
        return nodo;
    }
    traducir(entorno, arbol) {
        principal_1.Principal.addComentario("Declarando Arreglos");
        let value_array = [];
        let temp = principal_1.Principal.temp;
        temp++;
        let th_position = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial +=
            th_position +
                "= H; //Posicion inicial que ocupara el array en  el heap\n";
        let contador = 0;
        this.lst_expresiones.forEach((x) => {
            let result_value;
            if (x.tipo != tipo_1.TIPO.CADENA)
                result_value = x.traducir(entorno, arbol);
            if (x.tipo != this.tipo) {
                console.log("x.tipo != this.tipo", x.tipo != this.tipo, x.tipo, this.tipo);
                return new excepcion_1.Excepcion("Semantico", "Se esta asigando un tipo de valor inesperado", "" + super.fila, "" + this.columna);
            }
            //verificar si es una cadena
            if (x.tipo == tipo_1.TIPO.CADENA) {
                this.transform_cadena(x.value, contador);
                contador--;
            }
            else {
                //let value = JSON.parse(JSON.stringify(result_value));
                principal_1.Principal.historial += "heap[(int) H] = " + result_value + ";\n";
                principal_1.Principal.historial += "H = H + 1;\n";
            }
        });
        let value_object = JSON.parse(JSON.stringify(value_array));
        let simbolo = new simbolo_1.Simbolo(this.id, this.tipo, super.fila, super.columna, value_object, true, false);
        entorno.addSimbolo(simbolo);
        principal_1.Principal.addComentario("Agregando referencia del heap en el stack");
        principal_1.Principal.historial += "heap[(int) H] = " + -1 + ";\n";
        principal_1.Principal.historial += "H = H + 1;\n";
        let temp1 = principal_1.Principal.temp;
        temp1++;
        principal_1.Principal.temp = temp1;
        let ts = "t" + temp1;
        principal_1.Principal.historial += ts + " = " + simbolo.posicion + ";\n";
        principal_1.Principal.addComentario("simbolo posicion " + simbolo.posicion);
        principal_1.Principal.historial += "stack[(int) " + simbolo.posicion + "] = " + th_position + ";\n";
        principal_1.Principal.addComentario("Fin De La De");
    }
    transform_cadena(x, contador) {
        let return_string = "";
        principal_1.Principal.addComentario("Pasando cadena al heap , '" + x + "'");
        if (!x)
            x = "Undefined";
        for (let i = 0; i < x.length; i++) {
            let item = x.charCodeAt(i);
            return_string += "heap[(int)H] = " + item + " ;\n";
            return_string += "H = H + 1;\n";
            //console.log(item);
        }
        return_string += "heap[(int)H] = -1;\n";
        return_string += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        //Principal.posicion;
        //let temp2 = Principal.posicion+1+"";
        //return_string +="stack[(int)"+(temp2)+"] = " +t+";\n";
        principal_1.Principal.historial += return_string;
        principal_1.Principal.addComentario("Fin de pasar cadena al heap");
        //"t" + Principal.temp + " = P + " + Principal.posicion + ";\n";
        //return //temp2;
    }
}
exports.Arreglo = Arreglo;
