import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { TIPO } from '../../table/tipo';
import { Arbol } from '../../table/arbol';
import { Excepcion } from '../../table/excepcion';


export class Menor extends Instruccion{
  leftExpression: Instruccion;
  rigthExpression: Instruccion;

  constructor( leftExpression: Instruccion, rigthExpression: Instruccion,linea:number,columna:number){
    super(linea,columna);
    this.leftExpression = leftExpression;
    this.rigthExpression = rigthExpression;
    Object.assign(this, {leftExpression, rigthExpression});
  }

  interpretar(e: TablaSimbolos,arbol:Arbol):any {
    const exp1 = this.leftExpression.interpretar(e,arbol);
    const exp2 = this.rigthExpression.interpretar(e,arbol);

    if( exp1 instanceof Excepcion )return exp1;
    if( exp2 instanceof Excepcion )return exp2;
    
    if( this.rigthExpression.tipo == TIPO.ARREGLO || this.rigthExpression.tipo == TIPO.ARREGLO)
    return new Excepcion("Semantico","no se pueden comparar objetos ",super.fila+"",super.columna+"");
    
    if( this.rigthExpression.tipo == TIPO.ARREGLO || this.rigthExpression.tipo == TIPO.ARREGLO)
    return new Excepcion("Semantico","no se pueden comparar objetos ",super.fila+"",super.columna+"");
    
    if( this.leftExpression.tipo == TIPO.ARREGLO || this.leftExpression.tipo == TIPO.ARREGLO)
    return new Excepcion("Semantico","no se pueden comparar objetos ",super.fila+"",super.columna+"");
    
    if( this.leftExpression.tipo == TIPO.ARREGLO || this.leftExpression.tipo == TIPO.ARREGLO)
    return new Excepcion("Semantico","no se pueden comparar objetos ",super.fila+"",super.columna+"");
    
    
    if(this.leftExpression.tipo == TIPO.NULL || this.rigthExpression.tipo == TIPO.NULL )
    return new Excepcion("Semantico","variable NULL no se puede comparar ",super.fila+"",super.columna+"");
    
    this.tipo = TIPO.BOOLEAN;
    return exp1 < exp2;

  }
}
