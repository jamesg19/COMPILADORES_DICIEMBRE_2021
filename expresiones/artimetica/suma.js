"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Suma = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Suma extends Instruccion_1.Instruccion {
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
            //--------------------------SUMA------------------------------
            if (this.operador === 0 /* MAS */) {
                //validaciones
                if (this.operadorIzq.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA IZQ", `${this.fila}`, `${this.columna}`);
                }
                if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA DER", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO + ENTERO
                if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //ENTERO + DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //ENTERO + BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBooleanq = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBooleanq = 0;
                    }
                    else {
                        valorBooleanq = 1;
                    }
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + valorBooleanq;
                }
                //ENTERO + CADENA
                else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                ////--------DECIMAL
                //DECIMAL + ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //DECIMAL + DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //DECIMAL + BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean11 = 0;
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBoolean11 = 0;
                    }
                    else {
                        valorBoolean11 = 1;
                    }
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + valorBoolean11;
                }
                //DECIMAL + CADENA
                else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //----BOOLEANO
                //BOOLEAN + ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBoolean22 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean22 = 0;
                    }
                    else {
                        valorBoolean22 = 1;
                    }
                    return valorBoolean22 + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //BOOLEAN + DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    var valorBoolean33 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean33 = 0;
                    }
                    else {
                        valorBoolean33 = 1;
                    }
                    return valorBoolean33 + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //BOOLEAN + BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.ENTERO;
                    var valorBoolean1 = 0;
                    var valorBoolean2 = 0;
                    if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                        valorBoolean1 = 0;
                    }
                    else {
                        valorBoolean1 = 1;
                    }
                    if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                        valorBoolean2 = 0;
                    }
                    else {
                        valorBoolean2 = 1;
                    }
                    return valorBoolean1 + valorBoolean2;
                }
                //BOOLEAN + CADENA
                else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //------CARACTER
                //CARACTER + CARACTER
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CARACTER && this.operadorDer.tipo === tipo_1.TIPO.CARACTER) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //CARACTER + CADENA
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CARACTER && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //------CADENA
                //CADENA + ENTERO
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //CADENA + DECIMAL
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //CADENA + CADENA
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //CADENA + BOOLEAN
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                //CADENA + CARACTER
                else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.CARACTER) {
                    this.tipo = tipo_1.TIPO.CADENA;
                    return this.obtenerVal(this.operadorIzq.tipo, izq) + this.obtenerVal(this.operadorDer.tipo, der);
                }
                return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para suma ${this.operadorIzq.tipo} + ${this.operadorDer.tipo}  `, `${this.fila}`, `${this.columna}`);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter suma ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ARITMETICA");
        if ((this.operadorDer != null) || (this.operadorDer != undefined)) {
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
            nodo.agregarHijo("+");
            nodo.agregarHijoNodo(this.operadorDer.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("+");
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor suma `, `${this.fila}`, `${this.columna}`);
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
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA IZQ", `${this.fila}`, `${this.columna}`);
            }
            if (this.operadorDer.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA DER", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //ENTERO + ENTERO
            if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.ENTERO;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //ENTERO + DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //ENTERO + BOOLEAN
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
                //return this.obtenerVal(this.operadorIzq.tipo,izq) +valorBooleanq;
            }
            //ENTERO + CADENA
            else if (this.operadorIzq.tipo === tipo_1.TIPO.ENTERO && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            ////--------DECIMAL
            //DECIMAL + ENTERO
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //DECIMAL + DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //DECIMAL + BOOLEAN
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                var valorBoolean11 = 0;
                if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                    valorBoolean11 = 0;
                }
                else {
                    valorBoolean11 = 1;
                }
                return this.setAtributosC3D(izq + "", valorBoolean11 + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) +valorBoolean11;
            }
            //DECIMAL + CADENA
            else if (this.operadorIzq.tipo === tipo_1.TIPO.DECIMAL && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //----BOOLEANO
            //BOOLEAN + ENTERO
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.ENTERO;
                var valorBoolean22 = 0;
                if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                    valorBoolean22 = 0;
                }
                else {
                    valorBoolean22 = 1;
                }
                return this.setAtributosC3D(valorBoolean22 + "", der + "");
                //return valorBoolean22+this.obtenerVal(this.operadorDer.tipo,der);
            }
            //BOOLEAN + DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                var valorBoolean33 = 0;
                if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                    valorBoolean33 = 0;
                }
                else {
                    valorBoolean33 = 1;
                }
                return this.setAtributosC3D(valorBoolean33 + "", der + "");
                //return valorBoolean33+this.obtenerVal(this.operadorDer.tipo,der);
            }
            //BOOLEAN + BOOLEAN
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                this.tipo = tipo_1.TIPO.ENTERO;
                var valorBoolean1 = 0;
                var valorBoolean2 = 0;
                if (this.obtenerVal(this.operadorIzq.tipo, izq) === false) {
                    valorBoolean1 = 0;
                }
                else {
                    valorBoolean1 = 1;
                }
                if (this.obtenerVal(this.operadorDer.tipo, der) === false) {
                    valorBoolean2 = 0;
                }
                else {
                    valorBoolean2 = 1;
                }
                return this.setAtributosC3D(valorBoolean1 + "", valorBoolean2 + "");
                //return valorBoolean1+valorBoolean2;
            }
            //BOOLEAN + CADENA
            else if (this.operadorIzq.tipo === tipo_1.TIPO.BOOLEAN && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //------CARACTER
            //CARACTER + CARACTER
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CARACTER && this.operadorDer.tipo === tipo_1.TIPO.CARACTER) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //CARACTER + CADENA
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CARACTER && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //------CADENA
            //CADENA + ENTERO
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //CADENA + DECIMAL
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //CADENA + CADENA
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.CADENA) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //CADENA + BOOLEAN
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.BOOLEAN) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
            //CADENA + CARACTER
            else if (this.operadorIzq.tipo === tipo_1.TIPO.CADENA && this.operadorDer.tipo === tipo_1.TIPO.CARACTER) {
                this.tipo = tipo_1.TIPO.CADENA;
                return this.setAtributosC3D(izq + "", der + "");
                //return this.obtenerVal(this.operadorIzq.tipo,izq) + this.obtenerVal(this.operadorDer.tipo,der);
            }
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Pointer Exception Suma", `${this.fila}`, `${this.columna}`);
        }
    }
    setAtributosC3D(izquierda, derecha) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        principal_1.Principal.temp = temp;
        principal_1.Principal.historial += t + " = " + izquierda + " + " + derecha + ";";
        principal_1.Principal.historial += "\n";
        this.tipo = tipo_1.TIPO.DECIMAL;
        return t;
    }
}
exports.Suma = Suma;
