import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
import { TIPO } from '../table/tipo';
import { Excepcion } from '../table/excepcion';

export class Print extends Instruccion{
 
    fila:number;
    columna:number;
  
    expresion:Instruccion;
    
    constructor(fila:number,columna:number,value:Instruccion){
        super(fila,columna);
        this.fila = fila;
        this.columna = columna;
        this.expresion = value;
      
    }
    
    interpretar(entorno:TablaSimbolos, arbol:Arbol):any{
        
        let value = this.expresion.interpretar(entorno,arbol);
        
        if( value instanceof Excepcion){
            return value;            
        }  
        console.log("Interpretar println");
        arbol.consola += value;
        //console.log(value);
    }
    
    
}