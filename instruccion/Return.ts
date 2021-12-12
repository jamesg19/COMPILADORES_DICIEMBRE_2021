import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';

export class Return extends Instruccion {
  
  fila: number;
  columna:number
  has_value: boolean;
  value: Instruccion|undefined;
  return_value:any;
  /**
   * @param  {boolean} has_value
   * @param  {number} fila
   * @param  {number} columna
   * @param  {Instruccion} value?
   */
  constructor( has_value: boolean, fila:number,columna:number, value?: Instruccion) {
    super(fila, columna);
    this.fila = fila;
    this.columna = columna;
    this.value = value;
    this.has_value = has_value
    Object.assign(this, { has_value, value });
  }
  
  /**
   * @param  {TablaSimbolos} e
   * @param  {Arbol} arbol
   */
  interpretar(e: TablaSimbolos,arbol:Arbol) {
    console.log("Return");
    if(this.has_value && this.value != null){
      
      this.return_value = this.value.interpretar(e,arbol);
      console.log(this.return_value);
      return new Return(this.has_value, this.fila,this.columna,this.value);
      
    }
    else{
      console.log(this.return_value);
      return new Return(this.has_value, this.fila,this.columna);
    }
    
  }

}
