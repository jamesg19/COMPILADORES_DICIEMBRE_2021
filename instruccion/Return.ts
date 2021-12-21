import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Arbol } from '../table/arbol';
import { TIPO } from '../table/tipo';
import { NodoAST } from '../abs/nodo';

export class Return extends Instruccion {
  
  fila: number;
  columna:number
  has_value: boolean;
  value: Instruccion|undefined;
  return_value:any;
  tipo:TIPO;
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
    this.tipo = TIPO.VOID;
    Object.assign(this, { has_value, value });
  }
  
  /**
   * @param  {TablaSimbolos} e
   * @param  {Arbol} arbol
   */
  interpretar(e: TablaSimbolos,arbol:Arbol) {
    
    if(this.has_value && this.value != null){
      
      this.return_value = this.value.interpretar(e,arbol);
      this.tipo = this.value.tipo;  
      return this;
      
    }
    else{
      
      return this;
    }
    
  }

  getNodo() {
      const nodo=new NodoAST("RETURN");
      if(this.has_value){
        nodo.agregarHijoNodo(this.value?.getNodo());         
      }
      return nodo;
  }
  traducir(entorno: TablaSimbolos, arbol: Arbol) {
    //si viene un valor en el return
      if(this.has_value){
        this.value.traducir(entorno,arbol);
      }else{
        
      }
  }


}
