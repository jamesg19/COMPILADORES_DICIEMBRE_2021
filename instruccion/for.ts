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

    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        //realizamos la declaracion  o asignacion
        const  asgina= this.declaracion.traducir(entorno,arbol);    
        if(asgina instanceof Excepcion){
            return asgina;
        }

        //obtenemos la etiqueta actual
        let lcont = Principal.etiqueta;
        lcont++;
        
        Principal.addComentario("FOR");
        Principal.historial+="L"+lcont+":\n";
        
        

        let etiquetaFor=lcont;
        lcont++;

        //se la asignamos a FOR
        let l = "L"+(lcont);
        lcont++;
        let Lasgina=lcont;

        lcont++;
        let lsalida=lcont;


        //ejecuta la condicion
        const value_case=this.condicion.traducir(entorno,arbol);

        if(value_case instanceof Excepcion){
            return value_case;
        }

        Principal.historial += "if( "+value_case+") goto "+l+";\n"
                +"goto L"+lsalida+";\n";
        Principal.historial += l+":\n";

        
        this.instrucciones.forEach((x)=>{
            if(x instanceof Continue){
                Principal.historial += "goto L"+Lasgina+";\n";
                return;
            }
            const value=x.traducir(entorno,arbol);

            if(value instanceof Excepcion){
                return value;
            }
            

            
        });
        Principal.historial += "L"+Lasgina+":"
        //REALIZA INCREMENTO
        const incremental=this.actualizacion.traducir(entorno,arbol);
        if(incremental instanceof Excepcion){
            return incremental;
        }

        Principal.historial+="goto L"+etiquetaFor+";\n";
        
        Principal.historial += "L"+lsalida+":"  
        Principal.etiqueta = lsalida;  



    }
}