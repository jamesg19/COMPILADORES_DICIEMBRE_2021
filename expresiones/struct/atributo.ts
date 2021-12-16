import { TIPO } from "../../table/tipo";
import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';
import { NodoAST } from "../../abs/nodo";


export class Atributo {
    id: string;
    tipo: TIPO;
    fila: number;
    columna: number;
    valor: Instruccion;
    value:any;
    arreglo: boolean;
    //struct: boolean;
    constante:boolean;
    struct:boolean;

    constructor(id: string, tipo: TIPO,arreglo:boolean ,fila:number, columna: number) {
        this.id = id;
        this.tipo = tipo;
        this.fila = fila;
        this.columna = columna;
        //this.valor = valor;
        this.arreglo = arreglo;
        //this.struct = struct;
        this.constante = false;
        this.valor = null;
        this.struct = (tipo == TIPO.STRUCT)?true:false;
        

    }
    toString():string{
        return "hola";
        // let value:string  = this.valor;
        
        // if(this.struct){
            
        //     value = "";
            
        //     value = this.name_struct + "( ";
        //     console.log()
        //       if (this.valor instanceof Map) {
        //         //sim.valor.map((x)=> console.log(x));
        //         this.valor.forEach((x) => {
        //             //if(x instanceof Simbolo)
        //             value += x.id+ " = "+x.valor+", ";//x.toString()//x();
        //         });
        //         value = value.slice(0, value.length - 2);
        //         value += " )";
        //       }
        //     //else if(this.valor instanceof )
            
        // }
        // return value;
    }
    interpretar(entorno:TablaSimbolos,arbol:Arbol){
     
            
    }
    getNodo(){
        const nodo= new NodoAST("ATRIBUTO");
        nodo.agregarHijo(this.id);

        return nodo;

    }

}