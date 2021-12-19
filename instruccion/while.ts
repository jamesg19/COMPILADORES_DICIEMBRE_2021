import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Principal } from "../principal";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Continue } from "./continue";
import { Return } from "./Return";

export class While extends Instruccion {

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

        while(true){
            
            
            const condicionn=this.condicion.interpretar(entorno,arbol);
            if(condicionn instanceof Excepcion){
                return condicionn;
            }
            
            //VERIFICA QUE LA CONDICION SEA TIPO BOOLEAN
            if(this.condicion.tipo ==TIPO.BOOLEAN ){
                
                
                //VERIFICA QUE LA CONDICION SE CUMPLA sea TRUE
                if(condicionn == true){

                    //NUEVO ENTONO DENTRO DEL CICLO
                    const nuevaTabla2=new TablaSimbolos(entorno);

                    //ejecuta las instrucciones que estan dentro del WHILE
                    this.instrucciones.forEach((element:Instruccion) => {
                        if(element instanceof Excepcion){
                            arbol.excepciones.push(element);
                            arbol.updateConsolaError(element.toString());
                            console.log(element.toString());
                        }else{
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
            if(element instanceof Excepcion){}
            else{
            instruccionesNodo.agregarHijoNodo(element.getNodo());
            }
        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }

    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        
        
        //obtenemos la etiqueta actual
        let lcont = Principal.etiqueta;
        lcont++;
        
        Principal.addComentario("WHILE");
        Principal.historial+="L"+lcont+":\n";
        
        

        let etiquetaWhile=lcont;
        lcont++;

        //se la asignamos a while
        let l = "L"+(lcont);
        lcont++;
        let lsalida=lcont;

        const value_case=this.condicion.traducir(entorno,arbol);

        if(value_case instanceof Excepcion){
            return value_case;
        }
        
        

        Principal.historial += "if( "+value_case+") goto "+l+";\n"
                +"goto L"+lsalida+";\n";
        Principal.historial += l+":\n";
        this.instrucciones.forEach((x)=>{
            
            const value=x.traducir(entorno,arbol);

            if(value instanceof Excepcion){
                return value;
            }

            
        });
        Principal.historial+="goto L"+etiquetaWhile+";\n";
        
        Principal.historial += "L"+lsalida+":"  
        Principal.etiqueta = lsalida;  



    }


}