import { Instruccion } from '../abs/Instruccion';
import { TablaSimbolos } from '../table/tablasimbolos';
import { Excepcion } from '../table/excepcion';
import { TIPO } from '../table/tipo';
import { Arbol } from '../table/arbol';
import { Simbolo } from '../table/simbolo';
import { NodoAST } from '../abs/nodo';

export class D_IdExp extends Instruccion{
    
    
    tipo:TIPO
    id: string;
    exp: Instruccion;
    constante:boolean;
    
    /**
     * @param  {TIPO} tipo
     * @param  {string} id
     * @param  {Instruccion} exp
     * @param  {boolean} constante
     * @param  {number} fila
     * @param  {number} columna
     */
    constructor( tipo:TIPO, id: string, exp: Instruccion ,constante:boolean,fila: number,columna:number){
      super(fila,columna);
      
      this.tipo = tipo;
      this.id = id;
      this.exp = exp;
      this.constante = constante;
      
    }
  
    /**
     * @param  {TablaSimbolos} e
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(e: TablaSimbolos,arbol:Arbol):any {
      //Validacion de variable existente
      let variable = e.getSimbolo(this.id);//e.getVariable(this.id);
      
      if(variable)                  
        return new Excepcion("Semantico"," no se pueden declarar variables con el mismo nombre"+this.id,super.fila+"",super.columna+"");

  
      //Creacion de variable en el entorno
      let valor = this.exp.interpretar(e,arbol);
      if(this.exp.tipo == TIPO.ARREGLO || this.exp.tipo == TIPO.STRUCT)  
        valor = JSON.parse(JSON.stringify(valor));
      
      let simbolo = new Simbolo(this.id,this.tipo,super.fila,super.columna,valor,false,false);
      e.addSimbolo(simbolo);//valor: any, arreglo: boolean, struct: boolean
    }


    getNodo():NodoAST{
      const nodo=new NodoAST("DECLARACION");
      if(this.tipo==TIPO.ARREGLO){
        nodo.agregarHijo("ARREGLO");
      } else if(this.tipo==TIPO.BOOLEAN){
        nodo.agregarHijo("BOOLEAN");
      } else if(this.tipo==TIPO.CADENA){
        nodo.agregarHijo("CADENA");
      } else if(this.tipo==TIPO.CARACTER){
        nodo.agregarHijo("CARACTER");
      } else if(this.tipo==TIPO.DECIMAL){
        nodo.agregarHijo("DECIMAL");
      } else if(this.tipo==TIPO.ENTERO){
        nodo.agregarHijo("ENTERO");
      } else if(this.tipo==TIPO.NULL){
        nodo.agregarHijo("NULL");
      } else if(this.tipo==TIPO.STRUCT){
        nodo.agregarHijo("STRUCT");
      } else if(this.tipo==TIPO.VOID){
        nodo.agregarHijo("VOID");
      }
      nodo.agregarHijo(this.id);
      nodo.agregarHijoNodo(this.exp.getNodo());
      return nodo;
    }
  
}
  