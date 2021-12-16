
import { Instruccion } from '../../abs/Instruccion';
import { TIPO } from '../../table/tipo';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { Excepcion } from '../../table/excepcion';
import { NodoAST } from '../../abs/nodo';

export class Push extends Instruccion {
    
    id:string;
    exp:Instruccion;
    tipo:TIPO;
    
    constructor(id:string, exp:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.id = id;
        this.exp = exp;
        this.tipo = TIPO.NULL;
    }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        
        let exp_value = this.exp.interpretar(entorno,arbol);
        
        if(exp_value instanceof Excepcion) return exp_value;
        
        
        let arr_value = entorno.getSimbolo(this.id);
        
        //if (arr_value.tipo != this.exp.tipo) return new Excepcion("Semantico","No coinciden los tipos", super.fila+"",super.columna+"");
        
        if(arr_value instanceof Excepcion ) return arr_value;
        
        if(!arr_value)
            return new Excepcion("Semantico","la variable"+this.id+" no existe ",""+super.fila,""+super.columna);
        
        if(arr_value.tipo )
            return new Excepcion("Semantico","la variable"+this.id+" no es un array ",""+super.fila,""+super.columna);
            
            
        this.tipo = arr_value.tipo;   
        if(arr_value.valor instanceof Array){ 
            arr_value.valor.push(exp_value);
            //return last_value_array
            this.tipo = TIPO.BOOLEAN;
            return true;
        }
        this.tipo = TIPO.NULL;
        return new Excepcion("Semantico","Push se aplica en arrays, "+this.id+" no es un array",super.fila+"",super.columna+"");        
    }

    getNodo() {
        const nodo=new NodoAST("PUSH");
        nodo.agregarHijo(this.id);
        return nodo;
    }


}
