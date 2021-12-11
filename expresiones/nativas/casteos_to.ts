import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion} from "../../table/excepcion"
import { TIPO } from "../../table/TipoNativo";
import {TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Identificador } from "../identificador";


export class CasteosTo extends Instruccion{
    identificador:Instruccion;
    tipo_casteo:TIPO_NATIVA_CADENA;
    fila: number;
    columna:number;

    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador 
     * @param identificador 
     * @param fila 
     * @param columna 
     */
    constructor(id:Instruccion,tipo_casteo:TIPO_NATIVA_CADENA,fila:number,columna:number){
        super(fila,columna);
        this.identificador=id;
        this.tipo_casteo=tipo_casteo;
        this.fila=fila;
        this.columna=columna;
        

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            //VERIFICA SI ES UN IDENTIFICADOR
            if(this.identificador instanceof Identificador){
               
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = entorno.getSimbolo(this.identificador.id+"");

                //TIPO TYPE_OF
                if(this.tipo_casteo == TIPO_NATIVA_CADENA.TYPEOF){
                    this.tipo=TIPO.CADENA;

                    if(variable.tipo == TIPO.CADENA){
                        return 'string';
                    }
                    else if(variable.tipo == TIPO.ENTERO){
                        return 'int';
                    }
                    else if(variable.tipo == TIPO.DECIMAL){
                        return 'double';
                    }
                    else if(variable.tipo == TIPO.BOOLEAN){
                        return 'boolean';
                    }
                    else{
                        return 'char';
                    }
                    //return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }



                if (variable == null) {
                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador}`, `${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA
                if(variable.tipo == TIPO.NULL){

                    return new Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                if(variable.tipo != TIPO.ENTERO){
                    if(variable.tipo != TIPO.DECIMAL){
                        
                        return new Excepcion("Semantico", "Error de operacion en Casteo variable diferente a NUMERO.. ", `${this.fila}`, `${this.columna}`);
                    }
                }

                if(this.tipo_casteo == TIPO_NATIVA_CADENA.TOINT  ){
                    this.tipo=TIPO.ENTERO;
                    return Number(this.identificador.interpretar(entorno,arbol)+"");
                }
                if(this.tipo_casteo == TIPO_NATIVA_CADENA.TODOUBLE){
                    this.tipo=TIPO.DECIMAL;
                    return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }
                

            }
            
            else{
                //verifica que la expresion sea CADENA
                const test=this.identificador.interpretar(entorno,arbol);
                //TYPEOF
                if(this.tipo_casteo ==TIPO_NATIVA_CADENA.TYPEOF){
                    this.tipo=TIPO.CADENA;

                    if(variable.tipo == TIPO.CADENA){
                        return 'string';
                    }
                    else if(variable.tipo == TIPO.ENTERO){
                        return 'int';
                    }
                    else if(variable.tipo == TIPO.DECIMAL){
                        return 'double';
                    }
                    else if(variable.tipo == TIPO.BOOLEAN){
                        return 'boolean';
                    }
                    else{
                        return 'char';
                    }
                }




                if(this.identificador.tipo != TIPO.ENTERO){
                    if(this.identificador.tipo != TIPO.DECIMAL){
                        return new Excepcion("Semantico", "Error de operacion en Casteo variable diferente a NUMERO", `${this.fila}`, `${this.columna}`);
                    }
                }

                if(this.tipo_casteo == TIPO_NATIVA_CADENA.TOINT){
                    this.tipo=TIPO.ENTERO;
                    return Number(this.identificador.interpretar(entorno,arbol)+"");
                }
                if(this.tipo_casteo == TIPO_NATIVA_CADENA.TODOUBLE){
                    this.tipo=TIPO.DECIMAL;
                    return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }
                
                
            }


        
            

            return new Excepcion("Semantico",`Tipo de datos invalido para metodo nativo string() `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter dato incorrecto ",`${this.fila}`,`${this.columna}`);

        }
    }



    obtenerVal(tipo_casteo:TIPO,val:string):any{
        try {
            if(tipo_casteo === TIPO.ENTERO|| tipo_casteo === TIPO.DECIMAL){
                return Number(val);
            }
            else if(tipo_casteo === TIPO.BOOLEAN){
                if(val.toLowerCase() === "true"){
                    return true;
                }else{
                    return false;
                }
            }
            else if(tipo_casteo === TIPO.CADENA){
                return val;
            }else{
                return val;
            }

        } catch (error) {
            return new Excepcion("Semantico",`No se pudo obtener el valor en Sen() `,`${this.fila}`,`${this.columna}`);
        }

    }

}



