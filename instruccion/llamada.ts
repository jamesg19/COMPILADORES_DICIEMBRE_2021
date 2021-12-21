import { Instruccion } from "../abs/Instruccion";
import { Arbol } from "../table/arbol";
import { TablaSimbolos } from '../table/tablasimbolos';
import { Excepcion } from '../table/excepcion';
import { Simbolo } from '../table/simbolo';
import { TIPO } from "../table/tipo";
import { Return } from "./Return";
import { NodoAST } from "../abs/nodo";
import { Primitivo } from '../expresiones/primitivo';
import { Principal } from '../principal';


export class Llamada extends Instruccion{
    
    id:string;
    lista_parametros?: Array<Instruccion>;
    tipo:TIPO;
    
    // clase para llamar funciones
    // con o sin parametros
constructor(id:string, fila:number,columna:number,lista_parmetros?:Array<Instruccion> ){
        super(fila,columna);
        this.id = id;
        this.lista_parametros = lista_parmetros;
        this.tipo = TIPO.NULL;
    }
    
    //para llamar una funcion
    //debo primero verificar que la funcion exista     ..................listo
    //debo comparar la cantidad de parametros          ..................listo
    //comparar que el tipo de parametro coincida con los de la funcion...
    //ejecutar
    /**
     * @param  {TablaSimbolos} entorno
     * @param  {Arbol} arbol
     * @returns any
     */
    interpretar(entorno:TablaSimbolos, arbol:Arbol):any{
        
        let llamar_funcion = arbol.getFunctionByName(this.id);
        
        if(!llamar_funcion)
            return new Excepcion("Semantico","No se encontro una funcion con el nombre "+this.id,this.fila+"",this.columna+"");
        
        let entorno_local = new TablaSimbolos(entorno);
        
        if(llamar_funcion.getParametrosSize())//verifico que no sea undefined
        
            if(llamar_funcion.getParametrosSize() == this.lista_parametros?.length){//verifico que tengan el mismo tamano
                let contador:number = 0;
                
                this.lista_parametros?.forEach((x)=>{//for para comparar tipos
                    let result_parametros = x.interpretar(entorno,arbol);
                    
                    if(result_parametros instanceof Excepcion) return result_parametros;
                    
                    if( result_parametros instanceof Array && llamar_funcion.lista_parametros[contador]['tipo'] == TIPO.ARREGLO) {
                        
                        
                        //value_return = JSON.parse(JSON.stringify(re));
                        let ident:string = llamar_funcion.lista_parametros[contador]['id']+"";
                        
                        
                        let simbolo:Simbolo = new Simbolo(ident,x.tipo,super.fila,super.columna,result_parametros,true,false );
                        entorno_local.addSimbolo(simbolo);
                        
                        
                    }else if( llamar_funcion.lista_parametros[contador]['tipo'] == x.tipo || (llamar_funcion.lista_parametros[contador]["tipo"] == TIPO.ENTERO && x.tipo == TIPO.DECIMAL)){
                     
                     
                    let ident:string = llamar_funcion.lista_parametros[contador]['id']+"";
                     let simbolo:Simbolo = new Simbolo(ident,x.tipo,super.fila,super.columna,result_parametros,false,false );
                     //agregar la verificacion de arrays y struct
                     entorno_local.addSimbolo(simbolo);
                     
                     
                    }else{
                        return new Excepcion("Semantico", "Tipo de dato diferente en Parametros de la llamada.", super.fila+"", super.columna+"")
                    }
                    contador++;
                                     
                                        
                })
            }else{
                return new Excepcion("Semantico", "hay una diferencia en la cantidad de parametros esperados.", super.fila+"", super.columna+"")
            }
            
            let exec_funcion = llamar_funcion.interpretar(entorno_local,arbol);
            
            if(exec_funcion instanceof Excepcion ) return exec_funcion;

            this.tipo = llamar_funcion.tipo;            
            
            return exec_funcion;            
        
    }

    getNodo() {
        const nodo=new NodoAST("LLAMADA FUNCION");
        nodo.agregarHijo(this.id+" ");

        const parametros= new NodoAST("PARAMETROS");
        if(this.lista_parametros!= null || this.lista_parametros != undefined){
        this.lista_parametros?.forEach(element => {
            parametros.agregarHijoNodo(element.getNodo());    
        });
        nodo.agregarHijoNodo(parametros);
        }
        return nodo;
    }
    traducir(entorno:TablaSimbolos, arbol:Arbol):any{
        
        let llamar_funcion = arbol.getFunctionByName(this.id);
        
        if(!llamar_funcion)
            return new Excepcion("Semantico","No se encontro una funcion con el nombre "+this.id,this.fila+"",this.columna+"");
        
        let entorno_local = new TablaSimbolos(entorno);
        
        if(llamar_funcion.getParametrosSize())//verifico que no sea undefined
        
            if(llamar_funcion.getParametrosSize() == this.lista_parametros?.length){//verifico que tengan el mismo tamano
                let contador:number = 0;
                
                //posicion relativa dentro del stack
                let pos_relative = Principal.temp;
                
                Principal.historial +=  "\tP = "+Principal.temp+";\n";
                
                this.lista_parametros?.forEach((x)=>{//for para comparar tipos
                
                    let result_parametros = x.interpretar(entorno,arbol);
                    
                    pos_relative++;    
                    let t:string = "\tt"+pos_relative+";\n";
                    
                    
                    
                    if(result_parametros instanceof Excepcion) return result_parametros;
                    
                    if( result_parametros instanceof Array && llamar_funcion.lista_parametros[contador]['tipo'] == TIPO.ARREGLO) {
                        
                        
                        //value_return = JSON.parse(JSON.stringify(re));
                        let ident:string = llamar_funcion.lista_parametros[contador]['id']+"";
                        
                        
                        let simbolo:Simbolo = new Simbolo(ident,x.tipo,super.fila,super.columna,result_parametros,true,false );
                        entorno_local.addSimbolo(simbolo);
                        
                        
                    }else if( llamar_funcion.lista_parametros[contador]['tipo'] == x.tipo || (llamar_funcion.lista_parametros[contador]["tipo"] == TIPO.ENTERO && x.tipo == TIPO.DECIMAL)){
                     
                     
                    let ident:string = llamar_funcion.lista_parametros[contador]['id']+"";
                     let simbolo:Simbolo = new Simbolo(ident,x.tipo,super.fila,super.columna,result_parametros,false,false );
                     //agregar la verificacion de arrays y struct
                     entorno_local.addSimbolo(simbolo);
                     
                     
                    }else{
                        return new Excepcion("Semantico", "Tipo de dato diferente en Parametros de la llamada.", super.fila+"", super.columna+"")
                    }
                    contador++;
                                     
                                        
                })
            }else{
                return new Excepcion("Semantico", "hay una diferencia en la cantidad de parametros esperados.", super.fila+"", super.columna+"")
            }
            
            let exec_funcion = llamar_funcion.interpretar(entorno_local,arbol);
            
            if(exec_funcion instanceof Excepcion ) return exec_funcion;

            this.tipo = llamar_funcion.tipo;            
            
            return exec_funcion;            
        
    }

    
    
}