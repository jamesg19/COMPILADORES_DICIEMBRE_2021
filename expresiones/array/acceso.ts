import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Excepcion } from "../../table/excepcion";
import { TIPO } from "../../table/tipo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';

export class Acceso extends Instruccion {

  id: string;
  list_expresiones: Instruccion[];
  tipo: TIPO;
  static ACCCESO:boolean = false;

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
    this.tipo = exist.tipo;

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
          return value_return = JSON.parse(JSON.stringify(temp[parseInt(index)]));
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
      const nodo= new NodoAST("ACCESO");
      nodo.agregarHijo(this.id);
      const lista_expresiones=new NodoAST("LISTA EXPRESIONES");
      
      if(this.list_expresiones!= null || this.list_expresiones!= undefined){
        this.list_expresiones.forEach((instr)=>{
          lista_expresiones.agregarHijoNodo(instr.getNodo());
        });
        nodo.agregarHijoNodo(lista_expresiones);
      }
      return nodo;
  }
  
  
  traducir(entorno: TablaSimbolos, arbol: Arbol): any {
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
    this.tipo = exist.tipo;

    if (contador == 1) temp = exist?.valor;

    this.list_expresiones.forEach((x) => {
      let index = x.traducir(entorno, arbol);
      
      if (index instanceof Excepcion) return index;

      if (!(x.tipo == TIPO.ENTERO))
        return new Excepcion(
          "Semantico",
          "Se esperaba una expresion numerica",
          super.fila + "",
          super.columna + ""
        );
        
        Principal.addComentario("Accediendo a un Arreglo");
        let temp = Principal.temp;
        temp++;
        let t = "t"+temp;
        Principal.temp = temp;
        
        Acceso.ACCCESO = true;
        Principal.historial += "stack[(int)"+(Principal.posicion+1)+"] = "+exist.posicion+";\n";
        Principal.historial += "stack[(int)"+(Principal.posicion+2)+"] = "+index+";\n";
        Principal.historial += "P = "+(Principal.posicion+1)+";\n";
        Principal.historial += "acces();\n";
        
        Principal.historial += t+" = P;\nprintString();\n";
        value_return = t+"/* esta es la referencia del heap*/";
      // contador--;
      // if (contador == 0) {
      //   if (temp instanceof Array) {
      //     if (index < 0 || index > temp.length)
      //       return value_return = new Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);
        
      //     return value_return = JSON.parse(JSON.stringify(temp[parseInt(index)]));
        
        
        
      //   }
      //   this.tipo = exist.tipo;
      //   value_return = JSON.parse(JSON.stringify(temp));
      //   //if()
      //   //value_return = new Excepcion("Semantico","no existe el indice indicado para el arreglo "+this.id,""+super.fila,""+super.columna);
      //   //return (value_return = JSON.parse(JSON.stringify(temp[index])));
      // } else {
      //   this.tipo = exist.tipo;
      //   temp = (temp)[index];
        
      // }
    });
    return value_return
    //return value_return;
  }
}
