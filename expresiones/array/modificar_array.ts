import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { exit } from "process";
import { TIPO } from '../../table/TipoNativo';

export class Modificar extends Instruccion {
  id: string;
  list_expresiones: Instruccion[];
  exp: Instruccion;
  /**
   * @param  {string} id
   * @param  {Instruccion[]} list_expresiones
   * @param  {Instruccion} exp
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    id: string,
    list_expresiones: Instruccion[],
    exp: Instruccion,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    this.list_expresiones = list_expresiones;
    this.exp = exp;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    let exist = entorno.getSimbolo(this.id);//verifico que exista la variable

    if (!exist)  
      return new Excepcion(
        "Semantico",
        "No se encontro " + this.id,
        super.fila + "",
        super.columna + ""
      );
    if (!exist.arreglo) //verifico que sea un arreglo
      new Excepcion(
        "Semantico",
        "No es un arragle " + this.id,
        super.fila + "",
        super.columna + ""
      );

    let value_exp = this.exp.interpretar(entorno, arbol);

    if (value_exp instanceof Excepcion) return value_exp; //verifico la expresion
    

    if (!(exist.tipo == this.exp.tipo))
      return new Excepcion(
        "Semantico",
        "No coinciden los tipos " + this.id,
        super.fila + "",
        super.columna + ""
      );
      
      
    this.list_expresiones.forEach((x)=>{
        
        let index = x.interpretar(entorno,arbol);
        if(index instanceof Excepcion) return index;
        
        if(!((typeof index) ===  "number" )) return new Excepcion ("Semantico","Se esperaba una expresion numerica", super.fila+"", super.columna+"");
        
        let val = JSON.parse(JSON.stringify(value_exp));
    
        if(exist?.valor instanceof Array) 
        (exist?.valor)[index] = val;
        
        
        
    });
  }
  
}
