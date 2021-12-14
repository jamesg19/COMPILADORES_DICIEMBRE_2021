import { Instruccion } from '../../../abs/Instruccion';
import { Arbol } from '../../../table/arbol';
import { TablaSimbolos } from '../../../table/tablasimbolos';
import { Simbolo } from '../../../table/simbolo';
import { Excepcion } from '../../../table/excepcion';
import { TIPO } from '../../../table/tipo';
import { NodoAST } from '../../../abs/nodo';

export class Tan_Arr extends Instruccion {
    
    id:string;
    
    
    constructor(id:string,fila:number,columna:number){
        super(fila,columna);
        this.id = id;
        
    }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        let arr = entorno.getSimbolo(this.id);
        
        
        if(!(arr instanceof Simbolo))
        return new Excepcion("Internal","V8 esta presentando errores",this.fila+"",this.columna+"");
        
        
        if(!arr)
        return new Excepcion("Internal","No existe ",this.fila+"",this.columna+"");
        
        
        if(!(arr.valor instanceof Array))
        return new Excepcion("Semantico","Se esperaba un Arrego "+this.id,this.fila+"",this.columna+"");
     
         
        let value_result = arr.valor.map((x)=> Math.tan(x));
        return value_result;
    }

    getNodo():NodoAST {
        const nodo= new NodoAST("TAN #");
        nodo.agregarHijo(this.id);
        return nodo;
        
    }
    
}