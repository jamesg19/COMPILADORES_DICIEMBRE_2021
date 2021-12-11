import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion} from "../../table/excepcion"
import { TIPO } from "../../table/TipoNativo";
import {TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Identificador } from "../identificador";


export class Casteos extends Instruccion{
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
                console.log(this.identificador.id);
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = entorno.getSimbolo(this.identificador.id+"");
                if (variable == null) {
                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador}`, `${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA
                if(variable.tipo == TIPO.NULL){

                    return new Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                if(variable.tipo != TIPO.CADENA){

                    return new Excepcion("Semantico", "Error de operacion en Casteo variable diferente a Cadena", `${this.fila}`, `${this.columna}`);
                }

                if(this.tipo_casteo == TIPO_NATIVA_CADENA.INTPARSE  ){
                    return Number(this.identificador.interpretar(entorno,arbol)+"");
                }
                if(this.tipo_casteo == TIPO_NATIVA_CADENA.DOUBLEPARSE){
                    return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }
                
                if(this.tipo_casteo== TIPO_NATIVA_CADENA.BOOLEANPARSE){
                    return Boolean(this.identificador.interpretar(entorno,arbol) );
                }
            }else{
                //verifica que la expresion sea CADENA
                const test=this.identificador.interpretar(entorno,arbol);

                if(this.identificador.tipo != TIPO.CADENA){
                    return new Excepcion("Semantico", "Error de operacion en Casteo variable diferente a Cadena", `${this.fila}`, `${this.columna}`);
                }

                if(this.tipo_casteo == TIPO_NATIVA_CADENA.INTPARSE){
                    return Number(this.identificador.interpretar(entorno,arbol)+"");
                }
                if(this.tipo_casteo == TIPO_NATIVA_CADENA.DOUBLEPARSE){
                    return Number(this.identificador.interpretar(entorno,arbol)+"")*(1.0);
                }
                if(this.tipo_casteo== TIPO_NATIVA_CADENA.BOOLEANPARSE){
                    try {
                        return Boolean(Number(this.identificador.interpretar(entorno,arbol)));
                    } catch (error) {
                        return Boolean(this.identificador.interpretar(entorno,arbol) );
                    }

                    return Boolean(this.identificador.interpretar(entorno,arbol) );
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


