import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
export abstract class  Instruccion{
    
    fila:number;
    columna:number;
    struct:boolean;
    arra:boolean;
    expresion: string;
    
    constructor(fila:number,columna:number){
            this.columna = columna;
            this.fila = fila;    
            this.struct = false;  
            this.arra = false;          
    }
    abstract interpretar(entorno:TablaSimbolos,arbol:Arbol):any;
    
    
        
    
}