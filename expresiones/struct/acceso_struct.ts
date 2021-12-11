import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/TipoNativo";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { Arbol } from "../../table/arbol";
import { Excepcion } from "../../table/excepcion";

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
    
    if (!arbol.structs.has(this.id))
      return new Excepcion(
        "Semantico",
        "Struct '" + this.id + "'",
        super.fila + "",
        super.columna + ""
      );
    
      
    let struct = arbol.structs.get(this.id);
    this.ids.forEach((x)=>{
       
       
    });
  }
}
