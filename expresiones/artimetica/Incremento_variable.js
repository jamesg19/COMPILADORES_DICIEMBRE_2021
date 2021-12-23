"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementoVariable = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const primitivo_1 = require("../primitivo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class IncrementoVariable extends Instruccion_1.Instruccion {
    constructor(id, fila, columna) {
        super(fila, columna);
        this.id = id;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo_1.TIPO.NULL;
    }
    /**
     * INTERPRETA DECREMENTO
     * @param entorno
     * @param arbol
     * @returns
     */
    interpretar(entorno, arbol) {
        try {
            const simbol = entorno.getSimboloJ(this.id);
            //verifica que el simbolo exista
            if (simbol != null) {
                //verifica que sea tipo numero o decimal
                if (Number(simbol.getTipo() + "") === 0 || Number(simbol.getTipo() + "") === 1) {
                    //console.log(simbol.getValor()+" GET VALOR");
                    simbol.setValor(Number(simbol.getValor()) + 1);
                    //si el simbolo existe realizar el decremento
                    entorno.actualizarSimboloEnTabla(simbol);
                }
                else {
                    return new excepcion_1.Excepcion('Semantico', `La variable ${this.id} no existe para incremento`, `${this.fila}`, `${this.columna}`);
                }
            }
            else {
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter Incremento", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("INCREMENTO ++");
        nodo.agregarHijo(this.id);
        return nodo;
    }
    obtenerVal(tipo, val) {
        try {
            if (tipo === tipo_1.TIPO.ENTERO || tipo === tipo_1.TIPO.DECIMAL) {
                return Number(val);
            }
            else if (tipo === tipo_1.TIPO.BOOLEAN) {
                if (val.toLowerCase() === "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else if (tipo === tipo_1.TIPO.CADENA) {
                return val;
            }
            else {
                return val;
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en division`, `${this.fila}`, `${this.columna}`);
        }
    }
    traducir(entorno, arbol) {
        let variable = entorno.getSimbolo(this.id);
        if (!variable) {
            return new excepcion_1.Excepcion("Semantico", "No existe la variable " + this.id, super.fila + "", super.columna + "");
        }
        //verifico si es una constante
        if (variable.constante) {
            return new excepcion_1.Excepcion("Semantico", "No se puede cambiar de valor a una constante " + this.id, super.fila + "", super.columna + "");
        }
        const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.ENTERO, "1", this.fila, this.columna);
        let valor = primitivo.traducir(entorno, arbol);
        let value = JSON.parse(JSON.stringify(valor));
        if (valor instanceof Array) {
            // if(variable.valor instanceof Array){
            //   variable.valor = value;
            //   e.actualizarSimboloEnTabla(variable);
            //   return ;
            // }
            return new excepcion_1.Excepcion("Semantico", "Se esperaba almacenar un Arreglo dentro de un arreglo " + this.id, super.fila + "", super.columna + "");
        }
        //let value = JSON.parse(JSON.stringify(valor));
        console.log(primitivo.tipo + " -------------------------- " + variable.tipo);
        if (primitivo.tipo != variable.tipo)
            return new excepcion_1.Excepcion("Semantico", "Tipos diferentes " + this.id, super.fila + "", super.columna + "");
        if ((primitivo.tipo == tipo_1.TIPO.ENTERO || primitivo.tipo == tipo_1.TIPO.DECIMAL) &&
            (variable.tipo == tipo_1.TIPO.ENTERO || variable.tipo == tipo_1.TIPO.DECIMAL)) {
            if (true) {
                //Principal.historial += "/*Asignacion de variable: var += exp;*/\n"
                principal_1.Principal.historial += "stack[(int)" + variable.posicion + "] = stack[(int)" + variable.posicion + "] + " + valor + ";\n";
            }
            //   else {
            //       Principal.historial += "/*Asignacion de variable: var -= exp;*/"
            //       Principal.historial += "stack[(int)"+variable.posicion+"] = stack[(int)"+variable.posicion+"] - " + valor +";\n";
            //     }
            return "";
        }
        return new excepcion_1.Excepcion("Semantico", "Tipos diferentes " + this.id, super.fila + "", super.columna + "");
    }
}
exports.IncrementoVariable = IncrementoVariable;
