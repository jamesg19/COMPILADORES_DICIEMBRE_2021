import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { Simbolo } from "../../table/simbolo";
import { isUndefined } from "util";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";


export class IncrementoVariable extends Instruccion{
    id:string
    fila: number;
    columna:number;
    tipo:TIPO;
    
    constructor(id:string,fila:number,columna:number){
        super(fila,columna);

        this.id=id;
        this.fila=fila;
        this.columna=columna;
        this.tipo=TIPO.NULL;

    }
    /**
     * INTERPRETA DECREMENTO
     * @param entorno 
     * @param arbol 
     * @returns 
     */
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const simbol =entorno.getSimboloJ(this.id);
            
            //verifica que el simbolo exista
            if(simbol != null ){
                
                //verifica que sea tipo numero o decimal
                if(Number(simbol.getTipo()+"") === 0 || Number(simbol.getTipo()+"") === 1 ){
                    //console.log(simbol.getValor()+" GET VALOR");

                    simbol.setValor(Number(simbol.getValor())+1);

                    //si el simbolo existe realizar el decremento
                    entorno.actualizarSimboloEnTabla(simbol);

                }else{
                    return new Excepcion('Semantico',`La variable ${this.id} no existe para incremento`,`${this.fila}`,`${this.columna}`);
                }
            }else{

            }

        } catch (error) {
            
            return new Excepcion("Semantico","QUETZAL Null Poiter Incremento",`${this.fila}`,`${this.columna}`);

        }
    }

    getNodo(){
        const nodo=new NodoAST("INCREMENTO ++");
        nodo.agregarHijo(this.id);
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
        let variable = entorno.getSimbolo(this.id);
    
        if (!variable) {
          return new Excepcion(
            "Semantico",
            "No existe la variable " + this.id,
            super.fila + "",
            super.columna + ""
          );
        }
        //verifico si es una constante
        if (variable.constante) {
          return new Excepcion(
            "Semantico",
            "No se puede cambiar de valor a una constante " + this.id,
            super.fila + "",
            super.columna + ""
          );
        }
        const primitivo=new Primitivo(TIPO.ENTERO,"1",this.fila,this.columna);

        let valor = primitivo.traducir(entorno, arbol);
        let value = JSON.parse(JSON.stringify(valor));
    
        if (valor instanceof Array) {
          // if(variable.valor instanceof Array){
          //   variable.valor = value;
          //   e.actualizarSimboloEnTabla(variable);
          //   return ;
          // }
    
          return new Excepcion(
            "Semantico",
            "Se esperaba almacenar un Arreglo dentro de un arreglo " + this.id,
            super.fila + "",
            super.columna + ""
          );
        }
    
        //let value = JSON.parse(JSON.stringify(valor));
        console.log(primitivo.tipo+" -------------------------- "+variable.tipo);
        if (primitivo.tipo != variable.tipo)
          return new Excepcion(
            "Semantico",
            "Tipos diferentes " + this.id,
            super.fila + "",
            super.columna + ""
          );
          
        if (
          (primitivo.tipo == TIPO.ENTERO || primitivo.tipo == TIPO.DECIMAL) &&
          (variable.tipo == TIPO.ENTERO || variable.tipo == TIPO.DECIMAL)
        ) {
          if (true){
              //Principal.historial += "/*Asignacion de variable: var += exp;*/\n"
              Principal.historial += "stack[(int)"+variable.posicion+"] = stack[(int)"+variable.posicion+"] + " + valor +";\n";
            }
        //   else {
        //       Principal.historial += "/*Asignacion de variable: var -= exp;*/"
        //       Principal.historial += "stack[(int)"+variable.posicion+"] = stack[(int)"+variable.posicion+"] - " + valor +";\n";
              
        //     }
    
          return "";
        }
    
        return new Excepcion(
          "Semantico",
          "Tipos diferentes " + this.id,
          super.fila + "",
          super.columna + ""
        );
      }



}