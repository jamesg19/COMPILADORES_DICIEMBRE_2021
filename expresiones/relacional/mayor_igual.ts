import { Instruccion } from "../../abs/Instruccion";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";

export class MayorIgual extends Instruccion {
  leftExpression: Instruccion;
  rigthExpression: Instruccion;
  tipo: TIPO;

  constructor(
    leftExpression: Instruccion,
    rigthExpression: Instruccion,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
    this.leftExpression = leftExpression;
    this.rigthExpression = rigthExpression;
    Object.assign(this, { leftExpression, rigthExpression });
    this.tipo = TIPO.NULL;
  }

  interpretar(e: TablaSimbolos, arbol: Arbol): any {
    const exp1 = this.leftExpression.interpretar(e, arbol);
    const exp2 = this.rigthExpression.interpretar(e, arbol);

    if (exp1 instanceof Excepcion) return exp1;
    if (exp2 instanceof Excepcion) return exp2;

    if (
      this.rigthExpression.tipo == TIPO.ARREGLO ||
      this.rigthExpression.tipo == TIPO.ARREGLO
    )
      return new Excepcion(
        "Semantico",
        "no se pueden comparar objetos ",
        super.fila + "",
        super.columna + ""
      );

    if (
      this.leftExpression.tipo == TIPO.ARREGLO ||
      this.leftExpression.tipo == TIPO.ARREGLO
    )
      return new Excepcion(
        "Semantico",
        "no se pueden comparar objetos ",
        super.fila + "",
        super.columna + ""
      );

    if (
      this.leftExpression.tipo == TIPO.NULL ||
      this.rigthExpression.tipo == TIPO.NULL
    )
      return new Excepcion(
        "Semantico",
        "variable NULL no se puede comparar ",
        super.fila + "",
        super.columna + ""
      );

    //MAYOR IGUAL
    //ENTERO >= ENTERO
    if (
      this.leftExpression.tipo === TIPO.ENTERO &&
      this.rigthExpression.tipo === TIPO.ENTERO
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1) >=this.obtenerVal(this.rigthExpression.tipo,exp2);
    }
    //ENTERO >= DECIMAL
    else if (
      this.leftExpression.tipo === TIPO.ENTERO &&
      this.rigthExpression.tipo === TIPO.DECIMAL
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1) >=this.obtenerVal(this.rigthExpression.tipo,exp2);
    }

    //DECIMAL >= ENTERO
    else if (
      this.leftExpression.tipo === TIPO.DECIMAL &&
      this.rigthExpression.tipo === TIPO.ENTERO
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1) >=this.obtenerVal(this.rigthExpression.tipo,exp2);
    }
    //DECIMAL >= DECIMAL
    else if (
      this.leftExpression.tipo === TIPO.DECIMAL &&
      this.rigthExpression.tipo === TIPO.DECIMAL
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1) >=this.obtenerVal(this.rigthExpression.tipo,exp2);
    }
    //BOOLEAN >= BOOLEAN
    else if (
      this.leftExpression.tipo === TIPO.BOOLEAN &&
      this.rigthExpression.tipo === TIPO.BOOLEAN
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1) >=this.obtenerVal(this.rigthExpression.tipo,exp2);
    }
  }
  getNodo() {
    const nodo = new NodoAST("RELACIONAL");
    if (this.rigthExpression != null || this.rigthExpression != undefined) {
      nodo.agregarHijoNodo(this.leftExpression.getNodo());
      nodo.agregarHijo(">=");
      nodo.agregarHijoNodo(this.rigthExpression.getNodo());
      return nodo;
    } else {
      nodo.agregarHijo(">=");
      nodo.agregarHijoNodo(this.leftExpression.getNodo());
      return nodo;
    }
  }

  obtenerVal(tipo: TIPO, val: string): any {
    try {
      if (tipo === TIPO.ENTERO || tipo === TIPO.DECIMAL) {
        return Number(val);
      } else if (tipo === TIPO.BOOLEAN) {
        if (val.toLowerCase() === "true") {
          return true;
        } else {
          return false;
        }
      } else if (tipo === TIPO.CADENA) {
        return val;
      } else {
        return val;
      }
    } catch (error) {
      return new Excepcion(
        "Semantico",
        `No se pudo obtener el valor en division`,
        `${this.fila}`,
        `${this.columna}`
      );
    }
  }
  traducir(e: TablaSimbolos, arbol: Arbol): any {
    const exp1 = this.leftExpression.traducir(e, arbol);
    const exp2 = this.rigthExpression.traducir(e, arbol);

    if (exp1 instanceof Excepcion) return exp1;
    if (exp2 instanceof Excepcion) return exp2;

    if (
      this.rigthExpression.tipo == TIPO.ARREGLO ||
      this.rigthExpression.tipo == TIPO.ARREGLO
    )
      return new Excepcion(
        "Semantico",
        "no se pueden comparar objetos ",
        super.fila + "",
        super.columna + ""
      );

    if (
      this.leftExpression.tipo == TIPO.ARREGLO ||
      this.leftExpression.tipo == TIPO.ARREGLO
    )
      return new Excepcion(
        "Semantico",
        "no se pueden comparar objetos ",
        super.fila + "",
        super.columna + ""
      );

    if (
      this.leftExpression.tipo == TIPO.NULL ||
      this.rigthExpression.tipo == TIPO.NULL
    )
      return new Excepcion(
        "Semantico",
        "variable NULL no se puede comparar ",
        super.fila + "",
        super.columna + ""
      );

    //MAYOR IGUAL
    //ENTERO >= ENTERO
    if (
      this.leftExpression.tipo === TIPO.ENTERO &&
      this.rigthExpression.tipo === TIPO.ENTERO
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.return_tem(exp1, exp2);
    }
    //ENTERO >= DECIMAL
    else if (
      this.leftExpression.tipo === TIPO.ENTERO &&
      this.rigthExpression.tipo === TIPO.DECIMAL
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.return_tem(exp1, exp2);
    }

    //DECIMAL >= ENTERO
    else if (
      this.leftExpression.tipo === TIPO.DECIMAL &&
      this.rigthExpression.tipo === TIPO.ENTERO
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.return_tem(exp1, exp2);
    }
    //DECIMAL >= DECIMAL
    else if (
      this.leftExpression.tipo === TIPO.DECIMAL &&
      this.rigthExpression.tipo === TIPO.DECIMAL
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.return_tem(exp1, exp2);
    }
    //BOOLEAN >= BOOLEAN
    else if (
      this.leftExpression.tipo === TIPO.BOOLEAN &&
      this.rigthExpression.tipo === TIPO.BOOLEAN
    ) {
      this.tipo = TIPO.BOOLEAN;
      return this.return_tem(exp1, exp2);
    }
  }
  return_tem(izq: any, der: any): string {
    let temp = Principal.temp;
    temp++;
    let t: string = "t" + temp;
    Principal.temp = temp;
    Principal.historial += t + "=" + izq + "<" + der + " ;\n";
    return t;
  }
}
