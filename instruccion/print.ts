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
        
        //console.log('antes: ',this.expresion);
        
        const value = this.expresion.interpretar(entorno,arbol);
        
        //console.log('despues: ',value);
        
        
        if( value instanceof Excepcion){
            console.log(value);
            return value;            
        }  
        
        
        arbol.consola += value;
        console.log(value);
    }
    
    
}