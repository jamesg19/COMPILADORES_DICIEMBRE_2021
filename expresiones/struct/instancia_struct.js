"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dec_Struct = void 0;
const Instruccion_1 = require("../../abs/Instruccion");
const tablasimbolos_1 = require("../../table/tablasimbolos");
const excepcion_1 = require("../../table/excepcion");
const simbolo_1 = require("../../table/simbolo");
const tipo_1 = require("../../table/tipo");
const nodo_1 = require("../../abs/nodo");
class Dec_Struct extends Instruccion_1.Instruccion {
    constructor(template_struct, id, id_struct, values_atributos, fila, columna) {
        super(fila, columna);
        this.template_struct = template_struct;
        this.id = id;
        this.values_atributos = values_atributos;
        this.id_struct = id_struct;
        this.list_simbolos = new Map();
    }
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     */
    interpretar(entorno, arbol) {
        if (this.id_struct != this.template_struct)
            return new excepcion_1.Excepcion("Semantico", "Nombre de Struct y constructor no coinciden", this.fila + "", this.columna + "");
        let entorno_local = new tablasimbolos_1.TablaSimbolos(entorno);
        //verifico que el struct exista
        if (!arbol.structs.has(this.template_struct))
            return new excepcion_1.Excepcion("Semantico", "Struct: " + this.template_struct + ", no existe ", this.fila + "", this.columna + "");
        //getsimbolo para verificar  si existe una variable con el mismo id
        let create_struct = entorno.consultar_en_tabla_actual(this.id);
        //console.log(!create_struct);
        if (create_struct)
            return new excepcion_1.Excepcion("Semantico", "Existe una variable con " +
                this.id +
                ", no se pueden duplicar variables ", this.fila + "", this.columna + "");
        //obtengo el struct
        let template = arbol.structs.get(this.template_struct);
        //console.log("template",template);
        //console.log(template);
        // //comparo que las listas sean del mismo tama;o
        // //para saber si los parametros son en misma cantidad que los
        // //atributos en el struct
        if (this.values_atributos.length != (template === null || template === void 0 ? void 0 : template.lista_atributos.length))
            return new excepcion_1.Excepcion("Semantico", "se esperaba una cantidad diferente de atributos para el Struct " +
                this.template_struct, "" + this.fila, "" + this.columna);
        //hago una copia de los atributos del struct
        //let lst_simbolos:Map<string,Simbolo> = new Map();
        //  lst_simbolos = JSON.parse(JSON.stringify(template?.lista_simbolo));
        //    console.log("lst_simbolos",lst_simbolos);
        let contador = 0;
        template === null || template === void 0 ? void 0 : template.lista_atributos.forEach((x) => {
            let result = this.values_atributos[contador].interpretar(entorno, arbol);
            if (this.values_atributos[contador].tipo != x.tipo)
                return new excepcion_1.Excepcion("Semantico", "El tipo de parametro no coince con el del struct", this.fila + "", this.columna + "");
            if (result instanceof excepcion_1.Excepcion)
                return result;
            let sim = JSON.parse(JSON.stringify(x));
            if (x.struct) {
                sim.name_struct = sim.valor;
                sim.struct = true;
            }
            sim.valor = result;
            contador++;
            this.list_simbolos.set(sim.id, sim);
        });
        let simbolo = new simbolo_1.Simbolo(this.id, tipo_1.TIPO.STRUCT, this.fila, this.columna, this.list_simbolos, false, true);
        simbolo.name_struct = template.id;
        entorno.addSimbolo(simbolo);
        //console.log("this", this);
        // //recorro la lista de valores para que se asigen a
        // //los valores del struct
        // this.values_atributos.forEach((x) => {
        //   let value = x.interpretar(entorno, arbol);
        //   if (!value)
        //     return new Excepcion(
        //       "Semantico",
        //       "Se requiere de un valor",
        //       this.fila + "",
        //       this.columna + ""
        //     );
        //   if (value instanceof Excepcion) return value;
        //     //comparo los tipos del atributo
        //   if (template?.lista_atributos[contador].tipo != x.tipo)
        //     return new Excepcion(
        //       "Semantico",
        //       "Existen atributos con tipos diferentes",
        //       this.fila + "",
        //       this.columna + ""
        //     );
        //   console.log(simbolo);
        //     let sim: Simbolo = new Simbolo(
        //       this.list_atributos[contador].id,
        //       this.list_atributos[contador].tipo,
        //       super.fila,
        //       super.columna,
        //       value,
        //       x.arra,
        //       x.struct
        //     );
        //     entorno_local.addSimbolo(sim);
        //   });
        //   entorno.addSimbolo
        // });
    }
    getNodo() {
        const nodo = new nodo_1.NodoAST("INSTANCIA STRUCT");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.id_struct);
        const atributos = new nodo_1.NodoAST("ATRIBUTOS");
        if (this.values_atributos != null || this.values_atributos != undefined) {
            this.values_atributos.forEach((element) => {
                atributos.agregarHijoNodo(element.getNodo());
            });
            nodo.agregarHijoNodo(atributos);
        }
        return nodo;
    }
}
exports.Dec_Struct = Dec_Struct;
