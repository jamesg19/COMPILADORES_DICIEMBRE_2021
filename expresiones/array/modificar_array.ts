import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { exit } from "process";
import { TIPO } from "../../table/tipo";
import { NodoAST } from "../../abs/nodo";

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

    let value_exp = this.exp.interpretar(entorno, arbol);

    if (value_exp instanceof Excepcion) return value_exp; //verifico la expresion

    if (!(exist.tipo == this.exp.tipo))
      return new Excepcion(
        "Semantico",
        "No coinciden los tipos " + this.id,
        super.fila + "",
        super.columna + ""
      );

    let contador = this.list_expresiones.length;
    let temp;

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
        let val = JSON.parse(JSON.stringify(value_exp));
        if (exist?.valor instanceof Array) (temp)[index] = val;
        
      }else{
          temp = (exist?.valor)[index];
      }
      
    });
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

  getNodo() {
      const nodo=new NodoAST("MODIFICAR ARRAY");
      nodo.agregarHijo(this.id);

      const pos= new NodoAST("POSICION");
      if(this.list_expresiones!= null || this.list_expresiones !=  undefined){
        this.list_expresiones.forEach((element)=>{
            pos.agregarHijoNodo(element.getNodo());
        });
        nodo.agregarHijoNodo(pos);
      }
      return nodo;
  }


}
