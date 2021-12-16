import { Instruccion } from '../../abs/Instruccion';
import { TIPO } from '../../table/tipo';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { Excepcion } from '../../table/excepcion';
import { Simbolo } from '../../table/simbolo';
import { NodoAST } from '../../abs/nodo';

export class Arreglo_Valor extends Instruccion{
    tipo:TIPO;
    id:string;
    id_valor:string;
    
    constructor(tipo:TIPO,id:string,id_valor:string,fila:number,columna:number){
        super(fila,columna);
        this.tipo = tipo;
        this.id = id;
        this.id_valor = id_valor;
    }
    
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        
        let simbolo = entorno.getSimbolo(this.id_valor);
        if( simbolo == undefined ){
            return new Excepcion("Semantico","No se encuentra el Array: "+ this.id_valor,""+this.fila, this.columna+"");
        }
        if(!simbolo.arreglo)
            return new Excepcion("Semantico","No es un Array: "+ this.id_valor,""+this.fila, this.columna+"");
        
        if(this.tipo != simbolo.tipo)
            return new Excepcion("Semantico","No Coinciden los tipos "+ this.id_valor,""+this.fila, this.columna+"");
            
            
        let sim = entorno.getSimbolo(this.id);
        
        if(sim == undefined ){
            let value = JSON.parse(JSON.stringify(simbolo.valor));
            
            let new_array:Simbolo = new Simbolo(this.id,this.tipo,super.fila,super.columna,value,true,false);
            entorno.addSimbolo(new_array);
        }
        
        
    
    }
    getNodo() {
        const nodo= new NodoAST("VALOR ARRAY");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo(this.id_valor);

        return nodo;


    }
    
    
}