import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Continue } from "./continue";
import { Return } from "./Return";

export class DoWhile extends Instruccion {

    condicion:Instruccion;
    instrucciones:Instruccion[];
    fila: number;
    columna:number;
    hayContinue:boolean;

    // FOR( DECLARACION; CONDICION; ACTUALIZACION )
    constructor(condicion:Instruccion,instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        this.condicion=condicion;
        this.instrucciones=instrucciones;
        this.hayContinue=false;
    }
    /**
     * METODO INTERPRETAR CICLO FOR
     * @param entorno 
     * @param arbol 
     */
    interpretar(entorno: TablaSimbolos, arbol: Arbol) {

        const nuevaTabla=new TablaSimbolos(entorno);

        //ejecuta las instrucciones que estan dentro del DO_WHILE
        this.instrucciones.forEach((element:Instruccion) => {
                        
            const result=element.interpretar(nuevaTabla,arbol);

            if(result instanceof Excepcion){
                arbol.excepciones.push(result);
                arbol.updateConsolaError(result.toString());
            }
            //VERIFICA SI VIENE UN CONTINUE
            if(result instanceof Continue){
                this.hayContinue=true;
                //break;
                return;

            }
            if(result instanceof Break){
                return result ;
            }
            if(result instanceof Return){
                return result;
            }

        });





        while(true){
            //NUEVO ENTONO DENTRO DEL CICLO
            const nuevaTabla2=new TablaSimbolos(nuevaTabla);
            try {
                const condicionn=this.condicion.interpretar(nuevaTabla2,arbol);
                if(condicionn instanceof Excepcion){
                    return condicionn;
                }
            } catch (error) {
                return this.condicion;
            }
            //VERIFICA QUE LA CONDICION SEA TIPO BOOLEAN
            if(this.condicion.tipo ==TIPO.BOOLEAN ){
                
                
                //VERIFICA QUE LA CONDICION SE CUMPLA sea TRUE
                if(this.condicion.interpretar(nuevaTabla2,arbol) == true){
                    //ejecuta las instrucciones que estan dentro del DO_WHILE
                    this.instrucciones.forEach((element:Instruccion) => {
                        
                        const result=element.interpretar(nuevaTabla2,arbol);

                        if(result instanceof Excepcion){
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        //VERIFICA SI VIENE UN CONTINUE
                        if(result instanceof Continue){
                            this.hayContinue=true;
                            //break;
                            return;

                        }
                        if(result instanceof Break){
                            return;
                        }
                        if(result instanceof Return){
                            return result;
                        }

                    });
                }else{
                    break;
                }
            }else{
                //break;
                return new Excepcion("Semantico",'Tipo de condicion no boleana en While',`${this.fila}`,`${this.columna}`);
            }
            //SI HAY UN CONTINUE
            if(this.hayContinue){
                this.hayContinue=false;
                console.log("CONTINUE DENTRO DEL WHILE");
                continue;
            }
        }
    }

    getNodo(){
        const nodo=new NodoAST("WHILE");
        const instruccionesNodo=new NodoAST("INSTRUCCIONES");

        this.instrucciones.forEach((element)=>{
            instruccionesNodo.agregarHijoNodo(element.getNodo());

        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }

}