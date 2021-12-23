"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Struct = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tablasimbolos_1 = require("../../table/tablasimbolos");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const Type_1 = require("../../table/Type");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Struct extends Instruccion_1.Instruccion {
    /**
     * @param  {string} id nombre del struct
     * @param  {Atributo[]} lista_atributos
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(id, lista_atributos, fila, columna) {
        super(fila, columna);
        this.id = id;
        // this.lista_atributos = lista_atributos;
        this.lista_atributos = lista_atributos;
        //Object.assign(this, {lista_atributos});
        this.lista_simbolo = new Map();
        let contador = 0;
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno, arbol) {
        const entorno_local = new tablasimbolos_1.TablaSimbolos(entorno);
        if (!arbol.structs.has(this.id)) {
            this.lista_atributos.forEach((atributo) => {
                //Validación objeto
                //Validacion de id unico
                let variable = entorno_local.getSimbolo(atributo.id);
                const reasignable = true;
                if (variable) {
                    return new excepcion_1.Excepcion("Semantico", "atributo repetido", super.fila + "", super.columna + ""); //Errores.getInstance().push(new Error({tipo: 'semantico', linea: this.linea, descripcion: `El id: ${id} esta repetido en el type`}));
                }
                //Si se puede asignar
                const valor = this.getValue(atributo.tipo);
                //{reasignable, id, valor}
                variable = new simbolo_1.Simbolo(atributo.id, atributo.tipo, atributo.fila, atributo.columna, valor, this.arra, this.struct);
                //id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean
                //entorno.setSi(variable);
                this.lista_simbolo.set(atributo.id, variable);
                entorno_local.addSimbolo(variable);
            });
            //JSON.parse(JSON.stringify(this))
            arbol.structs.set(this.id, this);
            return new Type_1.Type(this.id, entorno_local.tabla);
        }
        return new excepcion_1.Excepcion("Semantico", "Existe un Struct con " + this.id, super.fila + "", super.columna + "");
    }
    getValue(tipo) {
        switch (tipo) {
            case tipo_1.TIPO.BOOLEAN:
                return false;
            case tipo_1.TIPO.ENTERO:
                return 0;
            case tipo_1.TIPO.DECIMAL:
                return 0.0;
            case tipo_1.TIPO.CARACTER:
                return "";
            case tipo_1.TIPO.CADENA:
                return "";
            case tipo_1.TIPO.ARREGLO:
            case tipo_1.TIPO.STRUCT:
                return undefined;
        }
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("STRUCT");
        nodo.agregarHijo(this.id);
        if (this.lista_atributos != null || this.lista_atributos != undefined) {
            const lista_atributos = new nodo_1.NodoAST("LISTA ATRIBUTOS");
            this.lista_atributos.forEach((element) => {
                try {
                    lista_atributos.agregarHijoNodo(element.getNodo());
                }
                catch (e) {
                }
            });
            nodo.agregarHijoNodo(lista_atributos);
        }
        return nodo;
    }
}
exports.Struct = Struct;
