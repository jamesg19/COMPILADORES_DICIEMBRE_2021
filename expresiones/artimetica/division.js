"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Division = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Division extends Instruccion_1.Instruccion {
    constructor(operador, operadorIzq, operadorDer, fila, columna) {
        super(fila, columna);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.fila = fila;
        this.columna = columna;
        this.operador = operador;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        try {
            const izq = this.operadorIzq.interpretar(entorno, arbol);
            const der = this.operadorDer.interpretar(entorno, arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            if (this.operadorDer != null || this.operadorDer != undefined) {
                if (der instanceof excepcion_1.Excepcion) {
                    return der;
                }
            }
            //--------------------------DIVISION------------------------------
            if (this.operador === 3 /* DIV */) {
                //validaciones
                if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //verifica que el DENOMINADOR SEA MAYOR A > 0 
                if (this.obtenerVal(this.operadorDer.tipo, der) > 0) {
                    //-------ENTERO
                    //ENTERO / ENTERO
                    if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                        this.tipo = tipo_1.TIPO.DECIMAL;
                        return this.obtenerVal(this.operadorIzq.tipo, izq) / this.obtenerVal(this.operadorDer.tipo, der);
                    }
                    //ENTERO / DECIMAL
                    else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                        this.tipo = tipo_1.TIPO.DECIMAL;
                        return this.obtenerVal(this.operadorIzq.tipo, izq) / this.obtenerVal(this.operadorDer.tipo, der);
                    }
                    ////--------DECIMAL
                    //DECIMAL / ENTERO
                    else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                        this.tipo = tipo_1.TIPO.DECIMAL;
                        return this.obtenerVal(this.operadorIzq.tipo, izq) / this.obtenerVal(this.operadorDer.tipo, der);
                    }
                    //DECIMAL / DECIMAL
                    else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                        this.tipo = tipo_1.TIPO.DECIMAL;
                        return this.obtenerVal(this.operadorIzq.tipo, izq) / this.obtenerVal(this.operadorDer.tipo, der);
                    }
                }
                else {
                    return new excepcion_1.Excepcion("Semantico", `Math Error no es posible dividir sobre 0 `, `${this.fila}`, `${this.columna}`);
                }
                return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para division ${this.operadorIzq.tipo} / ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter division", `${this.fila}`, `${this.columna}`);
        }
    }
    traducir(entorno, arbol) {
        try {
            const izq = this.operadorIzq.traducir(entorno, arbol);
            const der = this.operadorDer.traducir(entorno, arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            if (this.operadorDer != null || this.operadorDer != undefined) {
                if (der instanceof excepcion_1.Excepcion) {
                    return der;
                }
            }
            //validaciones
            if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //ENTERO / ENTERO
            if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) / this.obtenerVal(this.operadorDer.tipo,der);
            }
            //ENTERO / DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) / this.obtenerVal(this.operadorDer.tipo,der);
            }
            ////--------DECIMAL
            //DECIMAL / ENTERO
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) / this.obtenerVal(this.operadorDer.tipo,der);
            }
            //DECIMAL / DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) / this.obtenerVal(this.operadorDer.tipo,der);
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para division ${this.operadorIzq.tipo} / ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Pointer Exception Division", `${this.fila}`, `${this.columna}`);
        }
    }
    setAtributosC3D(izquierda, derecha) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + " = " + izquierda + " / " + derecha + ";";
        principal_1.Principal.historial += "\n";
        this.tipo = tipo_1.TIPO.DECIMAL;
        return t;
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ARITMETICA");
        if ((this.operadorDer != null) || (this.operadorDer != undefined)) {
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
            nodo.agregarHijo("/");
            nodo.agregarHijoNodo(this.operadorDer.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("/");
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
            return nodo;
        }
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
}
exports.Division = Division;
