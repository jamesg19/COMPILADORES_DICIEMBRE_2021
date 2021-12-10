import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { exit } from "process";
import { TIPO } from "../../table/TipoNativo";

export class Acceso extends Instruccion {
  id: string;
  list_expresiones: Instruccion[];
  
  /**
   * @param  {string} id
   * @param  {Instruccion[]} list_expresiones
   * @param  {number} fila
   * @param  {number} columna
   */
  constructor(
    id: string,
    list_expresiones: Instruccion[],
    
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    this.list_expresiones = list_expresiones;
    
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol):any {
    let exist = entorno.getSimbolo(this.id); //verifico que exista la variable

    if (!exist)
      return new Excepcion(
        "Semantico",
        "No se encontro " + this.id,
        super.fila + "",
        super.columna + ""
      );
    if (!exist.arreglo)
      //verifico que sea un arreglo
      new Excepcion(
        "Semantico",
        "No es un arragle " + this.id,
        super.fila + "",
        super.columna + ""
      );

    



    
    let contador = this.list_expresiones.length;
    let temp;
    let value_return;

    if(contador == 1) temp = (exist?.valor);
    
    this.list_expresiones.forEach((x) => {
        
      let index = x.interpretar(entorno, arbol);
      if (index instanceof Excepcion) return index;

      if (!(x.tipo == TIPO.ENTERO))
        return new Excepcion(
          "Semantico",
          "Se esperaba una expresion numerica",
          super.fila + "",
          super.columna + ""
        );

      contador--;
      
      if ((contador == 0)) {
        if (exist?.valor instanceof Array) {
              value_return =JSON.parse(JSON.stringify((temp)[index])) ;
             
            //return value_return;
          }
        return value_return = JSON.parse(JSON.stringify((temp)[index])) ;
        
      }else{
          temp = (exist?.valor)[index];
      }
      
    });
    return value_return;
  }
  modificarIndex(lst: any, valor: any, entorno: TablaSimbolos, arbol: Arbol) {
    this.lst.forEach((x) => {
      let index = x.interpretar(entorno, arbol);
      if (index instanceof Excepcion) return index;

      if (!(x.tipo == TIPO.ENTERO))
        return new Excepcion(
          "Semantico",
          "Se esperaba una expresion numerica",
          super.fila + "",
          super.columna + ""
        );

      let val = JSON.parse(JSON.stringify(value_exp));

      if (exist?.valor instanceof Array) (exist?.valor)[index] = val;
    });
  }
}
