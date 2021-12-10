import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/tipo";
import { Primitivo } from "../primitivo";

export class Or extends Instruccion {
  leftExpressio: Primitivo;
  rightExpression: Primitivo;
  tipo: TIPO;

  /**
   * @param  {Primitivo} leftExpressio
   * @param  {Primitivo} rightExpression
   * @param  {number} linea
   * @param  {number} columna
   */
  constructor(
    leftExpressio: Primitivo,
    rightExpression: Primitivo,
    linea: number,
    columna: number
  ) {
    super(linea, columna);
    this.rightExpression = rightExpression;
    this.leftExpressio = leftExpressio;
    this.tipo = TIPO.NULL;
  }

  /**
   * @param  {TablaSimbolos} entorno
   * @param  {Arbol} arbol
   * @returns any
   */
  interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
    const exp1 = this.leftExpressio.interpretar(entorno, arbol);
    const exp2 = this.rightExpression.interpretar(entorno, arbol);
    //comprobacion de errores
    if (exp1 instanceof Excepcion) return exp1;
    if (exp2 instanceof Excepcion) return exp2;

    if (
      this.leftExpressio.tipo === TIPO.BOOLEAN &&
      this.rightExpression.tipo == TIPO.BOOLEAN
    ) {
      this.tipo = TIPO.BOOLEAN;
      
      return exp1 || exp2;
    }
    return new Excepcion(
      "Semantico",
      "Se requiere un tipo Boolean ",
      super.fila + "",
      super.columna + ""
    );
  }
}
