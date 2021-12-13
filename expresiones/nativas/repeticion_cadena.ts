import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion} from "../../table/excepcion"
import { TIPO } from "../../table/TipoNativo";
import {TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Identificador } from "../identificador";


export class RepeticionCadena extends Instruccion{
    identificador:Instruccion;
    tipo_operacion:TIPO_NATIVA_CADENA;
    inicio:Instruccion;
    final:Instruccion;
    fila: number;
    columna:number;

    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador 
     * @param identificador 
     * @param fila 
     * @param columna 
     */
    constructor(id:Instruccion,tipo:TIPO_NATIVA_CADENA,inicio:Instruccion,final:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.identificador=id;
        this.tipo_operacion=tipo;
        this.inicio=inicio;
        this.final=final;
        this.fila=fila;
        this.columna=columna;
        

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const iden=this.identificador.interpretar(entorno,arbol);
           
            //DETERMINA SI ES REPETICION
            if(this.identificador instanceof Identificador){

                const simboll=entorno.getSimbolo(this.identificador.id+"");
                //verifica si existe
                if(simboll instanceof Excepcion){
                    return simboll;
                }

                if(simboll ==null){
                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador.id}`, `${this.fila}`,`${this.columna}`);
                }else{
                    var texto="";
                    for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                        texto+=this.identificador.interpretar(entorno,arbol);
                    }
                    this.tipo=TIPO.CADENA;
                    return texto;
                }
                
            }
            //  SI ES UNA CADENA SIMPLE
            else{


                const start=this.inicio.interpretar(entorno,arbol);
                const id=this.identificador.interpretar(entorno,arbol);

                if(id instanceof Excepcion){
                    return id;
                }
                if(start instanceof Excepcion){
                    return start;
                }
                //VERIFICA QUE LAS REPETICIONES SEA UN ENTERO
                if(this.inicio.tipo != TIPO.ENTERO){
                    return new Excepcion('Semantico','El parametro de repeticiones debe ser entero',`${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE EL NUMERO SEA >=0
                if(this.inicio.interpretar(entorno,arbol)<0 ){
                    return new Excepcion('Semantico','El numero de repeticiones debe ser >= 0',`${this.fila}`,`${this.columna}`);
                }
                
                if(this.identificador.tipo != TIPO.CADENA){
                    return new Excepcion('Semantico','El tipo de expresion debe ser cadena en repeticion ',`${this.fila}`,`${this.columna}`);
                }
                var cadena="";
                for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                    cadena+=this.identificador.interpretar(entorno,arbol);
                }
                this.tipo=TIPO.CADENA;
                return cadena;



            }




            return new Excepcion("Semantico",`Tipo de datos invalido para metodo nativo repeticion string() `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter repeticion ^ cadena",`${this.fila}`,`${this.columna}`);

        }
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
            return new Excepcion("Semantico",`No se pudo obtener el valor en Sen() `,`${this.fila}`,`${this.columna}`);
        }

    }

}



