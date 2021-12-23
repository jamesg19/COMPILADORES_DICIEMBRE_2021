"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resta = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Resta extends Instruccion_1.Instruccion {
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
            //--------------------------RESTA------------------------------
            if (this.operador === 1 /* MENOS */) {
                //validaciones
                if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO - ENTERO
                if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - this.obtenerVal(this.operadorDer.tipo, der);
                }
                //ENTERO - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - this.obtenerVal(this.operadorDer.tipo, der);
                }
                //ENTERO - BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBooleanq = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBooleanq = 0;
                    }
                    else {
                        valorBooleanq = 1;
                    }
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - valorBooleanq;
                }
                ////--------DECIMAL
                //DECIMAL - ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - this.obtenerVal(this.operadorDer.tipo, der);
                }
                //DECIMAL - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - this.obtenerVal(this.operadorDer.tipo, der);
                }
                //DECIMAL - BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean11 = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBoolean11 = 0;
                    }
                    else {
                        valorBoolean11 = 1;
                    }
                    return this.obtenerVal(this.operadorIzq.tipo, izq) - valorBoolean11;
                }
                //----BOOLEANO
                //BOOLEAN - ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBoolean22 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean22 = 0;
                    }
                    else {
                        valorBoolean22 = 1;
                    }
                    return valorBoolean22 - this.obtenerVal(this.operadorDer.tipo, der);
                }
                //BOOLEAN - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean33 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean33 = 0;
                    }
                    else {
                        valorBoolean33 = 1;
                    }
                    return valorBoolean33 - this.obtenerVal(this.operadorDer.tipo, der);
                }
                return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para resta ${this.operadorIzq.tipo} - ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter resta", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ARITMETICA");
        if ((this.operadorDer != null) || (this.operadorDer != undefined)) {
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
            nodo.agregarHijo("-");
            nodo.agregarHijoNodo(this.operadorDer.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("-");
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en resta `, `${this.fila}`, `${this.columna}`);
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
            //--------------------------RESTA------------------------------
            if (this.operador === 1 /* MENOS */) {
                //validaciones
                if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO - ENTERO
                if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return this.setAtributosC3D(izq + "", der + "");
                }
                //ENTERO - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.setAtributosC3D(izq + "", der + "");
                }
                //ENTERO - BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBooleanq = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBooleanq = 0;
                    }
                    else {
                        valorBooleanq = 1;
                    }
                    return this.setAtributosC3D(izq + "", valorBooleanq + "");
                }
                ////--------DECIMAL
                //DECIMAL - ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.setAtributosC3D(izq + "", der + "");
                }
                //DECIMAL - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.setAtributosC3D(izq + "", der + "");
                }
                //DECIMAL - BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean11 = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBoolean11 = 0;
                    }
                    else {
                        valorBoolean11 = 1;
                    }
                    return this.setAtributosC3D(izq, valorBoolean11 + "");
                    //return this.obtenerVal(this.operadorIzq.tipo,izq) -valorBoolean11;
                }
                //----BOOLEANO
                //BOOLEAN - ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBoolean22 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean22 = 0;
                    }
                    else {
                        valorBoolean22 = 1;
                    }
                    return this.setAtributosC3D(valorBoolean22 + "", der);
                    //return valorBoolean22 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //BOOLEAN - DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean33 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean33 = 0;
                    }
                    else {
                        valorBoolean33 = 1;
                    }
                    return this.setAtributosC3D(valorBoolean33 + "", der);
                    //return valorBoolean33 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para resta ${this.operadorIzq.tipo} - ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Pointer Exception resta", `${this.fila}`, `${this.columna}`);
        }
    }
    setAtributosC3D(izquierda, derecha) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + " = " + izquierda + " - " + derecha + ";";
        principal_1.Principal.historial += "\n";
        this.tipo = tipo_1.TIPO.DECIMAL;
        return t;
    }
}
exports.Resta = Resta;
