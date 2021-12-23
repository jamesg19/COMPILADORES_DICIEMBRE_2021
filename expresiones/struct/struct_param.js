"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dec_Struct = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Dec_Struct extends Instruccion_1.Instruccion {
    /**
     * @param  {string} template_struct
     * @param  {string} id
     * @param  {string} id_struct
     * @param  {Instruccion[]} values_atributos
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor(template_struct, id, id_struct, fila, columna) {
        super(fila, columna);
        this.template_struct = template_struct;
        this.id = id;
        this.list_simbolos = new Map();
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        //verifico que el struct exista
        if (!arbol.structs.has(this.template_struct))
            return new excepcion_1.Excepcion("Semantico", "Struct: " + this.template_struct + ", no existe ", this.fila + "", this.columna + "");
        //getsimbolo para verificar  si existe una variable con el mismo id
        let create_struct = entorno.getSimbolo(this.id);
        //console.log(!create_struct);
        if (create_struct)
            return new excepcion_1.Excepcion("Semantico", "Existe una variable con " +
                this.id +
                ", no se pueden duplicar variables ", this.fila + "", this.columna + "");
        //obtengo el struct
        let template = arbol.structs.get(this.template_struct);
        template === null || template === void 0 ? void 0 : template.lista_simbolo.forEach((x) => {
            let sim = JSON.parse(JSON.stringify(x));
            this.list_simbolos.set(sim.id, sim);
        });
        let simbolo = new simbolo_1.Simbolo(this.id, tipo_1.TIPO.STRUCT, this.fila, this.columna, this.list_simbolos, false, true);
        entorno.addSimbolo(simbolo);
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("PARAMETRO STRUCT");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.template_struct);
        return nodo;
    }
}
exports.Dec_Struct = Dec_Struct;
