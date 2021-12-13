import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/TipoNativo";
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from "../table/arbol";
import { Simbolo } from '../table/simbolo';
import { Excepcion } from "../table/excepcion";

export class List_Declaracion extends Instruccion{
    tipo:TIPO;
    list_id:string[];
    
    constructor(tipo:TIPO,list_id:string[],fila:number,columna:number){
        super(fila,columna);
        this.tipo = tipo;
        this.list_id = list_id;
    }
    interpretar(entorno:TablaSimbolos,arbolL:Arbol){
        this.list_id.forEach((x)=>{
            let sim = entorno.getSimbolo(x);
            if(sim)
            return new Excepcion("Semantico", x+ " ya se encuentra definida",this.fila+"",""+this.columna);
            
            let simbolo = new Simbolo(x,this.tipo,this.fila,this.columna,this.getValue(this.tipo),false,false);
            entorno.addSimbolo(simbolo);
        })
    }
    getValue(tipo: TIPO) {
        switch (tipo) {
          case TIPO.BOOLEAN:
            return false;
          case TIPO.ENTERO:
            return 0;
          case TIPO.DECIMAL:
            return 0.0;
          case TIPO.CARACTER:
            return "";
          case TIPO.CADENA:
            return "";
          case TIPO.ARREGLO:
          case TIPO.STRUCT:
            return undefined;
        }
      }
    
    
}