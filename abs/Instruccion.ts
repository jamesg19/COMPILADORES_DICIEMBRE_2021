import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
export abstract class  Instruccion{
    
    fila:number;
    columna:number;
    struct:boolean;
    arra:boolean;
    expresion: string;
    temp:number;//contador para los temporales
    
    constructor(fila:number,columna:number){
            this.columna = columna;
            this.fila = fila;    
            this.struct = false;  
            this.arra = false;          
            this.temp = 0;
    }
    abstract interpretar(entorno:TablaSimbolos,arbol:Arbol):any;
    
    abstract getNodo():any;
    abstract traducir(entorno:TablaSimbolos,arbol:Arbol):any;


        
    
}