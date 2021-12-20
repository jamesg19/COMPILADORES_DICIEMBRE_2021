import { Instruccion } from "../abs/Instruccion";
import { TIPO } from "../table/tipo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Arbol } from "../table/arbol";
import { Simbolo } from "../table/simbolo";
import { Excepcion } from "../table/excepcion";
import { NodoAST } from "../abs/nodo";
import { Principal } from "../principal";

export class List_Declaracion extends Instruccion {
  tipo: TIPO;
  list_id: any[];

  constructor(tipo: TIPO, list_id: any[], fila: number, columna: number) {
    super(fila, columna);
    this.tipo = tipo;
    this.list_id = list_id;
  }
  interpretar(entorno: TablaSimbolos, arbolL: Arbol) {
    let bandera:boolean=true;

    this.list_id.forEach((x) => {
      
      if(x instanceof Excepcion){
        bandera=false;
        //console.log(x);

      }
      if(bandera){

      
      let sim = entorno.consultar_en_tabla_actual(x);
      if (sim)
        return new Excepcion(
          "Semantico",
          x + " ya se encuentra definida",
          this.fila + "",
          "" + this.columna
        );

      let simbolo = new Simbolo(
        x,
        this.tipo,
        this.fila,
        this.columna,
        this.getValue(this.tipo),
        false,
        false
      );
      entorno.addSimbolo(simbolo);
    }else{
      console.log(x);
      //console.log("ENTRA EN ELSE");
      bandera=true;
    }
    });
  }
  getValue(tipo: TIPO) {
    switch (tipo) {
      case TIPO.BOOLEAN:
        return false;
      case TIPO.ENTERO:
        return 0;
      case TIPO.DECIMAL:
        return 0.0;
      case TIPO.CARACTER:
        return "";
      case TIPO.CADENA:
        return "";
      case TIPO.ARREGLO:
      case TIPO.STRUCT:
        return undefined;
    }
  }

  getNodo() {
    const nodo = new NodoAST("DECLARACION");
    this.list_id.forEach((instr) => {
      nodo.agregarHijo(this.tipo + "");
      nodo.agregarHijo(instr + "");
    });
    return nodo;
  }

  traducir(entorno: TablaSimbolos, arbol: Arbol) {
    this.list_id.forEach((x) => {
      let sim = entorno.getSimbolo(x);
      if (sim)
        return new Excepcion(
          "Semantico",
          x + " ya se encuentra definida",
          this.fila + "",
          "" + this.columna
        );

      let simbolo = new Simbolo(
        x,
        this.tipo,
        this.fila,
        this.columna,
        this.getValue(this.tipo),
        false,
        false
      );
      entorno.addSimbolo(simbolo);

      Principal.historial +="/*Declaracion de un Listado de Id, con el mismo Tipo*/\n";
        
      Principal.historial += "stack[(int) "+ simbolo.posicion+"] = "+simbolo.valor+" ;\n";
    });
  }
}
