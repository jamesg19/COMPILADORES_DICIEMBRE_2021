import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/tipo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from "../../table/simbolo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";
import { Resultado3D } from "../../traduccion/resultador3d";

export class Arreglo extends Instruccion {
  id: string;
  tipo: TIPO;
  t_esperado: TIPO;
  corchete: number;
  lst_expresiones: Instruccion[];

  /**
   * @param  {string} id
   * @param  {TIPO} tipo
   * @param  {TIPO} t_esperado
   * @param  {number} corchete
   */
  constructor(
    tipo: TIPO,
    id: string,
    lst_expresiones: Instruccion[],
    t_esperado: TIPO,
    corchete: number,
    fila: number,
    columna: number
  ) {
    super(fila, columna);
    this.id = id;
    this.lst_expresiones = lst_expresiones;
    this.tipo = tipo;
    this.t_esperado = t_esperado;
    this.corchete = corchete;
  }

  /**para array's de tipo int[] a = [lista_expresion]
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    let value_array: any[] = [];

    this.lst_expresiones.forEach((x) => {
      let result_value;
      if (x instanceof Instruccion) {
        result_value = x.interpretar(entorno, arbol);

        if (x.tipo != this.tipo) {
          console.log(
            "x.tipo != this.tipo",
            x.tipo != this.tipo,
            x.tipo,
            this.tipo
          );
          return new Excepcion(
            "Semantico",
            "Se esta asigando un tipo de valor inesperado",
            "" + super.fila,
            "" + this.columna
          );
        }
      } else {
        result_value = this.copyExpDeep(entorno, arbol, x);
      }
      if (result_value instanceof Excepcion) return result_value;

      let value = JSON.parse(JSON.stringify(result_value));

      if (value instanceof Excepcion) return value;

      value_array.push(value);
    });

    let value_object = JSON.parse(JSON.stringify(value_array));

    let simbolo: Simbolo = new Simbolo(
      this.id,
      this.tipo,
      super.fila,
      super.columna,
      value_object,
      true,
      false
    );
    entorno.addSimbolo(simbolo);
  }

  copyExpDeep(
    entorno: TablaSimbolos,
    arbol: Arbol,
    element: Instruccion[]
  ): any[] {
    let value_array: any[] = [];
    let result_value;

    element.forEach((x: Instruccion) => {
      if (!(x instanceof Instruccion)) {
        result_value = this.copyExpDeep(entorno, arbol, x);
      } else {
        result_value = x.interpretar(entorno, arbol);
        if (x.tipo != this.tipo) {
          return new Excepcion(
            "Semantico",
            "Se esta asigando un tipo de valor inesperado",
            "" + super.fila,
            "" + this.columna
          );
        }
      }
      if (result_value instanceof Excepcion) return result_value;

      let value = JSON.parse(JSON.stringify(result_value));

      if (value instanceof Excepcion) return value;

      value_array.push(value);
    });
    return value_array;
  }

  getNodo(): NodoAST {
    const nodo = new NodoAST("DECLARACION ARRAY");
    const lista_expresiones = new NodoAST("LISTA EXPRESION");
    if (this.tipo == TIPO.ARREGLO) {
      nodo.agregarHijo("ARREGLO");
    } else if (this.tipo == TIPO.BOOLEAN) {
      nodo.agregarHijo("BOOLEAN");
    } else if (this.tipo == TIPO.CADENA) {
      nodo.agregarHijo("CADENA");
    } else if (this.tipo == TIPO.CARACTER) {
      nodo.agregarHijo("CARACTER");
    } else if (this.tipo == TIPO.DECIMAL) {
      nodo.agregarHijo("DECIMAL");
    } else if (this.tipo == TIPO.ENTERO) {
      nodo.agregarHijo("ENTERO");
    } else if (this.tipo == TIPO.NULL) {
      nodo.agregarHijo("NULL");
    } else if (this.tipo == TIPO.STRUCT) {
      nodo.agregarHijo("STRUCT");
    } else if (this.tipo == TIPO.VOID) {
      nodo.agregarHijo("VOID");
    }
    nodo.agregarHijo(this.id);

    if (this.lst_expresiones != null || this.lst_expresiones != undefined) {
      this.lst_expresiones.forEach((element) => {
        lista_expresiones.agregarHijoNodo(element.getNodo());
      });
      nodo.agregarHijoNodo(lista_expresiones);
    }

    return nodo;
  }

  traducir(entorno: TablaSimbolos, arbol: Arbol): any {
    Principal.addComentario("Declarando Arreglos");

    let value_array: any[] = [];

    let temp = Principal.temp;
    temp++;
    let th_position = "t" + temp;

    Principal.temp = temp;
    Principal.historial +=
      th_position +
      "= H; //Posicion inicial que ocupara el array en  el heap\n";

    let contador = 0;
    this.lst_expresiones.forEach((x) => {
      
      let result_value
      if(x.tipo != TIPO.CADENA)
       result_value= x.traducir(entorno, arbol);

      if (x.tipo != this.tipo) {
        console.log(
          "x.tipo != this.tipo",
          x.tipo != this.tipo,
          x.tipo,
          this.tipo
        );
        return new Excepcion(
          "Semantico",
          "Se esta asigando un tipo de valor inesperado",
          "" + super.fila,
          "" + this.columna
        );
      }

      //verificar si es una cadena
      if (x.tipo == TIPO.CADENA) {
        this.transform_cadena(x.value,contador);
        contador--;
      } else {
        //let value = JSON.parse(JSON.stringify(result_value));
        Principal.historial += "heap[(int) H] = " + result_value + ";\n";
        Principal.historial += "H = H + 1;\n";
      }
    });

    let value_object = JSON.parse(JSON.stringify(value_array));

    let simbolo: Simbolo = new Simbolo(
      this.id,
      this.tipo,
      super.fila,
      super.columna,
      value_object,
      true,
      false
    );

    entorno.addSimbolo(simbolo);
    Principal.addComentario("Agregando referencia del heap en el stack");

    Principal.historial += "heap[(int) H] = " + -1 + ";\n";
    Principal.historial += "H = H + 1;\n";

    let temp1 = Principal.temp;
    temp1++;
    Principal.temp = temp1;

    let ts = "t" + temp1;
    Principal.historial += ts + " = " + simbolo.posicion + ";\n";
    Principal.addComentario("simbolo posicion "+simbolo.posicion)
    Principal.historial += "stack[(int) " + simbolo.posicion + "] = " + th_position + ";\n";

    Principal.addComentario("Fin De La De");
  }

  transform_cadena(x: string,contador:number): string {
    let return_string: string = "";
    
    Principal.addComentario("Pasando cadena al heap , '" + x + "'");
    if (!x) x = "Undefined";

    for (let i = 0; i < x.length; i++) {
      let item: number = x.charCodeAt(i);
      return_string += "heap[(int)H] = " + item + " ;\n";
      return_string += "H = H + 1;\n";
      //console.log(item);
    }
    return_string += "heap[(int)H] = -1;\n";
    return_string += "H = H + 1;\n";

    //referencia de la cadena desde el stack
    //Principal.posicion;

    //let temp2 = Principal.posicion+1+"";
    //return_string +="stack[(int)"+(temp2)+"] = " +t+";\n";

    Principal.historial += return_string;

    Principal.addComentario("Fin de pasar cadena al heap");
    //"t" + Principal.temp + " = P + " + Principal.posicion + ";\n";

    //return //temp2;
  }
}
