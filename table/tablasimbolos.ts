/**
 * @param  {TablaSimbolos|undefined} anterior
 */
import { Simbolo } from './simbolo';
import { Excepcion } from './excepcion';
import { Struct } from '../expresiones/struct/struct';

export class TablaSimbolos{
    
    
    tabla: Map<String, Simbolo> ;
    anterior:TablaSimbolos|undefined;
    
    
    /**
     * @param  {TablaSimbolos|undefined} anterior
     */
    constructor(anterior:TablaSimbolos|undefined){
        
        this.tabla = new Map();
        this.anterior = anterior;    
        
        
    }
    /**
     * @param  {Simbolo} simbolo
     */
    addSimbolo(simbolo:Simbolo){
        
        if(simbolo.id in this.tabla){
            return new Excepcion("Semantico", "Variable "+simbolo.id+" ya existe en el entorno",simbolo.fila+"",simbolo.columna+"");
        }else{
            this.tabla.set(simbolo.id,simbolo);             
        }
        
    }
    /**
     * @param  {string} id
     */
    getSimbolo(id:string){
        let tabla_actual:TablaSimbolos|undefined = this;
        while (tabla_actual != undefined){
            
            
            if(tabla_actual.tabla.has(id)){
                return tabla_actual.tabla.get(id);
                
            }else{
                 tabla_actual = tabla_actual.anterior;
                
            }
            
        }
        return null;
        
    }
    //obtener el simbolo
    getSimboloJ(id:string):Simbolo|undefined{
        let tabla_actual:TablaSimbolos|undefined = this;
        while (tabla_actual != undefined || tabla_actual!= null ){
            
            if(tabla_actual.tabla.has(id)){

                let s = tabla_actual.tabla.get(id);
                s?.id;
                //retorna el simbolo
                return s

            }else{
                tabla_actual = tabla_actual.anterior;
            }
        }
    }
    /**
     * @param  {Simbolo} simbolo
     */
    actualizarSimboloEnTabla(simbolo:Simbolo){
        let tabla_actual:TablaSimbolos|undefined = this;
        
        while (tabla_actual != null){
            
            if(tabla_actual.tabla.has(simbolo.id)){
            
                let s = tabla_actual.tabla.get(simbolo.id);
                s?.id;
                if(s?.getTipo == simbolo.getTipo){
                    //tabla_actual.tabla.get(simbolo.id) = s
                    tabla_actual.tabla.delete(simbolo.id);
                    tabla_actual.tabla.set(simbolo.id,simbolo);
                    return ;                    
                }
                return new Excepcion("Semantico", "Tipo de dato Diferente en Asignacion", simbolo.fila+"", simbolo.columna+"");
                
            }else{
                 tabla_actual = tabla_actual.anterior;
                
            }
        }
        return new Excepcion("Semantico", "Variable No encontrada en Asignacion", simbolo.fila+"", simbolo.columna+"");
        
    }
     
    
}