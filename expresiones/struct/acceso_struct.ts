import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/tipo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";
import { Simbolo } from '../../table/simbolo';
import { NodoAST } from "../../abs/nodo";
import { Acceso } from "../array/acceso";


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
    let temp = sim_struct;//guardo la estructura en un temporal
    
   // console.log("temp", temp)
   let value_return;
    //let value_return =new Excepcion("Semantico",this.ids[this.ids.length-1]+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    this.ids.forEach((x) => {
       
        if(temp.valor instanceof Map){
          
          if(temp.valor.has(x) && contador == 1){
            let simbolo:Simbolo = Object.setPrototypeOf(temp.valor.get(x),Simbolo.prototype);
            if (simbolo instanceof Simbolo){
              value_return =  temp.valor.get(x);//simbolo
            }  
          }else if(x instanceof Acceso){
                    let id_arr = x.id;
                    
                    let lst_exp = x.list_expresiones;
                    if(!temp.valor.has(id_arr)){
                      return new Excepcion("Semantico", "Struct no tiene "+id_arr,super.fila+"",super.columna+"");
                    }
                    // if(!((temp.valor.get(id_arr) instanceof Array))){
                    //   return new Excepcion("Semantico", id_arr+" No es un arreglo",super.fila+"",super.columna+"");
                    // }
                    let temp_arr:any = temp.valor.get(id_arr).valor;
                    let contador = lst_exp.length;
                    //if (contador != 1) temp_arr = 
                    lst_exp.forEach((xx)=>{
                        let index = xx.interpretar(entorno,arbol);
                        if (index instanceof Excepcion) return index;
                        contador--;
                        if(contador == 0){
                        if(temp_arr instanceof Array){
                          if(index<0 || index> temp_arr.length)
                          return value_return = new Excepcion("Semantico", "no existe el indice indicado para el arreglo " + this.id, "" + super.fila, "" + super.columna);
                        return value_return = JSON.parse(JSON.stringify(temp_arr[parseInt(index)]));     
                        }
                        //this.tipo = exist.tipo;
                        
                        return value_return = JSON.parse(JSON.stringify(temp_arr[parseInt(index)])); 
                        }else{
                          temp_arr = (temp_arr)[index];
                        }
                        
                    })
                                       
            }
            return value_return;//value_return =  temp.valor.get(x).valor;
          
          //temp = temp.valor.get(x);
        }
        
        contador-=1;
        //return new Excepcion("Semantico",x+" no se encontro en "+this.id,this.fila+"",this.columna+"");
    });
    
    return value_return;
  }

  getNodo(){
    const nodo=new NodoAST("ACCESO STRUCT");
    nodo.agregarHijo(this.id);
    const acceso=new NodoAST("IDS");
    
    if(this.ids != null || this.ids != undefined){
      this.ids.forEach((instr)=>{
        acceso.agregarHijo(instr);
      });
      nodo.agregarHijoNodo(acceso);
    }

    return nodo;


  }
  
}
