import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";


export class NegacionNum extends Instruccion{
    operador:ARITMETICO;
    operadorIzq:Primitivo;
    operadorDer:Primitivo;
    fila: number;
    columna:number;
    tipo:TIPO;
    
    constructor(operador:ARITMETICO,operadorIzq:Primitivo,operadorDer:Primitivo,fila:number,columna:number){
        super(fila,columna);
        this.operadorIzq=operadorIzq;
        this.operadorDer=operadorDer;
        this.fila=fila;
        this.columna=columna;
        this.operador=operador;
        this.tipo=TIPO.NULL;

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const izq=this.operadorIzq.interpretar(entorno,arbol);
            
            if(izq instanceof Excepcion){
                return izq;
            }

            
            if(this.operador === ARITMETICO.UMENOS ){
                //validaciones
                if(this.operadorIzq.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }

                    
                    //-------ENTERO
                    //ENTERO
                    if(this.operadorIzq.tipo===TIPO.ENTERO  ){
                        this.tipo=TIPO.ENTERO;
                        return (this.obtenerVal(this.operadorIzq.tipo,izq))*(-1);
                    }
                    //DECIMAL
                    else if(this.operadorIzq.tipo===TIPO.DECIMAL){
                        this.tipo=TIPO.DECIMAL;
                        return (this.obtenerVal(this.operadorIzq.tipo,izq))*(-1) ;
                    }

                return new Excepcion("Semantico",`Tipo de datos invalido para negacion numero ${this.operadorIzq.tipo} * ${this.operadorDer.tipo}  `,`${this.fila}`,`${this.columna}`);
            } 

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter negacion numero ",`${this.fila}`,`${this.columna}`);

        }
    }


    getNodo(){
        const nodo= new NodoAST("NEGACION");
        nodo.agregarHijo(this.operadorIzq.value+"");
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
            return new Excepcion("Semantico",`No se pudo obtener el valor en negacion `,`${this.fila}`,`${this.columna}`);
            
        }

    }

}