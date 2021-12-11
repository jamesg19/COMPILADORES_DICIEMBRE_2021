import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/TipoNativo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from '../../table/simbolo';
import { threadId } from "worker_threads";

export class Acceso_Struct extends Instruccion {
  id: string;
  ids: string[];
  value: any;
  exist: boolean;
  tipo: TIPO;

  constructor(id: string, ids: string[], fila: number, columna: number) {
    super(fila, columna);
    this.id = id;
    this.ids = ids;
    this.exist = false;
    this.tipo = TIPO.NULL;
  }

  interpretar(entorno: TablaSimbolos, arbol: Arbol) {
    
    let sim_struct = entorno.getSimbolo(this.id);
    

  
    if (!sim_struct)
      return new Excepcion(
        "Semantico",
        "No se encontro " + this.id,
        this.fila + "",
        this.columna + ""
      );
    if(!(sim_struct instanceof Simbolo)) return new Excepcion("Error Interno", "v8 is update",this.fila+"",this.columna+"");
    
    if(sim_struct?.tipo != TIPO.STRUCT) 
    return new Excepcion(
      "Semantico",
      "Se requiere un Struct para " + this.id,
      this.fila + "",
      this.columna + ""
    );

    
    let contador = this.ids.length;
    let temp = sim_struct;
    let value_return =new Excepcion("Semantico",this.ids[this.ids.length-1]+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    this.ids.forEach((x) => {
        console.log("x",x)
        if(temp.valor instanceof Map){
          if(temp.valor.has(x) && contador == 1){
            
            return value_return =  temp.valor.get(x);
          }
          temp = temp.valor.get(x);
        }
        
        contador-=1;
        //return new Excepcion("Semantico",x+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    });
    return value_return;
  }
  
}