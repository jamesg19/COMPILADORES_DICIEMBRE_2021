import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/tipo";
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';

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

    if (this.leftExpressio.tipo === TIPO.BOOLEAN && this.rightExpression.tipo == TIPO.BOOLEAN) {
      this.tipo = TIPO.BOOLEAN;
      
      return exp1||exp2;
    }
    console.log("ERROR EN ||");
    return new Excepcion("Semantico","Se requiere un tipo Boolean ",super.fila + "",super.columna + "");
  }

  getNodo(){
    const nodo= new NodoAST("LOGICA");
    if( (this.rightExpression!=null) || (this.rightExpression != undefined)){
        nodo.agregarHijoNodo(this.leftExpressio.getNodo());
        nodo.agregarHijo("OR");
        nodo.agregarHijoNodo(this.rightExpression.getNodo());
        return nodo;
    }else{
        nodo.agregarHijo("OR");
        nodo.agregarHijoNodo(this.leftExpressio.getNodo());
        return nodo;
    }
    return nodo;
}

  obtenerVal(tipo:TIPO,val:string):any{
      try {
          if(tipo === TIPO.ENTERO|| tipo === TIPO.DECIMAL){
              return Number(val);
          }
          else if(tipo === TIPO.BOOLEAN){
              if(val.toLowerCase() === "true"){
                  return true;
              }else{
                  return false;
              }
          }
          else if(tipo === TIPO.CADENA){
              return val;
          }else{
              return val;
          }
  
      } catch (error) {
          return new Excepcion("Semantico",`No se pudo obtener el valor en division`,`${this.fila}`,`${this.columna}`);
      }
  
    }
  
    traducir(entorno: TablaSimbolos, arbol: Arbol): any {
      const exp1 = this.leftExpressio.traducir(entorno, arbol);
      const exp2 = this.rightExpression.traducir(entorno, arbol);
      //comprobacion de errores
      if (exp1 instanceof Excepcion) return exp1;
      if (exp2 instanceof Excepcion) return exp2;
  
      if (this.leftExpressio.tipo === TIPO.BOOLEAN && this.rightExpression.tipo == TIPO.BOOLEAN) {
        this.tipo = TIPO.BOOLEAN;
        
        let temp = Principal.temp ;
        temp ++;
        let t = "t"+temp;
        Principal.temp =  temp;
        Principal.historial += t+" = "+exp1 +" || "+exp2+";\n";
        
        
        return exp1||exp2;
      }
      console.log("ERROR EN ||");
      return new Excepcion("Semantico","Se requiere un tipo Boolean ",super.fila + "",super.columna + "");
    }
}
