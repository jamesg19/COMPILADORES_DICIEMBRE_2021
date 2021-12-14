import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Primitivo } from "../expresiones/primitivo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Case } from "./case";
import { Continue } from "./continue";

export class Switch extends Instruccion{
    condicion:Instruccion;
    lst_case:Case[];
    defaultt:Instruccion;
    flag_break:boolean;
    fila:number;
    columna:number;

    constructor(condicion:Instruccion,lst_case:Case[],defaultt:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.condicion=condicion;
        this.lst_case=lst_case;
        this.defaultt=defaultt;
        this.fila=fila;
        this.columna=columna;
        this.flag_break=false;
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {

        //verifica si la lista de casos es nula
        if(this.lst_case ==null){
            //console.log("LISTA CASE LLEGA NULL");
            //SI DEFAULT no es nulo, lo ejecuta.
            if(!this.defaultt != null){
                this.defaultt.interpretar(entorno,arbol)
            }
        } else{
            //console.log("LISTA CASE LLEGA LLENA");
            //SI LA LISTA DE CASOS CONTIENE ALGUNO
            const resul=null;
            
            this.lst_case.forEach((casee) => {
                
                //interpreta la condicion del CASE
                //console.log(casee.condicion +" JAMES");
                const value_case=casee.condicion.interpretar(entorno,arbol);

                if(value_case instanceof Excepcion){
                    return value_case;
                }
                //obtiene el valor del SWITCH
                const value_expresion=this.condicion.interpretar(entorno,arbol);
                //verifica que el valor de la condicion SWITCH no se una excepcion
                if(value_expresion instanceof Excepcion){
                    return value_expresion;
                }

                if(value_expresion+"" === value_case+""){
                    //si el valor de la condicion SWITCH COINDICE CON LA CONDICION CASE
                    // ENTONCES LO EJECUTA
                    const resultt = casee.interpretar(entorno,arbol);
                    
                    if( resultt instanceof Excepcion){
                        return resultt;
                    }

                    if(resultt instanceof Break){
                        this.flag_break=true;
                        return resultt ;// break

                    }

                }

            });
            // si this.flag_break  == true --> el caso evaluado trae break
            if(!this.flag_break){
                if(this.defaultt != null || this.defaultt != undefined){
                    this.defaultt.interpretar(entorno,arbol);
                }
            }
        }

        return this;
    }
    getNodo():NodoAST{
        const nodo=new NodoAST("SWITCH");
        const lst_cases=new NodoAST("LISTA_CASE");

        this.lst_case.forEach((element)=>{
            lst_cases.agregarHijoNodo(element.getNodo());
        });

        nodo.agregarHijoNodo(lst_cases);

        if(this.defaultt != null || this.defaultt != undefined ){

            const defaultt= new NodoAST("DEFAULT");
            defaultt.agregarHijoNodo(this.defaultt.getNodo());
            nodo.agregarHijoNodo(defaultt);
            
        }


        return nodo;
    }
}