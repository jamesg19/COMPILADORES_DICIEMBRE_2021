import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { TIPO } from '../../table/tipo';
import { Excepcion } from '../../table/excepcion';
import { NodoAST } from '../../abs/nodo';
import { Principal } from '../../principal';

export class IgualIgual extends Instruccion{
    
    leftExpression: Instruccion;
    rightExpression: Instruccion;
    tipo:TIPO;
    constructor(leftExpression: Instruccion, rightExpression: Instruccion,fila: number,columna:number ){
        
      super(fila,columna);
      this.rightExpression = rightExpression;
      this.leftExpression = leftExpression;
      this.tipo = TIPO.NULL;
      
    }
  
    interpretar(entorno: TablaSimbolos,arbol:Arbol ):any {
      const exp1 = this.leftExpression.interpretar(entorno,arbol);
      const exp2 = this.rightExpression.interpretar(entorno,arbol);
      
      //Validacion item por item solo si se esta comparando arreglos
      if(exp1 instanceof Excepcion) return exp1;
      if(exp2 instanceof Excepcion) return exp2;
      
      if(exp1.tipo == TIPO.ARREGLO && exp2.tipo == TIPO.ARREGLO){
        //Si no tienen la misma cantidad de items no son iguales
        if(exp1.getSize() != exp2.getSize()) return false;
  
        //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
        for(let i = 0; i < exp1.getSize(); i++){
          if(exp1.getValue(i) != exp2.getValue(i)){ this.tipo = TIPO.BOOLEAN; return false;}
        }
        this.tipo = TIPO.BOOLEAN;
        return true;
      }
      //console.log("falta comparar el struct")
      this.tipo = TIPO.BOOLEAN;
      return this.obtenerVal(this.leftExpression.tipo,exp1)==this.obtenerVal(this.rightExpression.tipo,exp2)

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

    getNodo(){
      const nodo= new NodoAST("RELACIONAL");
      if( (this.rightExpression!=null) || (this.rightExpression != undefined)){
          nodo.agregarHijoNodo(this.leftExpression.getNodo());
          nodo.agregarHijo("==");
          nodo.agregarHijoNodo(this.rightExpression.getNodo());
          return nodo;
      }else{
          nodo.agregarHijo("==");
          nodo.agregarHijoNodo(this.leftExpression.getNodo());
          return nodo;
      }
    }

    traducir(entorno: TablaSimbolos,arbol:Arbol ):any {
      const exp1 = this.leftExpression.traducir(entorno,arbol);
      const exp2 = this.rightExpression.traducir(entorno,arbol);
      
      //Validacion item por item solo si se esta comparando arreglos
      if(exp1 instanceof Excepcion) return exp1;
      if(exp2 instanceof Excepcion) return exp2;
      
      if(exp1.tipo == TIPO.ARREGLO && exp2.tipo == TIPO.ARREGLO){
        //Si no tienen la misma cantidad de items no son iguales
        if(exp1.getSize() != exp2.getSize()) return false;
  
        //Si tienen la misma longitud realizo un recorrido para comparar los items - Esta implementacion funciona solo para los valores nativos
        for(let i = 0; i < exp1.getSize(); i++){
          if(exp1.getValue(i) != exp2.getValue(i)){ this.tipo = TIPO.BOOLEAN; return false;}
        }
        this.tipo = TIPO.BOOLEAN;
        return true;
      }
      //console.log("falta comparar el struct")
      this.tipo = TIPO.BOOLEAN;
      
      let temp = Principal.temp;
      temp++;
      let t = "t"+temp;
      Principal.temp = temp;
      Principal.historial += t +" = "+exp1+" == " +exp2+";\n";
      return t;

    }
  }
  