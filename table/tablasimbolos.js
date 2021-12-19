"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TablaSimbolos = void 0;
const excepcion_1 = require("./excepcion");
const principal_1 = require("../principal");
class TablaSimbolos {
    /**
     * @param  {TablaSimbolos|undefined} anterior
     */
    constructor(anterior) {
        this.tabla = new Map();
        this.anterior = anterior;
    }
    /**
     * @param  {Simbolo} simbolo
     */
    addSimbolo(simbolo) {
        if (simbolo.id in this.tabla) {
            return new excepcion_1.Excepcion("Semantico", "Variable " + simbolo.id + " ya existe en el entorno", simbolo.fila + "", simbolo.columna + "");
        }
        else {
            principal_1.Principal.posicion += 1; //contador  de posicion P
            simbolo.posicion = principal_1.Principal.posicion; //para el
            this.tabla.set(simbolo.id, simbolo);
        }
    }
    /**
     * @param  {string} id
     */
    getSimbolo(id) {
        let tabla_actual = this;
        while (tabla_actual != undefined) {
            if (tabla_actual.tabla.has(id)) {
                return tabla_actual.tabla.get(id);
            }
            else {
                tabla_actual = tabla_actual.anterior;
            }
        }
        return undefined;
    }
    //obtener el simbolo
    getSimboloJ(id) {
        let tabla_actual = this;
        while (tabla_actual != undefined || tabla_actual != null) {
            if (tabla_actual.tabla.has(id)) {
                let s = tabla_actual.tabla.get(id);
                s === null || s === void 0 ? void 0 : s.id;
                //retorna el simbolo
                return s;
            }
            else {
                tabla_actual = tabla_actual.anterior;
            }
        }
    }
    /**
     * @param  {Simbolo} simbolo
     */
    actualizarSimboloEnTabla(simbolo) {
        let tabla_actual = this;
        while (tabla_actual != null) {
            if (tabla_actual.tabla.has(simbolo.id)) {
                let s = tabla_actual.tabla.get(simbolo.id);
                s === null || s === void 0 ? void 0 : s.id;
                if ((s === null || s === void 0 ? void 0 : s.getTipo) == simbolo.getTipo) {
                    //tabla_actual.tabla.get(simbolo.id) = s
                    tabla_actual.tabla.delete(simbolo.id);
                    tabla_actual.tabla.set(simbolo.id, simbolo);
                    return;
                }
                return new excepcion_1.Excepcion("Semantico", "Tipo de dato Diferente en Asignacion", simbolo.fila + "", simbolo.columna + "");
            }
            else {
                tabla_actual = tabla_actual.anterior;
            }
        }
        return new excepcion_1.Excepcion("Semantico", "Variable No encontrada en Asignacion", simbolo.fila + "", simbolo.columna + "");
    }
    consultar_en_tabla_actual(id) {
        if (this.tabla.has(id)) {
            return this.tabla.get(id);
        }
        return undefined;
    }
    get_temp() {
        let vale = TablaSimbolos.contador;
        TablaSimbolos.contador++;
        return vale;
    }
}
exports.TablaSimbolos = TablaSimbolos;
