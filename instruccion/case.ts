import exp from "constants";
import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Break } from "./break";
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
    // getNodo():NodoAST{
    //     const nodo=new NodoAST("CASE");
    //     const instruccionesNodo=new NodoAST("INSTRUCCIONES");

    //     this.instrucciones.forEach((element:Instruccion) => {
    //         //instruccionesNodo.agregarHijo(element.getNodo());
    //     });
    //     nodo.agregarHijoNodo(instruccionesNodo);
    //     return nodo;
    // }



}