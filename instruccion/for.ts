import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Continue } from "./continue";
import { Return } from "./Return";

export class For extends Instruccion {
    declaracion:Instruccion;
    condicion:Instruccion;
    actualizacion:Instruccion;
    instrucciones:Instruccion[];
    fila: number;
    columna:number;
    hayContinue:boolean;
    hayBreak:boolean;

    // FOR( DECLARACION; CONDICION; ACTUALIZACION )
    constructor(declaracion:Instruccion,condicion:Instruccion,actualizacion:Instruccion,instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        this.declaracion=declaracion;
        this.condicion=condicion;
        this.actualizacion=actualizacion;
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

        const nuevaTabla=new TablaSimbolos(entorno);

        const declaracion=this.declaracion.interpretar(nuevaTabla,arbol);

        if(declaracion instanceof Excepcion){
            return declaracion;
        }

        while(true){
            this.hayContinue=false;
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
            //VERIFICA QUE LA CONDICION SE CUMPLA
            if(this.condicion.tipo ==TIPO.BOOLEAN ){
                
                
                
                if(this.condicion.interpretar(nuevaTabla2,arbol) == true){
                    //ejecuta las instrucciones que estan dentro del FOR
                    this.instrucciones.forEach((element:Instruccion) => {
                        
                        const result=element.interpretar(nuevaTabla2,arbol);

                        if(result instanceof Excepcion){
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                            console.log(result.toString());
                        }
                        //VERIFICA SI VIENE UN CONTINUE
                        if(result instanceof Continue){
                            this.hayContinue=true;
                            const actualiza=this.actualizacion.interpretar(nuevaTabla2,arbol);
                            if(actualiza instanceof Excepcion){
                                return actualiza;
                            }
                            //break;
                            return;

                        }
                        if(result instanceof Break){
                            this.hayBreak=true;
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
                return new Excepcion("Semantico",'Tipo de condicion no boleana en For',`${this.fila}`,`${this.columna}`);
            }
            //SI HAY UN CONTINUE
            if(this.hayContinue){
                this.hayContinue=false;
                console.log("CONTINUE DENTRO DEL FOR");
                continue;
            }
            if(this.hayBreak){
                break;
            }

            //ACTUALIZA LA VARIABLE DE ITERACION
            const actual=this.actualizacion.interpretar(nuevaTabla2,arbol);
            if(actual instanceof Excepcion){
                return actual;
            }

        }


    }

    getNodo(){
        const nodo=new NodoAST("FOR");
        const instruccionesNodo=new NodoAST("INSTRUCCIONES");

        this.instrucciones.forEach((element)=>{
            instruccionesNodo.agregarHijoNodo(element.getNodo());

        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }
}