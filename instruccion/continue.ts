import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class Continue extends Instruccion{

    fila:number;
    columna:number;

    constructor(fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        return new Continue(this.fila, this.columna);
    }
    getNodo():NodoAST{
        const nodo=new NodoAST("CONTINUE");
        return nodo;
    }


    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        return new Continue(this.fila,this.columna);
    }
}