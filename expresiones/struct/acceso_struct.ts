import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/tipo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from '../../table/simbolo';


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
   // console.log("temp", temp)
    let value_return =new Excepcion("Semantico",this.ids[this.ids.length-1]+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    this.ids.forEach((x) => {
 
        if(temp.valor instanceof Map){
          if(temp.valor.has(x) && contador == 1){
            //Object.setPrototypeOf({ a: 1 }, Foo.prototype)
            
            let simbolo:Simbolo = Object.setPrototypeOf(temp.valor.get(x),Simbolo.prototype);
            
            if (simbolo instanceof Simbolo){
              value_return =  temp.valor.get(x);//simbolo
             // console.log("simbolo instance of Simbolo",temp.valor.get(x));  
            }
            
            
            return value_return;//value_return =  temp.valor.get(x).valor;
          }
          temp = temp.valor.get(x);
        }
        
        contador-=1;
        //return new Excepcion("Semantico",x+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    });
    return value_return;
  }
  
}
