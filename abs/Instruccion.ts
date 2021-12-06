import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
export interface  Instruccion{
    
    fila:number;
    columna:number;
    struct:boolean;
    arra:boolean;
  /*  constructor(fila:number,columna:number){
            this.columna = columna;
            this.fila = fila;    
            this.struct = false;            
    }*/
     interpretar(entorno:TablaSimbolos,arbol:Arbol):any;
    
        
    
}