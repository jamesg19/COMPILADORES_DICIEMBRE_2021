import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { TIPO } from '../../table/tipo';
import { Arbol } from '../../table/arbol';

export class Diff extends Instruccion{
    expIzq: Instruccion;
    expDer: Instruccion;
    tipo:TIPO;
  
    constructor( expIzq: Instruccion, expDer: Instruccion,fila:number,columna:number){
      super(fila,columna);
      this.expDer = expDer;
      this.expIzq = expIzq;
      this.tipo = TIPO.NULL;
    }
  
    interpretar(entorno: TablaSimbolos,arbol:Arbol):any {
        
      const exp1 = this.expIzq.interpretar(entorno,arbol);
      const exp2 = this.expDer.interpretar(entorno, arbol);
  
      //verificar si son struct o arrayg
      
      
      //Validacion item por item solo si se esta comparando arreglos
          if(exp1.tipo == TIPO.ARREGLO && exp2.tipo == TIPO.ARREGLO){
            //Si no tienen la misma cantidad de items no son iguales
            if(exp1.getSize() != exp2.getSize()) {this.tipo = TIPO.BOOLEAN;return true;}
      
            //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
            for(let i = 0; i < exp1.getSize(); i++){
              if(exp1.getValue(i) != exp2.getValue(i)) {this.tipo = TIPO.BOOLEAN;return true;}
            }
            this.tipo = TIPO.BOOLEAN;      
            return false;
          }
      
      
      this.tipo = TIPO.BOOLEAN;
      return exp1 != exp2;
      
  
    }
  }
  