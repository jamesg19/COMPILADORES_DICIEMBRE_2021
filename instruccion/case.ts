import exp from "constants";
import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Principal } from "../principal";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Break } from "./break";
import { Continue } from "./continue";
import { Print } from "./print";
import { Return } from "./Return";

export class Case extends Instruccion{

    condicion:Instruccion;
    instrucciones:Instruccion[];
    fila: number;
    columna:number;
    ins:Instruccion;

    constructor(condicion:Instruccion,instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);

        this.condicion=condicion;
        this.instrucciones=instrucciones;
        this.fila=fila;
        this.columna=columna;
        this.ins=condicion;

    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        const ab="";
        //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
        const nuevaTabla=new TablaSimbolos(entorno);

        this.instrucciones.forEach((element:Instruccion) => {
            //ejecuta las instrucciones

            element.interpretar(nuevaTabla,arbol);
            
            if(element instanceof Excepcion){
                arbol.excepciones.push(element);
                this.ins == element;
                //agregar reporte de consola
                //arbol.updateConsola(element.toString();)

            }

            if(element instanceof Break){
                this.ins = element;
                return element;
            }
            if(element instanceof Return){
                this.ins == element;
                return element;
            }
            

        });
        //soy un crack
        return this.ins;
        
    }
    getNodo():NodoAST{
        const nodo=new NodoAST("CASE");
        const instruccionesNodo=new NodoAST("INSTRUCCIONES");

        this.instrucciones.forEach((element:Instruccion) => {
            instruccionesNodo.agregarHijo(element.getNodo());
        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }



    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        const ab="";
        //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
        const nuevaTabla=new TablaSimbolos(entorno);
        let lcont = Principal.etiqueta;
        lcont++;
        let l = "L"+lcont;
        Principal.historial += l+":"
        this.instrucciones.forEach((element:Instruccion) => {
            //ejecuta las instrucciones

            element.traducir(nuevaTabla,arbol);
            
            if(element instanceof Excepcion){
                arbol.excepciones.push(element);
                this.ins == element;
                //agregar reporte de consola
                //arbol.updateConsola(element.toString();)

            }

            if(element instanceof Break){
                this.ins = element;
                return element;
            }
            if(element instanceof Return){
                this.ins == element;
                return element;
            }
            

        });
        Principal.etiqueta = lcont;//Revisar el contador de etiquetas
        //soy un crack
        return this.ins;
        
    }


    traducir2(entorno: TablaSimbolos, arbol: Arbol) {
        
        this.ins=this;
        const condition=this.condicion.traducir(entorno,arbol);
        Principal.historial += "\t";
        if(condition instanceof Excepcion){
            return condition;
        }
        

      
        
        Principal.addComentario("------------>CASE<----------------")
        

            //verifica que la condicion sea TRUE
          //  if(condition){
                //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
                const nuevaTabla=new TablaSimbolos(entorno);
                
                //EJECUTA LAS INSTRUCCIONES

                this.instrucciones.forEach((element:Instruccion) => {
                    if(element instanceof Excepcion){
                        arbol.excepciones.push(element);
                        arbol.updateConsolaError(element.toString());
                            console.log(element.toString());
                    }else{

                    const result=element.traducir(nuevaTabla,arbol);
                    
                    if(result instanceof Excepcion){

                        arbol.excepciones.push(result);
                        arbol.updateConsolaError(result.toString());
                        
                    }
                    if(result instanceof Break || result instanceof Continue ){
                        this.ins=result;
                        return result;
                    }
                    if(result instanceof Return){
                        this.ins=result;
                    
                        //console.log(result.value?.traducir(nuevaTabla,arbol)+"VALUE RETURN");
                        return result;
                    }
                }
                    
                });

        return this.ins;
    }




}