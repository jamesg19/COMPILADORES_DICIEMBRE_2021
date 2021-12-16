import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { Instruccion } from '../../abs/Instruccion';
import { TIPO } from '../../table/tipo';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { Excepcion } from '../../table/excepcion';
import { NodoAST } from '../../abs/nodo';

export class Pop extends Instruccion {
    
    id:string;
    exp:Instruccion;
    tipo:TIPO;
    
    constructor(id:string,fila:number,columna:number){
        super(fila,columna);
        this.id = id;        
        this.tipo = TIPO.NULL;
    }
    
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        
        let arr_value = entorno.getSimbolo(this.id);
        
        if(arr_value instanceof Excepcion ) return arr_value;
        
        if(!arr_value)
            return new Excepcion("Semantico","la variable '"+this.id+"' no existe ",""+super.fila,""+super.columna);
        
        if(!arr_value.arreglo)
            return new Excepcion("Semantico","la variable '"+this.id+"' no es un array ",""+super.fila,""+super.columna);
            
            
        this.tipo = arr_value.tipo;   
        if(arr_value.valor instanceof Array){
            let last_value_array = arr_value.valor[arr_value.valor.length-1];
            arr_value.valor.pop();
            this.tipo = arr_value.tipo;
            return last_value_array
        }
                
    }

    getNodo() {
        const nodo=new NodoAST("POP");
        nodo.agregarHijo(this.id);
        return nodo;
    }


}
