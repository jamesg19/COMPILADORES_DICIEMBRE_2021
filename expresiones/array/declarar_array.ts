import { Instruccion } from "../../abs/Instruccion";
import { TIPO } from "../../table/TipoNativo";
import { TablaSimbolos } from '../../table/tablasimbolos';
import { Arbol } from '../../table/arbol';

export class Arreglo extends Instruccion {
  id: string;
  tipo: TIPO;
  t_esperado: TIPO;
  corchete: number;
  lst_expresiones:Instruccion[];

    
  /**
   * @param  {string} id
   * @param  {TIPO} tipo
   * @param  {TIPO} t_esperado
   * @param  {number} corchete
   */
  constructor(
    id: string,
    tipo: TIPO,
    lst_expresiones:Instruccion[];
    t_esperado: TIPO,
    corchete: number,
    fila: number,
    columna: number
  ) {
      
    super(fila, columna);
    this.id = id;
    this.lst_expresiones = lst_expresiones;
    this.tipo = tipo;
    this.t_esperado = t_esperado;
    this.corchete = corchete;
  }
  
  interpretar(entorno:TablaSimbolos, arbol:Arbol):any{
      let dimensiones = this.dimensiones()
  }
}
