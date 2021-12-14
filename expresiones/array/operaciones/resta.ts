import { Instruccion } from '../../../abs/Instruccion';
import { Arbol } from '../../../table/arbol';
import { TablaSimbolos } from '../../../table/tablasimbolos';
import { Simbolo } from '../../../table/simbolo';
import { Excepcion } from '../../../table/excepcion';
import { TIPO } from '../../../table/tipo';
import { NodoAST } from '../../../abs/nodo';

export class Resta_Arr extends Instruccion {
    
    id:string;
    exp:Instruccion;
    
    constructor(id:string,exp:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.id = id;
        this.exp = exp;
    }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        let arr = entorno.getSimbolo(this.id);
        
        
        if(!(arr instanceof Simbolo))
        return new Excepcion("Internal","V8 esta presentando errores",this.fila+"",this.columna+"");
        
        
        if(!arr)
        return new Excepcion("Internal","No existe ",this.fila+"",this.columna+"");
        
        let value_exp = this.exp.interpretar(entorno,arbol);
        
        if(!value_exp)
        return new Excepcion("Internal","valor de expresion erroneo ",this.fila+"",this.columna+"");
        
        if (value_exp instanceof Excepcion) return value_exp;
        
        if(!(this.exp.tipo == TIPO.ENTERO))
        return new Excepcion("Semantico","Se requiere un valor numerico",this.fila+"",this.columna+"");
        
        if(!(arr.valor instanceof Array))
        return new Excepcion("Semantico","Se esperaba un Arrego "+this.id,this.fila+"",this.columna+"");
     
         
        let value_result = arr.valor.map((x)=> x - value_exp);
        return value_result;
    }

    getNodo():NodoAST {
        const nodo= new NodoAST("RESTA #");
        nodo.agregarHijo(this.id);
        nodo.agregarHijoNodo(this.exp.getNodo());
        return nodo;
        
    }
    
}