import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";

import { Excepcion} from "../../table/excepcion"
import { TIPO } from "../../table/tipo";
import {TIPO_NATIVA_CADENA } from "./tiponativacadena";
import { Primitivo } from "../primitivo";
import { Identificador } from "../identificador";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';


export class RepeticionCadena extends Instruccion{
    identificador:Instruccion;
    tipo_operacion:TIPO_NATIVA_CADENA;
    inicio:Instruccion;
    final:Instruccion;
    fila: number;
    columna:number;

    static REPETICION:boolean= false;
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador 
     * @param identificador 
     * @param fila 
     * @param columna 
     */
    constructor(id:Instruccion,tipo:TIPO_NATIVA_CADENA,inicio:Instruccion,final:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.identificador=id;
        this.tipo_operacion=tipo;
        this.inicio=inicio;
        this.final=final;
        this.fila=fila;
        this.columna=columna;
        

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const iden=this.identificador.interpretar(entorno,arbol);
           
            //DETERMINA SI ES REPETICION
            if(this.identificador instanceof Identificador){

                const simboll=entorno.getSimbolo(this.identificador.id+"");
                //verifica si existe
                if(simboll instanceof Excepcion){
                    return simboll;
                }

                if(simboll ==null){
                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador.id}`, `${this.fila}`,`${this.columna}`);
                }else{
                    var texto="";
                    for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                        texto+=this.identificador.interpretar(entorno,arbol);
                    }
                    this.tipo=TIPO.CADENA;
                    return texto;
                }
                
            }
            //  SI ES UNA CADENA SIMPLE
            else{


                const start=this.inicio.interpretar(entorno,arbol);
                const id=this.identificador.interpretar(entorno,arbol);

                if(id instanceof Excepcion){
                    return id;
                }
                if(start instanceof Excepcion){
                    return start;
                }
                //VERIFICA QUE LAS REPETICIONES SEA UN ENTERO
                if(this.inicio.tipo != TIPO.ENTERO){
                    return new Excepcion('Semantico','El parametro de repeticiones debe ser entero',`${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE EL NUMERO SEA >=0
                if(this.inicio.interpretar(entorno,arbol)<0 ){
                    return new Excepcion('Semantico','El numero de repeticiones debe ser >= 0',`${this.fila}`,`${this.columna}`);
                }
                
                if(this.identificador.tipo != TIPO.CADENA){
                    return new Excepcion('Semantico','El tipo de expresion debe ser cadena en repeticion ',`${this.fila}`,`${this.columna}`);
                }
                var cadena="";
                for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                    cadena+=this.identificador.interpretar(entorno,arbol);
                }
                this.tipo=TIPO.CADENA;
                return cadena;



            }




            return new Excepcion("Semantico",`Tipo de datos invalido para metodo nativo repeticion string() `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter repeticion ^ cadena",`${this.fila}`,`${this.columna}`);

        }
    }
    getNodo(){
        const nodo= new NodoAST("REPEAT");
        if( (this.inicio!=null) || (this.inicio != undefined)){
            nodo.agregarHijoNodo(this.expresion.getNodo());
            nodo.agregarHijo("^");
            nodo.agregarHijoNodo(this.inicio.getNodo());
            return nodo;
        }else{
            nodo.agregarHijo("^");
            nodo.agregarHijoNodo(this.expresion.getNodo());
            return nodo;
        }
    }


    obtenerVal(tipo:TIPO,val:string):any{
        try {
            if(tipo === TIPO.ENTERO|| tipo === TIPO.DECIMAL){
                return Number(val);
            }
            else if(tipo === TIPO.BOOLEAN){
                if(val.toLowerCase() === "true"){
                    return true;
                }else{
                    return false;
                }
            }
            else if(tipo === TIPO.CADENA){
                return val;
            }else{
                return val;
            }

        } catch (error) {
            return new Excepcion("Semantico",`No se pudo obtener el valor en Sen() `,`${this.fila}`,`${this.columna}`);
        }

    }
    
    traducir(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            let iden=this.identificador.traducir(entorno,arbol);
           
            //DETERMINA SI ES REPETICION
            if(this.identificador instanceof Identificador){

                const simboll=entorno.getSimbolo(this.identificador.id+"");
                //verifica si existe
                if(simboll instanceof Excepcion){
                    return simboll;
                }

                if(simboll ==null){
                    return new Excepcion("Semantico","No existe la variable " + `${this.identificador.id}`, `${this.fila}`,`${this.columna}`);
                }else{
                    var texto="";
                    //Principal.posicion
                    let temp:number = Principal.temp;
                    temp++;
                    let t_cadena = "t"+temp;
                    temp++;
                    let t_cantidad = "t"+temp;
                    //this.inicio.interpretar(entorno,arbol)
                    let cantidad = this.inicio.interpretar(entorno,arbol);
                    
                    if(cantidad instanceof Excepcion) return cantidad;
                    
                    //posicion en la que se almacenara la posicion de la cadena
                    //Principal.historial += t_cantidad+ " = " +cantidad + ";\n";//almaceno la cantidad que se debe repetir
                    Principal.addComentario("Posicion libre en el stack");
                    Principal.historial += "P = "+(Principal.posicion+1)+";\n";//obtengo la posicion libre actual
                    Principal.addComentario("Obtengo la posicion de la variable");
                    Principal.historial += t_cadena+" = "+(simboll.posicion)+";\n";//obtengo la posicion de la cadena
                    Principal.addComentario("Guardo  la posicion de la cadena en la posicion libre del stack")                    
                    Principal.historial += "stack[(int) P] ="+t_cadena+";\n ";//guarda la posicion de la cadena 
                    Principal.addComentario("Almaceno la cantidad de veces que se debe repetir la cadena")
                    Principal.historial += "stack[(int) (P+"+1+")] = "+  cantidad +";\n";
                    
                    Principal.historial += "potencia_string();\n";
                    
                    
                    
                    Principal.historial += "P = "+(t_cadena)+";\n";
                    RepeticionCadena.REPETICION = true;
                    
                    this.tipo=TIPO.CADENA;
                    return "P";
                }
                
            }
            //  SI ES UNA CADENA SIMPLE
            else{


                const start=this.inicio.interpretar(entorno,arbol);
                const id=this.identificador.interpretar(entorno,arbol);

                if(id instanceof Excepcion){
                    return id;
                }
                if(start instanceof Excepcion){
                    return start;
                }
                //VERIFICA QUE LAS REPETICIONES SEA UN ENTERO
                if(this.inicio.tipo != TIPO.ENTERO){
                    return new Excepcion('Semantico','El parametro de repeticiones debe ser entero',`${this.fila}`,`${this.columna}`);
                }
                //VERIFICA QUE EL NUMERO SEA >=0
                if(this.inicio.interpretar(entorno,arbol)<0 ){
                    return new Excepcion('Semantico','El numero de repeticiones debe ser >= 0',`${this.fila}`,`${this.columna}`);
                }
                
                if(this.identificador.tipo != TIPO.CADENA){
                    return new Excepcion('Semantico','El tipo de expresion debe ser cadena en repeticion ',`${this.fila}`,`${this.columna}`);
                }
                var cadena="";
                //for(let i=0;i<this.inicio.interpretar(entorno,arbol);i++){
                    cadena+=this.identificador.traducir(entorno,arbol);
                //}
                
                
                
                let temp:number = Principal.temp;
                temp++;
                let t_cadena = "t"+temp;
                temp++;
                let t_cantidad = "t"+temp;
                //this.inicio.interpretar(entorno,arbol)
                let cantidad = this.inicio.interpretar(entorno,arbol);
                
                Principal.addComentario("Posicion libre en el stack");
                    Principal.historial += "P = "+(Principal.posicion+2)+";\n";//obtengo la posicion libre actual
                    Principal.addComentario("Obtengo la posicion de la variable");
                    Principal.historial += t_cadena+" = "+(cadena)+";\n";//obtengo la posicion de la cadena
                    Principal.addComentario("Guardo  la posicion de la cadena en la posicion libre del stack")                    
                    Principal.historial += "stack[(int) P] ="+t_cadena+";\n ";//guarda la posicion de la cadena 
                    Principal.addComentario("Almaceno la cantidad de veces que se debe repetir la cadena")
                    Principal.historial += "stack[(int) (P+"+1+")] = "+  cantidad +";\n";
                    
                    Principal.historial += "potencia_string();\n";
                    
                    
                    
                    Principal.historial += "P = "+(t_cadena)+";\n";
                    RepeticionCadena.REPETICION = true;
                    
                    this.tipo=TIPO.CADENA;
                
                
                this.tipo=TIPO.CADENA;
                return cadena;



            }




            return new Excepcion("Semantico",`Tipo de datos invalido para metodo nativo repeticion string() `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter repeticion ^ cadena",`${this.fila}`,`${this.columna}`);

        }
    }
    
    
    transform_cadena(x: string, arbol: Arbol): string {
        let return_string: string = "";
        let temp = Principal.temp;
        temp++;
        let t  = "t"+temp;
        return_string = t+ " = H;\n";
        
        Principal.temp = temp;
        //obtener codigo ASCII de cada caracter de la cadena
        //cadena en el heap
        if(!x) x="Undefined";
        
        for (let i = 0; i < x.length-1; i++) {
          let item: number = x.charCodeAt(i);
          return_string += "heap[(int)H] = " + item + " ;\n";
          return_string += "H = H + 1;\n";
          //console.log(item);
        }
        return_string += "heap[(int)H] = -1 ;\n";
        return_string += "H = H + 1;\n";
    
        //referencia de la cadena desde el stack
        //Principal.posicion;
        return_string +=
          "t" + Principal.temp + " = P + " + Principal.posicion + ";\n";
          
        return t;
      }

}



