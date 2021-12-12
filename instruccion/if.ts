import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Primitivo } from "../expresiones/primitivo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Continue } from "./continue";

export class If extends Instruccion{
    condicion:Instruccion;
    instruccionesIf:Instruccion[];
    instruccionesElse:Instruccion[];
    ElseIf:Array<Instruccion>;
    fila:number;
    columna:number;
    ins:Instruccion;

    constructor(condicion:Instruccion,instruccionesIf:Instruccion[],instruccionesElse:Instruccion[],ElseIf:Array<Instruccion>,fila:number,columna:number){
        super(fila,columna);
        this.condicion=condicion;
        this.instruccionesIf=instruccionesIf;
        this.instruccionesElse=instruccionesElse;
        this.ElseIf=ElseIf;
        this.fila=fila;
        this.columna=columna;
        this.ins=condicion;
    }

    interpretar(entorno: TablaSimbolos, arbol: Arbol) {
        this.ins=this;
        //console.log(this.condicion.interpretar(entorno,arbol));
        const condition=this.condicion.interpretar(entorno,arbol);
        
        if(condition instanceof Excepcion){
            return condition;
        }
        

        //verifica que la condicion sea boolean
        if(this.condicion.tipo == TIPO.BOOLEAN){
            
            //verifica que la condicion sea TRUE
            if(condition){

                //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
                const nuevaTabla=new TablaSimbolos(entorno);
                //EJECUTA LAS INSTRUCCIONES

                this.instruccionesIf.forEach((element:Instruccion) => {
         
                    const result=element.interpretar(nuevaTabla,arbol);
                    if(result instanceof Excepcion){
                        ///
                        ///
                        //arbol.excepciones.push(result);
                        //arbol.actualizar_consola(result.toString());
                        
                    }
                    if(result instanceof Break || result instanceof Continue ){
                        this.ins=result;
                        return result;
                    }
                    
                });


            }
            //SI ES FALSA
            else{
                //console.log("la condicion tiene que entrar a else")
                if(this.instruccionesElse != null || this.instruccionesElse != undefined ){
                    //crea un nuevo entorno
                    const nuevaTabla=new TablaSimbolos(entorno);
                    
                    //ejecuta instrucciones else
                    this.instruccionesElse.forEach((element2:Instruccion) => {

                        const result=element2.interpretar(nuevaTabla,arbol);

                        if(result instanceof Excepcion){
                            ///
                            ///
                            //arbol.excepciones.push(result);
                            //arbol.actualizar_consola(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                    });
                } 
                //INSTRUCCIONES ELSE IF
                else if(this.ElseIf !=null || this.ElseIf != undefined){

                    //ejecuta instrucciones else

                    this.ElseIf.forEach((element2) => {
                        const result=element2.interpretar(entorno,arbol);
                        if(result instanceof Excepcion){
                            ///
                            ///
                            //arbol.excepciones.push(result);
                            //arbol.actualizar_consola(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                    });
                
          
                }
            }


        }else{
            console.log('TIPO DATO NO BOOLEANO');
            return new Excepcion("Semantico", "Tipo de dato no Booleano en IF",`${this.fila}`,`${this.columna}`);
        }


        return this.ins;
    }
    getNodo():NodoAST{
        return new NodoAST("IF");
    }
}