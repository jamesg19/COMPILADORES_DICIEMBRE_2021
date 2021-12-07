import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';

export class Diff extends Instruccion{
    expIzq: Instruccion;
    expDer: Instruccion;
  
    constructor( expIzq: Instruccion, expDer: Instruccion,fila:number,columna:number){
      super(fila,columna);
      this.expDer = expDer;
      this.expIzq = expIzq;
    }
  
    ejecutar(entorno: TablaSimbolos,arbol:Arbol) {
        
      const exp1 = this.expIzq.interpretar(entorno,arbol);
      const exp2 = this.expDer.interpretar(entorno, arbol);
  
      //verificar si son struct o arrayg
  
      return exp1 != exp2;
  
    }
  }
  