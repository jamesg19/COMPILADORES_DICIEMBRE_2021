import exp from "constants";
import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { Break } from "./break";
import { Return } from "./Return";

export class Default extends Instruccion{

    instrucciones:Instruccion[];
    fila: number;
    columna:number;

    constructor(instrucciones:Instruccion[],fila:number,columna:number){
        super(fila,columna);

        this.instrucciones=instrucciones;
        this.fila=fila;
        this.columna=columna;
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
        const nuevaTabla=new TablaSimbolos(entorno);

        this.instrucciones.forEach((element:Instruccion) => {
            //ejecuta las instrucciones
            element.interpretar(nuevaTabla,arbol);
            if(element instanceof Excepcion){
                arbol.excepciones.push(element);
                //agregar reporte de consola
                //arbol.updateConsola(element.toString();)

            }
            if(element instanceof Break){
                return true;
            }
            if(element instanceof Return){
                return element;
            }

        });
        return this;
        
    }
    getNodo():NodoAST{
        const nodo=new NodoAST("CASE");
        const instruccionesNodo=new NodoAST("INSTRUCCIONES");

        this.instrucciones.forEach((element:Instruccion) => {
            //instruccionesNodo.agregarHijo(element.getNodo());
        });
        nodo.agregarHijoNodo(instruccionesNodo);
        return nodo;
    }



}