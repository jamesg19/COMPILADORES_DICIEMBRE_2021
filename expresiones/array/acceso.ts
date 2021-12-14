import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { TIPO } from "../../table/tipo";
import { NodoAST } from "../../abs/nodo";

export class Acceso extends Instruccion {

  id: string;
  list_expresiones: Instruccion[];
  tipo: TIPO;

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
    this.tipo = TIPO.NULL;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
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
    let temp:any =  (exist.valor);
    let value_return;

    if (contador == 1) temp = exist?.valor;

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

      if (contador == 0) {
        if (temp instanceof Array) {
          if (index < 0 || index > temp.length)
            return value_return = new Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);

          return value_return = JSON.parse(JSON.stringify(temp[index]));
        }
        this.tipo = exist.tipo;
        value_return = JSON.parse(JSON.stringify(temp));
        //if()
        //value_return = new Excepcion("Semantico","no existe el indice indicado para el arreglo "+this.id,""+super.fila,""+super.columna);
        //return (value_return = JSON.parse(JSON.stringify(temp[index])));
      } else {
        this.tipo = exist.tipo;
        temp = (temp)[index];
        
      }
    });
    return value_return;
  }
  getNodo():NodoAST {
      const nodo= new NodoAST("ACCESO ");
      nodo.agregarHijo(this.id);

      this.list_expresiones.forEach((instr)=>{
        nodo.agregarHijoNodo(instr.getNodo());
      });
      return nodo;
  }
}
