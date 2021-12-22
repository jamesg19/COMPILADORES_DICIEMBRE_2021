import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { TSelemento } from "./TSelemento";
import { TSreporte } from "./TSreporte";


export class Graficar extends Instruccion{

    fila:number;
    columna:number;
    tablaSimbolo:TablaSimbolos;

    constructor(fila:number,columna:number){
        super(fila,columna);
        this.fila=fila;
        this.columna=columna;
        
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {


        const reporte=new TSreporte();
        entorno.tabla.forEach((x)=>{
            
            let elemento=new TSelemento(x.id+"",this.getTipoDato(x.tipo),x.valor+"",x.fila,x.columna);
            reporte.listaElementos.push(elemento);
            
        });
        arbol.graficarts.push(reporte);

    }
    getTipoDato(tipo:TIPO):any{
            if(tipo==TIPO.ARREGLO){
                return "ARREGLO";
            }else if(tipo==TIPO.BOOLEAN){
                return "BOOLEAN";
            }else if(tipo==TIPO.CADENA){
                return "CADENA";
            }else if(tipo==TIPO.CARACTER){
                return "CARACTER";
            }else if(tipo==TIPO.DECIMAL){
                return "DECIMAL";
            }else if(tipo==TIPO.ENTERO){
                return "ENTERO";
            }else if(tipo==TIPO.NULL){
                return "NULL";
            }else if(tipo==TIPO.STRUCT){
                return "STRUCT";
            }else if(tipo==TIPO.VOID){
                return "VOID";
            }
    }
    getNodo():NodoAST{
        const nodo=new NodoAST("Graficar_TS");
        return nodo;
    }
    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        return new Graficar(this.fila,this.columna);
    }
}