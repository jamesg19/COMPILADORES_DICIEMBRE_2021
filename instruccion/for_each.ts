import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Identificador } from "../expresiones/identificador";
import { Primitivo } from "../expresiones/primitivo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { Simbolo } from "../table/simbolo";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Asignacion } from "./asignacion";
import { Break } from "./break";
import { Continue } from "./continue";
import { D_Id } from "./declaracion_id";
import { D_IdExp } from "./declaracion_idexp";
import { Return } from "./Return";

export class ForEach extends Instruccion {
    temporal:string;
    condicion:Instruccion;
    instrucciones:Instruccion[];
    fila: number;
    columna:number;
    hayContinue:boolean;
    hayBreak:boolean;

    
    //for letra in cadena{
    //instrucciones ...
    //}
    constructor(temporal:string,condicion:Instruccion,instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        this.temporal=temporal;
        this.condicion=condicion;
        this.instrucciones=instrucciones;
        this.hayContinue=false;
        this.hayBreak=false;
    }
    /**
     * METODO INTERPRETAR CICLO FOR
     * @param entorno 
     * @param arbol 
     */
    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        //verifica si es un array
        if(this.condicion instanceof Array){
            console.log("LA CONDICION EN EACH ES ARRAY")
            //declara la variable temporal
            const declaracion_temp=new D_Id(TIPO.ENTERO,this.temporal,false,this.fila,this.columna);
            const declaracion_tmp=declaracion_temp.interpretar(entorno,arbol);
            if(declaracion_tmp instanceof Excepcion){
                return declaracion_tmp;
            }
            //recorremos el aaray
           this.condicion.forEach((x)=>{

                const nueva_tabla=new TablaSimbolos(entorno);

                //asignamos el valor de caga posicion al temporal
                //creamos el objeto primitivo del valor en la posicion i
                const valor=new Primitivo(TIPO.ENTERO,x.interpretar(nueva_tabla,arbol)-1,this.fila,this.columna);
                    
                //asignacion del valor a la variable temporal
                const asignacion_temp= new Asignacion(this.temporal,valor,this.fila,this.columna);
                asignacion_temp.interpretar(nueva_tabla,arbol);

                //realizamos las instrucciones
                this.instrucciones.forEach((element:Instruccion) => {
                        
                    const result=element.interpretar(nueva_tabla,arbol);

                    if(result instanceof Excepcion){
                        arbol.excepciones.push(result);
                        arbol.updateConsolaError(result.toString());
                    }
                    
                    if(result instanceof Break){
                        this.hayBreak=true;
                        return result;
                    }
                    if(result instanceof Return){
                        return result;
                    }
                    //VERIFICA SI VIENE UN CONTINUE
                    if(result instanceof Continue){
                        this.hayContinue=true;
                        return result;
                    }

                });




           });




        }else{
            console.log("/********/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*/*");
        //verifica que la condicion no sea una Excepcion
        const condition=this.condicion.interpretar(entorno,arbol);
        if(condition instanceof Excepcion){
            return condition;
        }

        //verifica que sea un identificador
        if(this.condicion instanceof Identificador){

            //verifica que exista el IDENTIFICADOR
            const variable=entorno.getSimbolo(this.condicion.id+"");
            if (variable == null) {
                return new Excepcion("Semantico","No existe la variable " + `${this.condicion}`, `${this.fila}`,`${this.columna}`);
            }


            //declara la variable temporal
            const declaracion_temp=new D_Id(variable.tipo,this.temporal,false,this.fila,this.columna);
            const declaracion_tmp=declaracion_temp.interpretar(entorno,arbol);
            if(declaracion_tmp instanceof Excepcion){
                return declaracion_tmp;
            }

            //--------------------------------verifica si es un ARREGLO-----------------------------
            if( variable.arreglo){

                var cantidad=this.condicion.interpretar(entorno,arbol);
                //console.log("CANTIDAD "+cantidad);
                if(cantidad instanceof Excepcion){
                    return cantidad;
                }
                for(let i=0;i<cantidad.length;i++){
                    const nueva_tablaa=new TablaSimbolos(entorno);

                    // //declaracion
                    // const declaracion_temp=new D_Id(variable.tipo,this.temporal,false,this.fila,this.columna);
                    // const declaracion_tmp=declaracion_temp.interpretar(entorno,arbol);
                    // if(declaracion_tmp instanceof Excepcion){
                    //     return declaracion_tmp;
                    // }

                    //creamos el objeto primitivo del valor en la posicion i
                    const valor=new Primitivo(variable.tipo,cantidad[i],this.fila,this.columna);

                    //asignacion del valor a la variable temporal
                    const asignacion_temp= new Asignacion(this.temporal,valor,this.fila,this.columna);
                    const asig =asignacion_temp.interpretar(nueva_tablaa,arbol);
                    if(asig instanceof Excepcion){
                        return asig;
                    }


                    //ejecucion de las instrucciones
                    //ejecuta las instrucciones que estan dentro del FOR
                    this.instrucciones.forEach((element:Instruccion) => {
                        
                        const result=element.interpretar(nueva_tablaa,arbol);

                        if(result instanceof Excepcion){
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        
                        if(result instanceof Break){
                            this.hayBreak=true;
                            return result;
                        }
                        if(result instanceof Return){
                            return result;
                        }
                        //VERIFICA SI VIENE UN CONTINUE
                        if(result instanceof Continue){
                            this.hayContinue=true;
                            return result;
                        }

                    });
                     //verifica si viene un continue en ForEach   
                    if(this.hayContinue){
                        
                        //i++;
                        this.hayContinue=false;
                        continue;
                    }
                    if(this.hayBreak){
                        
                        this.hayBreak=false;
                        break;
                    }
                    
                }

            }
            //--------------------caso contrario es una variable tradicional-----------------------
            //--------------------caso contrario es una variable tradicional-----------------------
            //--------------------caso contrario es una variable tradicional-----------------------
            //--------------------caso contrario es una variable tradicional-----------------------
            else{

                

                var cantidad=this.condicion.interpretar(entorno,arbol);
                if(cantidad instanceof Excepcion){
                    return cantidad;
                }
                for(let i=0;i<cantidad.length;i++){
                    const nueva_tabla=new TablaSimbolos(entorno);
                    //creamos el objeto primitivo del valor en la posicion i
                    const valor=new Primitivo(TIPO.CADENA,cantidad.charAt(i),this.fila,this.columna);
                    
                    //asignacion del valor a la variable temporal
                    const asignacion_temp= new Asignacion(this.temporal,valor,this.fila,this.columna);
                    asignacion_temp.interpretar(nueva_tabla,arbol);

                    //ejecucion de las instrucciones
                    //ejecuta las instrucciones que estan dentro del FOR
                    this.instrucciones.forEach((element:Instruccion) => {
                        
                        const result=element.interpretar(nueva_tabla,arbol);

                        if(result instanceof Excepcion){
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        
                        if(result instanceof Break){
                            this.hayBreak=true;
                            return result;
                        }
                        if(result instanceof Return){
                            return result;
                        }
                        //VERIFICA SI VIENE UN CONTINUE
                        if(result instanceof Continue){
                            this.hayContinue=true;
                            return result;
                        }

                    });
                     //verifica si viene un continue en ForEach   
                    if(this.hayContinue){
                        
                        //i++;
                        this.hayContinue=false;
                        continue;
                    }
                    if(this.hayBreak){
                        
                        this.hayBreak=false;
                        break;
                    }
                    
                }
            }



        }else{

            //verifica qsi es un arreglo



            //new Arreglo ($1,$3,$6,$1,$3,@1.first_line,@1.first_column)





            



            //declara la variable temporal
            const declaracion_temp=new D_Id(TIPO.CADENA,this.temporal,false,this.fila,this.columna);
            const declaracion_tmp=declaracion_temp.interpretar(entorno,arbol);
            if(declaracion_tmp instanceof Excepcion){
                return declaracion_tmp;
            }
            console.log("ENTRA AQUI");
            var cantidad=this.condicion.interpretar(entorno,arbol);
            if(cantidad instanceof Excepcion){
                return cantidad;
            }
            for(let i=0;i<cantidad.length;i++){
                const nueva_tabla=new TablaSimbolos(entorno);
                //creamos el objeto primitivo del valor en la posicion i
                const valor=new Primitivo(TIPO.CADENA,cantidad.charAt(i),this.fila,this.columna);
                
                //asignacion del valor a la variable temporal
                const asignacion_temp= new Asignacion(this.temporal,valor,this.fila,this.columna);
                asignacion_temp.interpretar(nueva_tabla,arbol);

                //ejecucion de las instrucciones
                //ejecuta las instrucciones que estan dentro del FOR
                this.instrucciones.forEach((element:Instruccion) => {
                    
                    const result=element.interpretar(nueva_tabla,arbol);

                    if(result instanceof Excepcion){
                        arbol.excepciones.push(result);
                        arbol.updateConsolaError(result.toString());
                    }
                    
                    if(result instanceof Break){
                        this.hayBreak=true;
                        return result;
                    }
                    if(result instanceof Return){
                        return result;
                    }
                    //VERIFICA SI VIENE UN CONTINUE
                    if(result instanceof Continue){
                        this.hayContinue=true;
                        return result;
                    }

                });
                 //verifica si viene un continue en ForEach   
                if(this.hayContinue){
                    
                    //i++;
                    this.hayContinue=false;
                    continue;
                }
                if(this.hayBreak){
                    
                    this.hayBreak=false;
                    break;
                }
                
            }





        }
        //SI ES Una CADENA NORMAL

    }
    }

    getNodo(){
        const nodo=new NodoAST("FOR EACH");
        const instruccionesNodo=new NodoAST("INSTRUCCIONES");

        this.instrucciones.forEach((element)=>{
            instruccionesNodo.agregarHijoNodo(element.getNodo());

        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }

}