import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';

export class Ternario extends Instruccion{
    condicion: Instruccion;
    exp_true: Instruccion;
    exp_false: Instruccion;
  
    constructor( condicion: Instruccion, exp_true: Instruccion, exp_false: Instruccion,fila:number, columna:number){
      super(fila,columna);
      this.condicion = condicion;
      this.exp_true = exp_true;
      this.exp_false = exp_false;
      Object.assign(this, {condicion, exp_true, exp_false});
    }
  
    interpretar(e: TablaSimbolos,arbol:Arbol) {
      return this.condicion.interpretar(e,arbol) ? this.exp_true.interpretar(e,arbol) : this.exp_false.interpretar(e,arbol);
    }
  
  }
  