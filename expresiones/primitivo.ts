import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { NodoAST } from "../abs/nodo";

export class Primitivo extends Instruccion {
  fila: number;
  columna: number;
  tipo: TIPO;
  value: any;

  /**
   * @param  {TIPO} tipo
   * @param  {any} value
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(tipo: TIPO, value: any, fila: number, columna: number) {
    super(fila, columna);
    this.fila = fila;
    this.columna = columna;
    this.tipo = tipo;
    this.value = value;
  }
  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    //console.log(this.value);
    if(this.tipo==TIPO.ENTERO || this.tipo== TIPO.DECIMAL){
      return this.value;
    }
    return this.value;
  }
  getNodo(){
    const nodo=new NodoAST("PRIMITIVO");
    nodo.agregarHijo(this.value);
    return nodo;
  }
  traducir()
}
