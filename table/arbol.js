"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Arbol = void 0;
class Arbol {
    /**
     * @param  {TablaSimbolos} TSglobal
     * @param  {Instruccion[]} instrucciones
     */
    constructor(TSglobal, instrucciones) {
        this.consola = "";
        this.contador = 0;
        this.dot = "";
        this.excepciones =
            this.funciones = new Array();
        this.TSglobal = TSglobal;
        this.instrucciones = instrucciones;
        this.structs = new Map();
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
}
exports.Arbol = Arbol;
