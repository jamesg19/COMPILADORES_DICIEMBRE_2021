"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativasString = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const tipo_1 = require("../../table/tipo");
const tiponativacadena_1 = require("./tiponativacadena");
const primitivo_1 = require("../primitivo");
const nodo_1 = require("../../abs/nodo");
const principal_1 = require("../../principal");
const identificador_1 = require("../identificador");
class NativasString extends Instruccion_1.Instruccion {
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador
     * @param identificador
     * @param fila
     * @param columna
     */
    constructor(id, tipo, inicio, final, fila, columna, lista_nativas) {
        super(fila, columna);
        this.identificador = id;
        this.tipo_operacion = tipo;
        this.inicio = inicio;
        this.final = final;
        this.fila = fila;
        this.columna = columna;
        this.tipo = tipo_1.TIPO.CADENA;
        this.lista_nativas = lista_nativas;
    }
    interpretar(entorno, arbol) {
        try {
            if (this.identificador instanceof identificador_1.Identificador) {
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = entorno.getSimbolo(this.identificador.id);
                if (variable == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador}`, `${this.fila}`, `${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA
                if (variable.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                //VERIFICACION DE OPERACIONES NATIVAS EN ARREGLOS
                if (variable.arreglo) {
                    if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                        //codigo para length
                        this.tipo = tipo_1.TIPO.ENTERO;
                        if (this.lista_nativas == null || this.lista_nativas == undefined) {
                            return variable.valor.length;
                        }
                        else {
                            //variable
                            let dato = cadena.length;
                            //ciclo
                            this.lista_nativas.forEach((x) => {
                                //new NativasString(id,tipo,inicio,fin,linea,columna);
                                const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                                const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                                dato = temp.interpretar(entorno, arbol);
                            });
                            return dato;
                        }
                    }
                }
                if (variable.tipo != tipo_1.TIPO.CADENA) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable diferente a Cadena", `${this.fila}`, `${this.columna}`);
                }
                //DETERMINA SI ES LOWER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
                    var cadena = variable.getValor() + "";
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.toLowerCase();
                    }
                    else {
                        //variable
                        let dato = cadena.toLowerCase();
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES UPPER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
                    var cadena = variable.getValor() + "";
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.toUpperCase();
                    }
                    else {
                        //variable
                        let dato = cadena.toUpperCase();
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES LENGTH
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                    if (this.tipo_operacion.tipo == tipo_1.TIPO.ARREGLO) {
                    }
                    var cadena = variable.getValor() + "";
                    this.tipo = tipo_1.TIPO.ENTERO;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.length;
                    }
                    else {
                        //variable
                        let dato = cadena.length;
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES SUBSTRING
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    const b = this.final.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    if (b instanceof excepcion_1.Excepcion) {
                        return b;
                    }
                    var cadena = variable.getValor() + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0 &&
                        this.final.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en Substring", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.substring(aa, b);
                    }
                    else {
                        //variable
                        let dato = cadena.substring(aa, b);
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES CARACTER OF POSITION
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    var cadena = variable.getValor() + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en caracterOfPosition no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en caracterOfPosition", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en caracterOfPosition fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.charAt(aa);
                    }
                    else {
                        //variable
                        let dato = cadena.charAt(aa);
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
            }
            ///
            ///
            ///
            else {
                //console.log("ENTRA AQUI"+this.identificador);
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = this.identificador;
                //DETERMINA SI ES LOWER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
                    var cadena = variable + "";
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.toLowerCase();
                    }
                    else {
                        //variable
                        var dato = cadena.toLowerCase();
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES UPPER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
                    var cadena = variable + "";
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.toUpperCase();
                    }
                    else {
                        //variable
                        let dato = cadena.toUpperCase();
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES LENGTH
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                    if (this.tipo_operacion.tipo == tipo_1.TIPO.ARREGLO) {
                    }
                    //console.log(this.tipo_operacion.tipo);
                    var cadena = variable + "";
                    this.tipo = tipo_1.TIPO.ENTERO;
                    return cadena.length;
                }
                //DETERMINA SI ES SUBSTRING
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    const b = this.final.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    if (b instanceof excepcion_1.Excepcion) {
                        return b;
                    }
                    var cadena = variable + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0 &&
                        this.final.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en Substring", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.substring(aa, b);
                    }
                    else {
                        //variable
                        let dato = cadena.substring(aa, b);
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
                //DETERMINA SI ES CARACTER OF POSITION
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    var cadena = variable + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en caracterOfPosition no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en caracterOfPosition", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en caracterOfPosition fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    this.tipo = tipo_1.TIPO.CADENA;
                    if (this.lista_nativas == null || this.lista_nativas == undefined) {
                        return cadena.charAt(aa);
                    }
                    else {
                        //variable
                        let dato = cadena.charAt(aa);
                        //ciclo
                        this.lista_nativas.forEach((x) => {
                            //new NativasString(id,tipo,inicio,fin,linea,columna);
                            const primitivo = new primitivo_1.Primitivo(tipo_1.TIPO.CADENA, dato, this.fila, this.columna);
                            const temp = new NativasString(primitivo.interpretar(entorno, arbol), x.tipo_operacion, x.inicio, x.final, this.fila, this.columna, null);
                            dato = temp.interpretar(entorno, arbol);
                        });
                        return dato;
                    }
                }
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para metodo nativo string() `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter .toLowercase() tipo dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("NATIVAS STRING");
        if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.BOOLEANPARSE) {
            nodo.agregarHijo("BOOLEANPARSE");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
            nodo.agregarHijo("CARACTER_POSITION");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.DOUBLEPARSE) {
            nodo.agregarHijo("DOUBLEPARSE");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.INTPARSE) {
            nodo.agregarHijo("INTPARSE");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
            nodo.agregarHijo("LENGHT");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.REPETICION) {
            nodo.agregarHijo("REPETICION");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
            nodo.agregarHijo("SUBSTRING");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TODOUBLE) {
            nodo.agregarHijo("TODOUBLE");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOINT) {
            nodo.agregarHijo("TOINT");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
            nodo.agregarHijo("TOLOWER");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOSTRING) {
            nodo.agregarHijo("TOSTRING");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
            nodo.agregarHijo("TOUPPER");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TYPEOF) {
            nodo.agregarHijo("TYPEOF");
        }
        else if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.STRING) {
            nodo.agregarHijo("STRING");
        }
        nodo.agregarHijoNodo(this.identificador.getNodo());
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
            return new excepcion_1.Excepcion("Semantico", `No se pudo obtener el valor en Sen() `, `${this.fila}`, `${this.columna}`);
        }
    }
    ///--------------------------------------TRADUCIR------------------------------
    ///--------------------------------------TRADUCIR------------------------------
    ///--------------------------------------TRADUCIR------------------------------
    traducir(entorno, arbol) {
        try {
            //VERIFICA QUE LA VARIABLE O ID EXISTAN
            if (this.identificador instanceof identificador_1.Identificador) {
                const variable = entorno.getSimbolo(this.identificador.id);
                if (variable == null) {
                    return new excepcion_1.Excepcion("Semantico", "No existe la variable " + `${this.identificador.id}`, `${this.fila}`, `${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA
                if (variable.tipo == tipo_1.TIPO.NULL) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                //VERIFICACION DE OPERACIONES NATIVAS EN ARREGLOS
                if (variable.arreglo) {
                    if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                        //codigo para length
                        //return variable.valor.length;
                    }
                }
                if (variable.tipo != tipo_1.TIPO.CADENA) {
                    return new excepcion_1.Excepcion("Semantico", "Error de operacion en variable diferente a Cadena", `${this.fila}`, `${this.columna}`);
                }
                //DETERMINA SI ES LOWER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
                    principal_1.Principal.addComentario("=========>ToLowerCase<============");
                    principal_1.Principal.historial += "P = " + variable.posicion + ";\n";
                    principal_1.Principal.historial += "toLower();\n";
                    NativasString.LOWER = true;
                    principal_1.Principal.addComentario("=========>Fin TO ToLowerCase<============");
                    return "P";
                }
                //DETERMINA SI ES UPPER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
                    //////traduccion
                    principal_1.Principal.addComentario("=========>toUpperCase<============");
                    principal_1.Principal.historial += "P = " + variable.posicion + ";\n";
                    principal_1.Principal.historial += "toUpper();\n";
                    NativasString.UPPER = true;
                    principal_1.Principal.addComentario("=========>Fin TO Uppercase<============");
                    return "P";
                }
                //DETERMINA SI ES LENGTH
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                    if (this.tipo_operacion.tipo == tipo_1.TIPO.ARREGLO) {
                    }
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    principal_1.Principal.addComentario("=========>Length<============");
                    NativasString.LEN = true;
                    principal_1.Principal.historial += "P = " + variable.posicion + ";\n";
                    principal_1.Principal.historial += "len();\n";
                    principal_1.Principal.addComentario("=========>Fin TO Length<============");
                    return "stack[(int)P]";
                }
                //DETERMINA SI ES SUBSTRING
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
                    const aa = this.inicio.traducir(entorno, arbol);
                    const b = this.final.traducir(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    if (b instanceof excepcion_1.Excepcion) {
                        return b;
                    }
                    var cadena = variable.getValor() + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.traducir(entorno, arbol) < 0 &&
                        this.final.traducir(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en Substring", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.traducir(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    return cadena.substring(aa, b);
                }
                //DETERMINA SI ES CARACTER OF POSITION
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
                    const aa = this.inicio.traducir(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    var cadena = variable.getValor() + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en caracterOfPosition no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.traducir(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en caracterOfPosition", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.traducir(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en caracterOfPosition fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    //return cadena.charAt(this.inicio.interpretar(entorno,arbol));
                    principal_1.Principal.addComentario("=========>CharAt<============");
                    let temp = principal_1.Principal.posicion;
                    temp++;
                    NativasString.CHAR = true;
                    let tempE = principal_1.Principal.temp;
                    tempE++;
                    let t = "t" + tempE + ";\n";
                    principal_1.Principal.temp = tempE;
                    //this.inicio.traducir(entorno,arbol)
                    t = this.inicio.traducir(entorno, arbol); //obtengo el indice
                    principal_1.Principal.historial += "stack[(int)" + (temp + 1) + "] = " + (t) + ";\n"; //posicion de donde se guarda el indice
                    principal_1.Principal.historial += "P = " + (temp + 1) + ";\n";
                    principal_1.Principal.historial += "charAt();\n";
                    this.tipo = tipo_1.TIPO.CARACTER;
                    principal_1.Principal.addComentario("=========>Fin char at<============");
                    return "stack[(int)P]";
                }
            }
            else {
                //console.log("ENTRA AQUI"+this.identificador);
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = this.identificador;
                //DETERMINA SI ES LOWER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOLOWER) {
                    var cadena = variable + "";
                    //xxxxxxxxxxxxxxxxxxxxxx
                    let transf = this.transform_cadena(cadena, arbol);
                    principal_1.Principal.addComentario("=========>ToLowerCase para Cadena<============" + cadena);
                    principal_1.Principal.historial += "P = " + principal_1.Principal.posicion + ";\n";
                    principal_1.Principal.historial += "toLower();\n";
                    NativasString.LOWER = true;
                    principal_1.Principal.addComentario("=========>Fin TO ToLowerCase para Cadena<============");
                    return transf; //"P";
                }
                //DETERMINA SI ES UPPER_CASE
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.TOUPPER) {
                    var cadena = variable + "";
                    principal_1.Principal.addComentario("=========>toUpperCase Para Una Cadena<============");
                    let transf = this.transform_cadena(cadena, arbol);
                    principal_1.Principal.historial += "P = " + principal_1.Principal.posicion + ";\n";
                    principal_1.Principal.historial += "toUpper();\n";
                    NativasString.UPPER = true;
                    principal_1.Principal.addComentario("=========>Fin TO Uppercase Para Cadena<============");
                    return "P";
                }
                //DETERMINA SI ES LENGTH
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.LENGHT) {
                    if (this.tipo_operacion.tipo == tipo_1.TIPO.ARREGLO) {
                    }
                    //console.log(this.tipo_operacion.tipo);
                    var cadena = variable + "";
                    this.tipo = tipo_1.TIPO.DECIMAL;
                    principal_1.Principal.addComentario("=========>Length Para Cadenas<============");
                    NativasString.LEN = true;
                    principal_1.Principal.historial += "P = " + principal_1.Principal.posicion + ";\n";
                    principal_1.Principal.historial += "len();\n";
                    principal_1.Principal.addComentario("=========>Fin TO Length Para Cadenas<============");
                    return "stack[(int)P]";
                }
                //DETERMINA SI ES SUBSTRING
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.SUBSTRING) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    const b = this.final.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    if (b instanceof excepcion_1.Excepcion) {
                        return b;
                    }
                    var cadena = variable + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0 &&
                        this.final.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en Substring", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.final.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en subString fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    return cadena.substring(aa, b);
                }
                //DETERMINA SI ES CARACTER OF POSITION
                if (this.tipo_operacion == tiponativacadena_1.TIPO_NATIVA_CADENA.CARACTER_POSITION) {
                    const aa = this.inicio.interpretar(entorno, arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if (aa instanceof excepcion_1.Excepcion) {
                        return aa;
                    }
                    var cadena = variable + "";
                    if (this.inicio.tipo != tipo_1.TIPO.ENTERO) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro inicio en caracterOfPosition no es Entero", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) < 0) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro negativo en caracterOfPosition", `${this.fila}`, `${this.columna}`);
                    }
                    if (this.inicio.interpretar(entorno, arbol) > cadena.length) {
                        return new excepcion_1.Excepcion("Semantico", "Parametro fin en caracterOfPosition fuera de los limites", `${this.fila}`, `${this.columna}`);
                    }
                    //return cadena.charAt(this.inicio.interpretar(entorno, arbol));
                    principal_1.Principal.addComentario("=========>CharAt Para Cadena<============");
                    let temp = principal_1.Principal.posicion; //posicion actual
                    temp++;
                    NativasString.CHAR = true;
                    let tempE = principal_1.Principal.temp;
                    tempE++;
                    let t = "t" + tempE + ";\n";
                    principal_1.Principal.temp = tempE;
                    //this.inicio.traducir(entorno,arbol)
                    t = this.inicio.traducir(entorno, arbol); //obtengo el indice
                    principal_1.Principal.historial += "stack[(int)" + temp + "] = " + t + ";\n"; //posicion de donde se guarda el indice
                    principal_1.Principal.historial += "P = " + temp + ";\n";
                    principal_1.Principal.historial += "charAt();\n";
                    this.tipo = tipo_1.TIPO.CARACTER;
                    principal_1.Principal.addComentario("=========>Fin char at Para Cadena<============");
                    let tempLabel = principal_1.Principal.temp;
                    tempLabel++;
                    let tLabel = "t" + tempLabel;
                    tempLabel++;
                    let tLabel2 = "t" + tempLabel;
                    principal_1.Principal.historial += tLabel + " = stack[(int)P];\n ";
                    return tLabel;
                }
            }
            return new excepcion_1.Excepcion("Semantico", `Tipo de datos invalido para metodo nativo string() `, `${this.fila}`, `${this.columna}`);
        }
        catch (error) {
            return new excepcion_1.Excepcion("Semantico", "QUETZAL Null Poiter .toLowercase() tipo dato incorrecto ", `${this.fila}`, `${this.columna}`);
        }
    }
    transform_cadena(x, arbol) {
        principal_1.Principal.addComentario("Transformando Cadena");
        let temp = principal_1.Principal.temp; //nuevo temporal
        temp++;
        let t0 = "t" + temp;
        principal_1.Principal.addComentario("Agregando Cadena " + x + " en " + t0);
        principal_1.Principal.historial += t0 + " = H;\n"; //se almacena el puntero del heap que seencuentra en el tope del "monticulo"
        principal_1.Principal.temp = temp;
        //obtener codigo ASCII de cada caracter de la cadena
        //cadena en el heap
        for (let i = 0; i < x.length; i++) {
            let item = x.charCodeAt(i);
            principal_1.Principal.historial += "heap[(int)H] = " + item + " ;\n";
            principal_1.Principal.historial += "H = H + 1;\n";
            //console.log(item);
        }
        principal_1.Principal.historial += "heap[(int)H] = -1 ;\n";
        principal_1.Principal.historial += "H = H + 1;\n";
        //referencia de la cadena desde el stack
        //Principal.posicion;
        let cont = principal_1.Principal.temp;
        cont++;
        let t = "t" + cont;
        principal_1.Principal.historial += t + " = " + (principal_1.Principal.posicion + 1) + ";\n"; //posicion actual disponible
        //Principal.historial += t + "= " + t + " + " + 1 + ";\n";
        principal_1.Principal.historial += "stack[(int)" + t + "] = " + t0 + ";\n";
        principal_1.Principal.addComentario("Fin transformacion decadena, se devuelve el puntero");
        return t;
    }
}
exports.NativasString = NativasString;
NativasString.UPPER = false;
NativasString.LOWER = false;
NativasString.LEN = false;
NativasString.CHAR = false;
