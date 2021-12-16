
import { Instruccion } from '../../abs/Instruccion';
import { TIPO } from '../../table/tipo';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { Excepcion } from '../../table/excepcion';
import { NodoAST } from '../../abs/nodo';

export class Push_List extends Instruccion {
    
    id:string;
    exp:Instruccion;
    list_expresiones:Instruccion[];
    tipo:TIPO;
    
    constructor(id:string,list_expresiones:Instruccion[], exp:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.id = id;
        this.exp = exp;
        this.list_expresiones = list_expresiones;
        this.tipo = TIPO.NULL;
    }
    interpretar(entorno:TablaSimbolos, arbol:Arbol){
        
        let exp_value = this.exp.interpretar(entorno,arbol);
        
        if(exp_value instanceof Excepcion) return exp_value;
        
        
        let arr_value = entorno.getSimbolo(this.id);
        
        //if (arr_value.tipo != this.exp.tipo) return new Excepcion("Semantico","No coinciden los tipos", super.fila+"",super.columna+"");
        
        if(arr_value instanceof Excepcion ) return arr_value;
        
        if(!arr_value)
            return new Excepcion("Semantico","la variable"+this.id+" no existe ",""+super.fila,""+super.columna);
        
        if(arr_value.tipo )
            return new Excepcion("Semantico","la variable"+this.id+" no es un array ",""+super.fila,""+super.columna);
            
            
        // this.tipo = arr_value.tipo;   
        // if(arr_value.valor instanceof Array){ 
        //     arr_value.valor.push(exp_value);
        //     //return last_value_array
        //     this.tipo = TIPO.BOOLEAN;
        //     return true;
        // }
        
        
        let contador = this.list_expresiones.length;
    let temp = arr_value.valor;//:any = undefined;
    let value_return;

    //if (contador == 1) temp = arr_value?.valor;

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
        if (temp[index] instanceof Array) {
          if (index < 0 || index > temp.length)
            return (value_return = new Excepcion(
              "Semantico",
              "no existe el indice indicado para el arreglo " + this.id,
              "" + super.fila,
              "" + super.columna
            ));


            
            temp[index].push(exp_value);
            this.tipo = arr_value?.tipo;
            return value_return=true


        }
        return (value_return = new Excepcion(
            "Semantico",
            "El indice indicado para " + this.id+" debe ser un arreglo",
            "" + super.fila,
            "" + super.columna
          ));
      } else {
        this.tipo = arr_value.tipo;
        temp = temp[index];
      }
    });
        
        
        
        
        this.tipo = TIPO.NULL;
        return value_return;
    }

    getNodo() {
      const nodo=new NodoAST("PUSH LIST");
      nodo.agregarHijo(this.id);
      
      const pos= new NodoAST("POSICION");
      if(this.list_expresiones!= null || this.list_expresiones !=  undefined){
        this.list_expresiones.forEach((element)=>{
            pos.agregarHijoNodo(element.getNodo());
        });
        nodo.agregarHijoNodo(pos);
      }
      nodo.agregarHijoNodo(this.exp.getNodo());
      return nodo;
    }



}
