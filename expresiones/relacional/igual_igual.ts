import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { TIPO } from '../../table/tipo';
import { Excepcion } from '../../table/excepcion';

export class IgualIgual extends Instruccion{
    
    leftExpression: Instruccion;
    rightExpression: Instruccion;
    tipo:TIPO;
    constructor(leftExpression: Instruccion, rightExpression: Instruccion,fila: number,columna:number ){
        
      super(fila,columna);
      this.rightExpression = rightExpression;
      this.leftExpression = leftExpression;
      this.tipo = TIPO.NULL;
      
    }
  
    interpretar(entorno: TablaSimbolos,arbol:Arbol ):any {
      const exp1 = this.leftExpression.interpretar(entorno,arbol);
      const exp2 = this.rightExpression.interpretar(entorno,arbol);
      
      //Validacion item por item solo si se esta comparando arreglos
      if(exp1 instanceof Excepcion) return exp1;
      if(exp2 instanceof Excepcion) return exp2;
      
      if(exp1.tipo == TIPO.ARREGLO && exp2.tipo == TIPO.ARREGLO){
        //Si no tienen la misma cantidad de items no son iguales
        if(exp1.getSize() != exp2.getSize()) return false;
  
        //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
        for(let i = 0; i < exp1.getSize(); i++){
          if(exp1.getValue(i) != exp2.getValue(i)){ this.tipo = TIPO.BOOLEAN; return false;}
        }
        this.tipo = TIPO.BOOLEAN;
        return true;
      }
      console.log("falta comparar el struct")
      this.tipo = TIPO.BOOLEAN;
      return exp1 == exp2;

    }
  }
  