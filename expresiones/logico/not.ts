import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Excepcion } from '../../table/excepcion';
import { Arbol } from '../../table/arbol';
import { TIPO } from '../../table/tipo';


export class Not extends Instruccion{
    expression: Instruccion;

    constructor( expression: Instruccion,fila:number,columna:number){
      super(fila,columna);
      this.expression = expression;
      
    }
  
    interpretar(entorno: TablaSimbolos,arbol:Arbol):any {
        
      const expression1 = this.expression.interpretar(entorno,arbol);
      
      if(expression1 === undefined  || expression1 == null ) return new Excepcion("Semantico","No se puede negar, indefinido",super.fila+"",super.columna+"");
      
      if (expression1 instanceof Excepcion) return expression1;
      
      if(this.expression.tipo === TIPO.BOOLEAN) return !expression1;
      
      return new Excepcion("Semantico","Se requiere un tipo Boolean ", super.fila+"",super.columna+"");
    
    }
  }
  