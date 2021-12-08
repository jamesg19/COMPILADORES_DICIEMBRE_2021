import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';

export class Return extends Instruccion {
  fila: number;
  columna:number
  has_value: boolean;
  value: Instruccion|undefined;
  return_value:any;

  constructor( has_value: boolean, fila:number,columna:number, value?: Instruccion) {
    super(fila, columna);
    this.fila = fila;
    this.columna = columna;
    this.value = value;
    this.has_value = has_value
    Object.assign(this, { has_value, value });
  }

  interpretar(e: TablaSimbolos,arbol:Arbol) {
    if(this.has_value && this.value != null){
      this.value = this.value.interpretar(e,arbol);
      return new Return(this.has_value, this.fila,this.columna,this.value);
    }
    else{
      return new Return(this.has_value, this.fila,this.columna);
    }
  }

}
