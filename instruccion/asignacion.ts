import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
import { Excepcion } from '../table/excepcion';

export class Asignacion extends Instruccion {
    
    id: string;
    exp: Instruccion;
  
    constructor( id:string, exp: Instruccion,linea: number,columna:number) {
      super(linea,columna);
      this.id = id;
      this.exp = exp;
      
    }
  
    interpretar(e: TablaSimbolos,arbol:Arbol):any {
      
      const variable = e.getSimbolo(this.id);
      if (!variable) {
        return new Excepcion("Semantico","No existe la variable "+this.id,super.fila+'',super.columna+"");
      }
      //verifico si es una constante
      if (variable.constante) {
        return new Excepcion("Semantico","No se puede cambiar de valor a una constante "+this.id,super.fila+'',super.columna+"");
        
      }
  
      let valor = this.exp.interpretar(e,arbol);
      let value = JSON.parse(JSON.stringify(valor))
      
      if((this.exp.tipo != variable.tipo))
          return new Excepcion("Semantico","Tipos diferentes "+this.id,super.fila+'',super.columna+"");
     
     variable.valor = value;
     e.actualizarSimboloEnTabla(variable);
  
    }
  
  }
  