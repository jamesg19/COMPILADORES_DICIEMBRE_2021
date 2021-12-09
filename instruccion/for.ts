import { Instruccion } from "../abs/Instruccion";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class For extends Instruccion {
    declaracion:Instruccion;
    condicion:Instruccion;
    actualizacion:Instruccion;
    fila: number;
    columna:number;
    // FOR( DECLARACION; CONDICION; ACTUALIZACION )
    constructor(declaracion:Instruccion,condicion:Instruccion,actualizacion:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        this.declaracion=declaracion;
        this.condicion=condicion;
        this.actualizacion=actualizacion;
    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        
    }

}