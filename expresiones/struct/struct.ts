import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Excepcion } from '../../table/excepcion';
import { Simbolo } from '../../table/simbolo';
import { TIPO } from '../../table/tipo';
import { Type } from '../../table/Type';
import { Arbol } from '../../table/arbol';
import { Atributo } from './atributo';
import { TIPO } from '../../table/TipoNativo';


export class Struct extends Instruccion{

  lista_atributos: Atributo[]; //[{id, exp}]
  
  id:string;

  constructor(id:string ,lista_atributos: Atributo[],fila:number,columna:number){
    super(fila,columna);
    this.id = id;    
   // this.lista_atributos = lista_atributos;  
   this.lista_atributos = lista_atributos;  
    //Object.assign(this, {lista_atributos});
  }

  interpretar(entorno: TablaSimbolos,arbol:Arbol):any {
    const entorno_local = new TablaSimbolos(entorno);
    
    if(!(arbol.structs.has(this.id))){
      
        this.lista_atributos.forEach((atributo ) => {
          //Validación objeto

          
          
            //Validacion de id unico
            let variable = entorno_local.getSimbolo(atributo.id);
            const reasignable = true;
            if(variable){
              return new Excepcion("Semantico","atributo repetido",super.fila+"",super.columna+"");//Errores.getInstance().push(new Error({tipo: 'semantico', linea: this.linea, descripcion: `El id: ${id} esta repetido en el type`}));          
            }
    
      
            //Si se puede asignar
            const valor = this.getValue(atributo.tipo);
            //{reasignable, id, valor}
            variable = new Simbolo(atributo.id,TIPO.STRUCT,atributo.fila,atributo.columna,valor,this.arra,this.struct);
            //id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean
            //entorno.setSi(variable);
            entorno_local.addSimbolo(variable);
        });
        
        arbol.structs.set(this.id,JSON.parse(JSON.stringify(this)));
        return new Type(this.id,entorno_local.tabla);
      }
    return new Excepcion("Semantico", "Existe un Struct con "+this.id, super.fila+"",super.columna+"")
  }
  
  getValue(tipo:TIPO){
    
    switch(tipo){
      case TIPO.BOOLEAN: return false;
      case TIPO.ENTERO: return 0;
      case TIPO.DECIMAL: return 0.0;
      case TIPO.CARACTER: return '';
      case TIPO.CADENA: return "";
      case TIPO.ARREGLO :
        case TIPO.STRUCT : return undefined;
    }
  }

}