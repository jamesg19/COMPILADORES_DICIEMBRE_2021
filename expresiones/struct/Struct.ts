import { Instruccion } from '../../abs/Instruccion';
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Excepcion } from '../../table/excepcion';
import { Simbolo } from '../../table/simbolo';
import { TIPO } from '../../table/tipo';
import { Type } from '../../table/Type';
import { Arbol } from '../../table/arbol';


export class Struct extends Instruccion{

  lista_atributos: Array<Object>; //[{id, exp}]
  id:string;

  constructor(id:string lista_atributos: Array<Object>,fila:number,columna:number){
    super(fila,columna);
    this.id = id;    
   // this.lista_atributos = lista_atributos;    
    Object.assign(this, {lista_atributos});
  }

  interpretar(entorno: TablaSimbolos,arbol:Arbol):any {
    const entorno_local = new TablaSimbolos(entorno);
    
    this.lista_atributos.forEach((atributo : Object) => {
      //Validación objeto
      const id = atributo['id'];
      const exp = atributo['exp'];
      
      if(id && exp){
        //Validacion de id unico
        let variable = entorno_local.getSimbolo(id);
        const reasignable = true;
        if(variable){
          return new Excepcion("Semantico","atributo repetido",super.fila+"",super.columna+"");//Errores.getInstance().push(new Error({tipo: 'semantico', linea: this.linea, descripcion: `El id: ${id} esta repetido en el type`}));          
        }

        //Si se puede asignar
        const valor = (exp as Instruccion).interpretar(entorno_local,arbol);
        //{reasignable, id, valor}
        variable = new Simbolo(id,TIPO.STRUCT,super.fila,super.columna,valor,false,true);
        //id: string, tipo: TIPO, fila: number, columna: number, valor: any, arreglo: boolean, struct: boolean
        //entorno.setSi(variable);
        entorno_local.addSimbolo(variable);
      }
    });
    return new Type(this.id    ,entorno_local.tabla);
  }

}
