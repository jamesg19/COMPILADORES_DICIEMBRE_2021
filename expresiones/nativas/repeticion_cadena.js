"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeticionCadena = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const identificador_1 = require("../identificador");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
class RepeticionCadena extends Instruccion_1.Instruccion {
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador
     * @param identificador
     * @param fila
     * @param columna
     */
    constructor(id, tipo, inicio, final, fila, columna) {
        super(fila, columna);
        this.identificador = id;
        this.tipo_operacion = tipo;
        this.inicio = inicio;
        this.final = final;
        this.fila = fila;
        this.columna = columna;
    }
    interpretar(entorno, arbol) {
        try {
            const iden = this.identificador.interpretar(entorno, arbol);
            //DETERMINA SI ES REPETICION
            if (this.identificador instanceof identificador_1.Identificador) {
                const simboll = entorno.getSimbolo(this.identificador.id + "");
                //verifica si existe
                if (simboll instanceof excepcion_1.Excepcion) {
                    return simboll;
                }
                if (simboll == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador.id}`, `${this.fila}`, `${this.columna}`);
                }
                else {
                    var texto = "";
                    for (let i = 0; i < this.inicio.interpretar(entorno, arbol); i++) {
                        texto += this.identificador.interpretar(entorno, arbol);
                    }
                    this.tipo = tipo_1.TIPO.CADENA;
                    return texto;
                }
            }
            //  SI ES UNA CADENA SIMPLE
            else {
                const start = this.inicio.interpretar(entorno, arbol);
                const id = this.identificador.interpretar(entorno, arbol);
                if (id instanceof excepcion_1.Excepcion) {
                    return id;
                }
                if (start instanceof excepcion_1.Excepcion) {
                    return start;
                }
                //VERIFICA QUE LAS REPETICIONES SEA UN ENTERO
                if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                    return new excepcion_1.Excepcion('Semantico', 'El parametro de repeticiones debe ser entero', `${this.fila}`, `${this.columna}`);
                }
                //VERIFICA QUE EL NUMERO SEA >=0
                if (this.inicio.interpretar(entorno, arbol) < 0) {
                    return new excepcion_1.Excepcion('Semantico', 'El numero de repeticiones debe ser >= 0', `${this.fila}`, `${this.columna}`);
                }
                if (this.identificador.tipo != tipo_1.TIPO.CADENA) {
                    return new excepcion_1.Excepcion('Semantico', 'El tipo de expresion debe ser cadena en repeticion ', `${this.fila}`, `${this.columna}`);
                }
                var cadena = "";
                for (let i = 0; i < this.inicio.interpretar(entorno, arbol); i++) {
                    cadena += this.identificador.interpretar(entorno, arbol);
                }
                this.tipo = tipo_1.TIPO.CADENA;
                return cadena;
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para metodo nativo repeticion string() `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter repeticion ^ cadena", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("REPEAT");
        if ((this.inicio != null) || (this.inicio != undefined)) {
            try {
                nodo.agregarHijoNodo(this.expresion.getNodo());
                nodo.agregarHijo("^");
                nodo.agregarHijoNodo(this.inicio.getNodo());
            }
            catch (e) {
            }
            return nodo;
        }
        else {
            nodo.agregarHijo("^");
            nodo.agregarHijoNodo(this.expresion.getNodo());
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
            let iden = this.identificador.traducir(entorno, arbol);
            //DETERMINA SI ES REPETICION
            if (this.identificador instanceof identificador_1.Identificador) {
                const simboll = entorno.getSimbolo(this.identificador.id + "");
                //verifica si existe
                if (simboll instanceof excepcion_1.Excepcion) {
                    return simboll;
                }
                if (simboll == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador.id}`, `${this.fila}`, `${this.columna}`);
                }
                else {
                    var texto = "";
                    //Principal.posicion
                    let temp = principal_1.Principal.temp;
                    temp++;
                    let t_cadena = "t" + temp;
                    temp++;
                    let t_cantidad = "t" + temp;
                    //this.inicio.interpretar(entorno,arbol)
                    let cantidad = this.inicio.interpretar(entorno, arbol);
                    if (cantidad instanceof excepcion_1.Excepcion)
                        return cantidad;
                    //posicion en la que se almacenara la posicion de la cadena
                    //Principal.historial += t_cantidad+ " = " +cantidad + ";\n";//almaceno la cantidad que se debe repetir
                    principal_1.Principal.addComentario("Posicion libre en el stack");
                    principal_1.Principal.historial += "P = " + (principal_1.Principal.posicion + 1) + ";\n"; //obtengo la posicion libre actual
                    principal_1.Principal.addComentario("Obtengo la posicion de la variable");
                    principal_1.Principal.historial += t_cadena + " = " + (simboll.posicion) + ";\n"; //obtengo la posicion de la cadena
                    principal_1.Principal.addComentario("Guardo  la posicion de la cadena en la posicion libre del stack");
                    principal_1.Principal.historial += "stack[(int) P] =" + t_cadena + ";\n "; //guarda la posicion de la cadena 
                    principal_1.Principal.addComentario("Almaceno la cantidad de veces que se debe repetir la cadena");
                    principal_1.Principal.historial += "stack[(int) (P+" + 1 + ")] = " + cantidad + ";\n";
                    principal_1.Principal.historial += "potencia_string();\n";
                    principal_1.Principal.historial += "P = " + (t_cadena) + ";\n";
                    RepeticionCadena.REPETICION = true;
                    this.tipo = tipo_1.TIPO.CADENA;
                    return "P";
                }
            }
            //  SI ES UNA CADENA SIMPLE
            else {
                const start = this.inicio.interpretar(entorno, arbol);
                const id = this.identificador.interpretar(entorno, arbol);
                if (id instanceof excepcion_1.Excepcion) {
                    return id;
                }
                if (start instanceof excepcion_1.Excepcion) {
                    return start;
                }
                //VERIFICA QUE LAS REPETICIONES SEA UN ENTERO
                if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                    return new excepcion_1.Excepcion('Semantico', 'El parametro de repeticiones debe ser entero', `${this.fila}`, `${this.columna}`);
                }
                //VERIFICA QUE EL NUMERO SEA >=0
                if (this.inicio.interpretar(entorno, arbol) < 0) {
                    return new excepcion_1.Excepcion('Semantico', 'El numero de repeticiones debe ser >= 0', `${this.fila}`, `${this.columna}`);
                }
                if (this.identificador.tipo != tipo_1.TIPO.CADENA) {
                    return new excepcion_1.Excepcion('Semantico', 'El tipo de expresion debe ser cadena en repeticion ', `${this.fila}`, `${this.columna}`);
                }
                var cadena = "";
                //for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                cadena += this.identificador.traducir(entorno, arbol);
                //}
                let temp = principal_1.Principal.temp;
                temp++;
                let t_cadena = "t" + temp;
                temp++;
                let t_cantidad = "t" + temp;
                //this.inicio.interpretar(entorno,arbol)
                let cantidad = this.inicio.interpretar(entorno, arbol);
                principal_1.Principal.addComentario("Posicion libre en el stack");
                principal_1.Principal.historial += "P = " + (principal_1.Principal.posicion + 2) + ";\n"; //obtengo la posicion libre actual
                principal_1.Principal.addComentario("Obtengo la posicion de la variable");
                principal_1.Principal.historial += t_cadena + " = " + (cadena) + ";\n"; //obtengo la posicion de la cadena
                principal_1.Principal.addComentario("Guardo  la posicion de la cadena en la posicion libre del stack");
                principal_1.Principal.historial += "stack[(int) P] =" + t_cadena + ";\n "; //guarda la posicion de la cadena 
                principal_1.Principal.addComentario("Almaceno la cantidad de veces que se debe repetir la cadena");
                principal_1.Principal.historial += "stack[(int) (P+" + 1 + ")] = " + cantidad + ";\n";
                principal_1.Principal.historial += "potencia_string();\n";
                principal_1.Principal.historial += "P = " + (t_cadena) + ";\n";
                RepeticionCadena.REPETICION = true;
                this.tipo = tipo_1.TIPO.CADENA;
                this.tipo = tipo_1.TIPO.CADENA;
                return cadena;
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para metodo nativo repeticion string() `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter repeticion ^ cadena", `${this.fila}`, `${this.columna}`);
        }
    }
    transform_cadena(x, arbol) {
        let return_string = "";
        let temp = principal_1.Principal.temp;
        temp++;
        let t = "t" + temp;
        return_string = t + " = H;\n";
        principal_1.Principal.temp = temp;
        //obtener codigo ASCII de cada caracter de la cadena
        //cadena en el heap
        if (!x)
            x = "Undefined";
        for (let i = 0; i < x.length - 1; i++) {
            let item = x.charCodeAt(i);
            return_string += "heap[(int)H] = " + item + " ;\n";
            return_string += "H = H + 1;\n";
            //console.log(item);
        }
        return_string += "heap[(int)H] = -1 ;\n";
        return_string += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        //Principal.posicion;
        return_string +=
            "t" + principal_1.Principal.temp + " = P + " + principal_1.Principal.posicion + ";\n";
        return t;
    }
}
exports.RepeticionCadena = RepeticionCadena;
RepeticionCadena.REPETICION = false;
