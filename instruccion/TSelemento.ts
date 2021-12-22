import { Instruccion } from "../abs/Instruccion";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";

export class TSelemento extends Instruccion{
    

    id:string;
    tipo:string;
    valor:string;
    fila:number;
    columna:number;
    entorno:string;


    constructor(id:string,tipo:string,valor:string,fila:number,columna:number,entorno?:string){
        super(fila,columna);
        this.id=id;
        this.valor=valor;
        this.tipo=tipo;
        this.fila=fila;
        this.columna=columna;
        this.entorno=entorno;
    }   

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        throw new Error("Method not implemented.");
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        throw new Error("Method not implemented.");
    }



}