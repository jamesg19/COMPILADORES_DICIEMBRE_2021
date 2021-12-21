import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Simbolo } from "../table/simbolo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { Break } from "./break";
import { Return } from "./Return";
import { If } from "./if";
import { NodoAST } from "../abs/nodo";
import { Principal } from "../principal";

export class Funcion extends Instruccion {
  id: string;
  instrucciones: Array<Instruccion>;
  tipo_return: TIPO;
  tipo: TIPO;
  lista_parametros?: Array<Simbolo>;
  posicion:number;

  constructor(
    id: string,
    instrucciones: Array<Instruccion>,
    tipo_return: TIPO = TIPO.VOID,
    fila: number,
    columna: number,
    lista_parametros?: Array<Simbolo>
  ) {
    super(fila, columna);
    this.id = id;
    this.instrucciones = instrucciones;
    this.tipo = tipo_return;
    this.lista_parametros = lista_parametros;
    this.tipo_return = tipo_return;
    Object.assign(this, { id, instrucciones, tipo_return, lista_parametros });
  }
  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    let entorno_local: TablaSimbolos = new TablaSimbolos(entorno);
    let return_value;

    this.instrucciones.forEach((instruccion) => {
      let value = instruccion.interpretar(entorno_local, arbol);

      if (value instanceof Excepcion) {
        arbol.excepciones.push(value);
        arbol.consola = arbol.consola + value;
      }
      if (value instanceof Break) {
        arbol.excepciones.push(
          new Excepcion(
            "Semantico",
            "Sentencia break fuera de ciclo ",
            super.fila + "",
            super.columna + ""
          )
        );
        arbol.consola = arbol.consola + value;
      }

      if (value instanceof Return) {
        //this.tipo = value

        if (this.tipo == value.value.tipo) {
          //return  return_value = instruccion.return_value;
          //console.log(value.value?.interpretar(entorno,arbol)+" VALOR KK");
          return (return_value = value.return_value);
        }
      }
    });
    return return_value;
  }
  hasReturn(): boolean {
    return this.tipo_return != TIPO.VOID;
  }

  hasParametros(): boolean {
    return this.lista_parametros != null;
  }

  getParametrosSize(): number | undefined {
    if (this.lista_parametros)
      return this.hasParametros() ? this.lista_parametros.length : 0;
    return undefined;
  }

  public toString(): string {
    const parametros =
      this.lista_parametros != null ? this.lista_parametros.length : 0;
    let salida = `Funcion: ${
      this.id
    } - Parametros: ${parametros} - Return Asignado: ${
      this.hasReturn() ? "Si" : "No"
    }`;
    return salida;
  }
  getNodo() {
    const nodo = new NodoAST("FUNCION");
    nodo.agregarHijo(this.id);
    const parametros = new NodoAST("PARAMETROS");

    if (this.lista_parametros != null) {
      this.lista_parametros.forEach((instr) => {
        const parametro = new NodoAST("PARAMETROS");
        parametro.agregarHijo(instr.tipo + "");
        parametro.agregarHijo(instr.id + "");
        parametros.agregarHijoNodo(parametro);
      });
      nodo.agregarHijoNodo(parametros);
    }
    const instrucciones = new NodoAST("INSTRUCCIONES");
    if (this.instrucciones != null) {
      this.instrucciones.forEach((instr) => {
        instrucciones.agregarHijoNodo(instr.getNodo());
      });
      nodo.agregarHijoNodo(instrucciones);
    }
    return nodo;
  }
  
  
  traducir(entorno: TablaSimbolos, arbol: Arbol) {
    
    let entorno_local: TablaSimbolos = new TablaSimbolos(entorno);
    let return_value;
    Principal.addComentario("  Traduciendo Funcion  "+this.id);

    Principal.historial += "void "+this.id+"(){\n";
    
    let temp = Principal.temp;
    temp++;
    let t = "t"+temp+";\n";//puntero de parametros
    
    
    this.instrucciones.forEach((instruccion) => {
      
      let value = instruccion.traducir(entorno_local, arbol);
   
      if (value instanceof Excepcion) {
        arbol.excepciones.push(value);
        arbol.consola = arbol.consola + value;
      }
      if (value instanceof Break) {
        arbol.excepciones.push(
          new Excepcion(
            "Semantico",
            "Sentencia break fuera de ciclo ",
            super.fila + "",
            super.columna + ""
          )
        );
        arbol.consola = arbol.consola + value;
      }

      if (value instanceof Return) {
        //this.tipo = value

        if (this.tipo == value.value.tipo) {
          //return  return_value = instruccion.return_value;
          //console.log(value.value?.traducir(entorno,arbol)+" VALOR KK");
          Principal.addComentario("se encontro Return Cambiando Puntero");
          
          return (return_value = value.return_value);
        }
      }
    });
    
    Principal.historial += "return ;"
    //""return"" return_value;
    Principal.historial += "\n}\n";
  }
}
