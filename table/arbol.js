"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = void 0;
const principal_1 = require("../principal");
class Arbol {
    //no confundir la variable anterior con la que esta en tablasimbolos
    //este contador es para etiquetas y el otro es para los temporales
    /**
     * @param  {TablaSimbolos} TSglobal
     * @param  {Instruccion[]} instrucciones
     */
    constructor(TSglobal, instrucciones) {
        this.consola = "";
        this.dot = "";
        this.head = "#include <stdio.h>\n";
        this.etiqueta = ""; //para crear los saltos
        this.contador = 0; //para llevar el conteo de las etiquetas
        this.excepciones = new Array();
        this.graficarts = new Array();
        this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
        this.head += "#include <math.h>\n\ndouble heap[30101999];\n";
        this.head += "double stack[30101999];\n\ndouble P;\ndouble H;\n\n";
        this.posicion = 0;
        this.graficarts = new Array();
    }
    updateConsolaError(texto) {
        this.consola += texto + '\n';
    }
    /**
     * @param  {string} nombre
     * @returns Funcion
     */
    getFunctionByName(nombre) {
        let funcion;
        this.funciones.forEach((x) => {
            if (x.id === nombre)
                funcion = x;
        });
        return funcion;
    }
    getInstrucciones() {
        return this.instrucciones;
    }
    getDot(raiz) {
        this.dot = "";
        this.dot += "digraph{ \n ";
        this.dot += "n0[label=\"" + raiz.getValor() + "\"];\n";
        this.contador = 1;
        this.recorrerAST("n0", raiz);
        this.dot += "}";
        console.log("RETORNA DOT : )");
        return this.dot;
    }
    recorrerAST(idPadre, nodoPadre) {
        nodoPadre.getHijos().forEach((hijo) => {
            const nombreHijo = "n" + this.contador;
            this.dot += nombreHijo + " [label=\"" + hijo.getValor() + "\"];\n";
            this.dot += idPadre + "->" + nombreHijo + ";\n";
            this.contador += 1;
            this.recorrerAST(nombreHijo, hijo);
        });
        // for(const hijo in nodoPadre.getHijos()){
        //     const nombreHijo="n"+this.contador;
        //     this.dot+=nombreHijo+" [label=\""+hijo.getValor()+ "\"];\n"
        //     this.dot+=idPadre+"->"+nombreHijo+ ";\n";
        //     this.contador+=1;
        //     this.recorrerAST(nombreHijo,hijo);
        // }
    }
    list_temporales() {
        //.slice(0, value.length - 2);
        let temporales = "";
        //console.log("contador",TablaSimbolos.contador);
        //console.log("Temporales ", Principal.temp);
        for (let con = 0; con <= (principal_1.Principal.temp + 1); con++) {
            temporales += " t" + con + ", ";
        }
        return (temporales.length > 0) ? "double " + temporales.slice(0, temporales.length - 2) + ";" : "";
    }
    getGraficarTS() {
        return this.graficarts;
    }
    addGraficarTS(table) {
        this.graficarts.push(table);
    }
}
exports.Arbol = Arbol;
