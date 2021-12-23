"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pow = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tipo_1 = require("../../table/tipo");
const excepcion_1 = require("../../table/excepcion");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class Pow extends Instruccion_1.Instruccion {
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador
     * @param base
     * @param fila
     * @param columna
     */
    constructor(base, potencia, fila, columna) {
        super(fila, columna);
        this.base = base;
        this.potencia = potencia;
        //this.operadorDer=operadorDer;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo_1.TIPO.NULL;
    }
    interpretar(entorno, arbol) {
        try {
            const base = this.base.interpretar(entorno, arbol);
            const potencia = this.potencia.interpretar(entorno, arbol);
            //const der=this.operadorDer.interpretar(entorno,arbol);
            if (base instanceof excepcion_1.Excepcion) {
                return base;
            }
            //validaciones
            if (this.base.tipo == tipo_1.TIPO.NULL || this.potencia.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //pow(ENTERO, ENTERO);
            if (this.base.tipo === tipo_1.TIPO.ENTERO && this.potencia.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.ENTERO;
                return Math.pow(this.obtenerVal(this.base.tipo, base), this.obtenerVal(this.potencia.tipo, potencia));
            }
            //pow(ENTERO, DECIMAL);
            else if (this.base.tipo === tipo_1.TIPO.ENTERO && this.potencia.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.pow(this.obtenerVal(this.base.tipo, base), this.obtenerVal(this.potencia.tipo, potencia));
            }
            ////--------DECIMAL
            //pow(DECIMAL, ENTERO);
            else if (this.base.tipo === tipo_1.TIPO.DECIMAL && this.potencia.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.pow(this.obtenerVal(this.base.tipo, base), this.obtenerVal(this.potencia.tipo, potencia));
            }
            //pow(DECIMAL, DECIMAL);
            else if (this.base.tipo === tipo_1.TIPO.DECIMAL && this.potencia.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return Math.pow(this.obtenerVal(this.base.tipo, base), this.obtenerVal(this.potencia.tipo, potencia));
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para pow( ${this.base.tipo} , ${this.potencia.tipo}) `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter pow() tipo dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("ARITMETICA");
        if ((this.potencia != null) || (this.potencia != undefined)) {
            nodo.agregarHijoNodo(this.base.getNodo());
            nodo.agregarHijo("POW");
            nodo.agregarHijoNodo(this.potencia.getNodo());
            return nodo;
        }
        else {
            nodo.agregarHijo("POW");
            nodo.agregarHijoNodo(this.base.getNodo());
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en Sen() `, `${this.fila}`, `${this.columna}`);
        }
    }
    traducir(entorno, arbol) {
        try {
            const izq = this.base.traducir(entorno, arbol);
            const der = this.potencia.traducir(entorno, arbol);
            if (izq instanceof excepcion_1.Excepcion) {
                return izq;
            }
            if (this.potencia != null || this.potencia != undefined) {
                if (der instanceof excepcion_1.Excepcion) {
                    return der;
                }
            }
            //validaciones
            if (this.base.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            if (this.potencia.tipo == tipo_1.TIPO.NULL) {
                return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            //-------ENTERO
            //ENTERO ^^ ENTERO
            if (this.base.tipo === tipo_1.TIPO.ENTERO && this.potencia.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            //ENTERO ^ DECIMAL
            else if (this.base.tipo === tipo_1.TIPO.ENTERO && this.potencia.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            ////--------DECIMAL
            //DECIMAL ^ ENTERO
            else if (this.base.tipo === tipo_1.TIPO.DECIMAL && this.potencia.tipo === tipo_1.TIPO.ENTERO) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            //DECIMAL ^ DECIMAL
            else if (this.base.tipo === tipo_1.TIPO.DECIMAL && this.potencia.tipo === tipo_1.TIPO.DECIMAL) {
                this.tipo = tipo_1.TIPO.DECIMAL;
                return this.setAtributosC3D(izq, der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para Modulo ${this.base.tipo} ^ ${this.potencia.tipo}  `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Pointer Exception Modulo", `${this.fila}`, `${this.columna}`);
        }
    }
    setAtributosC3D(izquierda, derecha) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        Pow.Pow = true;
        // Principal.temp = temp;
        // Principal.historial += t +" = pow("+izquierda+" , "+derecha+");" ;
        // Principal.historial += "\n";
        this.tipo = tipo_1.TIPO.DECIMAL;
        let tspos = principal_1.Principal.posicion;
        principal_1.Principal.historial += "P = " + tspos + ";\n";
        principal_1.Principal.historial += "stack[(int)" + tspos + "] = " + izquierda + ";\n";
        principal_1.Principal.historial += "stack[(int)" + (tspos + 1) + "] = " + derecha + ";\n";
        principal_1.Principal.historial += "potencia();\n";
        principal_1.Principal.historial += t + " =  stack[(int) P];\n";
        return t;
    }
}
exports.Pow = Pow;
Pow.Pow = false;
