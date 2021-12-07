import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { Simbolo } from "../../table/simbolo";
import { isUndefined } from "util";


export class DecrementoVariable extends Instruccion{
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
            let simbol =entorno.getSimboloJ(this.id);
            
            //verifica que el simbolo exista
            if(simbol != null ){

                //verifica que sea tipo numero o decimal
                if(simbol?.tipo == TIPO.ENTERO || simbol?.tipo == TIPO.DECIMAL ){
                    //si el simbolo existe realizar el decremento
                    entorno.actualizarSimboloEnTabla(simbol);

                }else{
                    return new Excepcion('Semantico',`La variable ${this.id} no existe para decremento`,`${this.fila}`,`${this.columna}`);
                }
            }else{

            }

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter Decremento",`${this.fila}`,`${this.columna}`);

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
            return new Excepcion("Semantico",`No se pudo obtener el valor en division`,`${this.fila}`,`${this.columna}`);
        }

    }

}