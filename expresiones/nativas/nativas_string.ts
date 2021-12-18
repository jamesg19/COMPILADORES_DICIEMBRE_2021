import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion} from "../../table/excepcion"
import { TIPO } from "../../table/tipo";
import {TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Console } from "console";
import { NodoAST } from "../../abs/nodo";
import { Identificador } from "../identificador";


export class NativasString extends Instruccion{
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

           
            if(this.identificador instanceof Identificador){

            
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = entorno.getSimbolo(this.identificador.id);
                if (variable == null) {

                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador}`, `${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE SEA TIPO CADENA

                if(variable.tipo == TIPO.NULL){

                    return new Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }


                //VERIFICACION DE OPERACIONES NATIVAS EN ARREGLOS
                if( variable.arreglo){
                    
                    if(this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT){
                        //codigo para length
                        return variable.valor.length;

                    }
                }




                if( variable.tipo != TIPO.CADENA){

                    return new Excepcion("Semantico", "Error de operacion en variable diferente a Cadena", `${this.fila}`, `${this.columna}`);
                }
                
                //DETERMINA SI ES LOWER_CASE
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER){

                    var cadena=variable.getValor()+"";
                    return cadena.toLowerCase();
                }

                //DETERMINA SI ES UPPER_CASE
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER){
                    

                    var cadena=variable.getValor()+"";
                    return cadena.toUpperCase();
                }
                //DETERMINA SI ES LENGTH
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT){
                    
                    if(this.tipo_operacion.tipo == TIPO.ARREGLO){
                        
                    }
                    console.log(this.tipo_operacion.tipo);
                    var cadena=variable.getValor()+"";
                    return cadena.length;
                }
                
                //DETERMINA SI ES SUBSTRING
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING){
                    const aa=this.inicio.interpretar(entorno,arbol);
                    const b=this.final.interpretar(entorno,arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if(aa instanceof Excepcion){
                        return aa;
                    }
                    if(b instanceof Excepcion){
                        return b;
                    }
                    var cadena=variable.getValor()+"";
                    
                    if(this.inicio.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro inicio en subString no es Entero',`${this.fila}`,`${this.columna}`);
                    }
                    if(this.final.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro fin en subString no es Entero',`${this.fila}`,`${this.columna}`)
                    }
                    if(this.inicio.interpretar(entorno,arbol)<0 && this.final.interpretar(entorno,arbol) <0){
                        return new Excepcion('Semantico','Parametro negativo en Substring',`${this.fila}`,`${this.columna}`)
                    }
                
                    if(this.final.interpretar(entorno,arbol)>cadena.length){
                        return new Excepcion('Semantico','Parametro fin en subString fuera de los limites',`${this.fila}`,`${this.columna}`)
                    }
                    
                    
                    return cadena.substring(aa,b);
                }




                //DETERMINA SI ES CARACTER OF POSITION
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION){
                    const aa=this.inicio.interpretar(entorno,arbol);

                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if(aa instanceof Excepcion){
                        return aa;
                    }

                    var cadena=variable.getValor()+"";

                    if(this.inicio.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro inicio en caracterOfPosition no es Entero',`${this.fila}`,`${this.columna}`);
                    }

                    if(this.inicio.interpretar(entorno,arbol)<0 ){
                        return new Excepcion('Semantico','Parametro negativo en caracterOfPosition',`${this.fila}`,`${this.columna}`)
                    }
                
                    if(this.inicio.interpretar(entorno,arbol)>cadena.length){
                        return new Excepcion('Semantico','Parametro fin en caracterOfPosition fuera de los limites',`${this.fila}`,`${this.columna}`)
                    }
                    
                    return cadena.charAt(this.inicio.interpretar(entorno,arbol));
                }

            } else{

                //console.log("ENTRA AQUI"+this.identificador);
                //VERIFICA QUE LA VARIABLE O ID EXISTAN
                const variable = this.identificador;
                
                //DETERMINA SI ES LOWER_CASE
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.TOLOWER){

                    var cadena=variable+"";
                    return cadena.toLowerCase();
                }

                //DETERMINA SI ES UPPER_CASE
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.TOUPPER){
                    

                    var cadena=variable+"";
                    return cadena.toUpperCase();
                }
                //DETERMINA SI ES LENGTH
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.LENGHT){
                    
                    if(this.tipo_operacion.tipo == TIPO.ARREGLO){
                        
                    }
                    //console.log(this.tipo_operacion.tipo);
                    var cadena=variable+"";
                    return cadena.length;
                }
                
                //DETERMINA SI ES SUBSTRING
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.SUBSTRING){
                    const aa=this.inicio.interpretar(entorno,arbol);
                    const b=this.final.interpretar(entorno,arbol);
                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if(aa instanceof Excepcion){
                        return aa;
                    }
                    if(b instanceof Excepcion){
                        return b;
                    }
                    var cadena=variable+"";
                    
                    if(this.inicio.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro inicio en subString no es Entero',`${this.fila}`,`${this.columna}`);
                    }
                    if(this.final.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro fin en subString no es Entero',`${this.fila}`,`${this.columna}`)
                    }
                    if(this.inicio.interpretar(entorno,arbol)<0 && this.final.interpretar(entorno,arbol) <0){
                        return new Excepcion('Semantico','Parametro negativo en Substring',`${this.fila}`,`${this.columna}`)
                    }
                
                    if(this.final.interpretar(entorno,arbol)>cadena.length){
                        return new Excepcion('Semantico','Parametro fin en subString fuera de los limites',`${this.fila}`,`${this.columna}`)
                    }
                    
                    
                    return cadena.substring(aa,b);
                }




                //DETERMINA SI ES CARACTER OF POSITION
                if(this.tipo_operacion == TIPO_NATIVA_CADENA.CARACTER_POSITION){
                    const aa=this.inicio.interpretar(entorno,arbol);

                    //verifica que no hayan errores en las operaciones de parametros SUBSTRING(a,b)
                    if(aa instanceof Excepcion){
                        return aa;
                    }

                    var cadena=variable+"";

                    if(this.inicio.tipo != TIPO.ENTERO){
                        return new Excepcion('Semantico','Parametro inicio en caracterOfPosition no es Entero',`${this.fila}`,`${this.columna}`);
                    }

                    if(this.inicio.interpretar(entorno,arbol)<0 ){
                        return new Excepcion('Semantico','Parametro negativo en caracterOfPosition',`${this.fila}`,`${this.columna}`)
                    }
                
                    if(this.inicio.interpretar(entorno,arbol)>cadena.length){
                        return new Excepcion('Semantico','Parametro fin en caracterOfPosition fuera de los limites',`${this.fila}`,`${this.columna}`)
                    }
                    
                    return cadena.charAt(this.inicio.interpretar(entorno,arbol));
                }









            }




            return new Excepcion("Semantico",`Tipo de datos invalido para metodo nativo string() `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter .toLowercase() tipo dato incorrecto ",`${this.fila}`,`${this.columna}`);

        }
    }

    getNodo(){
        const nodo= new NodoAST("NATIVAS STRING");
        if(this.tipo_operacion==TIPO_NATIVA_CADENA.BOOLEANPARSE){
            nodo.agregarHijo("BOOLEANPARSE");
        }
        else if(this.tipo_operacion==TIPO_NATIVA_CADENA.CARACTER_POSITION){
            nodo.agregarHijo("CARACTER_POSITION");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.DOUBLEPARSE){
            nodo.agregarHijo("DOUBLEPARSE");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.INTPARSE){
            nodo.agregarHijo("INTPARSE");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.LENGHT){
            nodo.agregarHijo("LENGHT");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.REPETICION){
            nodo.agregarHijo("REPETICION");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.SUBSTRING){
            nodo.agregarHijo("SUBSTRING");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TODOUBLE){
            nodo.agregarHijo("TODOUBLE");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TOINT){
            nodo.agregarHijo("TOINT");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TOLOWER){
            nodo.agregarHijo("TOLOWER");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TOSTRING){
            nodo.agregarHijo("TOSTRING");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TOUPPER){
            nodo.agregarHijo("TOUPPER");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.TYPEOF){
            nodo.agregarHijo("TYPEOF");
        } else if(this.tipo_operacion==TIPO_NATIVA_CADENA.STRING){
            nodo.agregarHijo("STRING");
        }
        nodo.agregarHijoNodo(this.identificador.getNodo());
        return nodo
        
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



