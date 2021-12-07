import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class Break extends Instruccion{

    fila:number;
    columna:number;

    constructor(fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        return this;
    }
    getNodo():NodoAST{
        return new NodoAST("BREAK");
    }
}