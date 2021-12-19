import { Instruccion } from "../abs/Instruccion";
import { NodoAST } from "../abs/nodo";
import { Primitivo } from "../expresiones/primitivo";
import { Arbol } from "../table/arbol";
import { Excepcion } from "../table/excepcion";
import { TablaSimbolos } from "../table/tablasimbolos";
import { TIPO } from "../table/tipo";
import { Break } from "./break";
import { Continue } from "./continue";
import { Return } from "./Return";
import { Principal } from '../principal';

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
                    if(element instanceof Excepcion){
                        arbol.excepciones.push(element);
                        arbol.updateConsolaError(element.toString());
                        console.log(element.toString());
                    }else{
                    const result=element.interpretar(nuevaTabla,arbol);
                    if(result instanceof Excepcion){

                        arbol.excepciones.push(result);
                        arbol.updateConsolaError(result.toString());
                        
                    }
                    if(result instanceof Break || result instanceof Continue ){
                        this.ins=result;
                        return result;
                    }
                    if(result instanceof Return){
                        this.ins=result;
                    
                        //console.log(result.value?.interpretar(nuevaTabla,arbol)+"VALUE RETURN");
                        return result;
                    }
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
                        if(element2 instanceof Excepcion){
                            arbol.excepciones.push(element2);
                            arbol.updateConsolaError(element2.toString());
                            console.log(element2.toString());
                        }else{
                        const result=element2.interpretar(nuevaTabla,arbol);

                        if(result instanceof Excepcion){
                            ///
                            ///
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                        if(result instanceof Return){
                            this.ins=result;
                            //console.log(result.value?.interpretar(nuevaTabla,arbol)+"VALUE RETURN");
                            return result;
                        }
                    }
                    });
                } 
                //INSTRUCCIONES ELSE IF
                else if(this.ElseIf !=null || this.ElseIf != undefined){

                    //ejecuta instrucciones else
                    const nuevaTabla=new TablaSimbolos(entorno);
                    this.ElseIf.forEach((element2) => {
                        if(element2 instanceof Excepcion){
                            arbol.excepciones.push(element2);
                            arbol.updateConsolaError(element2.toString());
                            console.log(element2.toString());
                        }else{
                        const result=element2.interpretar(nuevaTabla,arbol);
                        
                        if(result instanceof Excepcion){
                            ///
                            ///
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                        if(result instanceof Return){
                            this.ins=result;
                            //console.log(result.value?.interpretar(nuevaTabla,arbol)+"VALUE RETURN");
                            return result;
                        }
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
        const nodo=new NodoAST("IF");
        const instruccionesIf=new NodoAST("INSTRUCCION IF");

        this.instruccionesIf.forEach((instr:Instruccion)=>{
            
            instruccionesIf.agregarHijoNodo(instr.getNodo());

        });
        nodo.agregarHijoNodo(instruccionesIf);

        if(this.instruccionesElse!=null || this.instruccionesElse!=undefined){
            const instruccionesElse=new NodoAST("INSTRUCCIONES ELSE");
            
            this.instruccionesElse.forEach((instr:Instruccion)=>{
                if(instr instanceof Excepcion){}
            else{
                instruccionesElse.agregarHijoNodo(instr.getNodo());
            }
            });
            nodo.agregarHijoNodo(instruccionesElse);
        } else if(this.ElseIf!=null || this.ElseIf!=undefined){

            const elseIf=new NodoAST("INSTRUCCIONES ELSE IF");
            
            this.ElseIf.forEach((instr:Instruccion)=>{
                elseIf.agregarHijoNodo(instr.getNodo());
            });
            nodo.agregarHijoNodo(elseIf);

        }

        return nodo;
    }
    
    
    
    /**if===> */
    
    
    traducir(entorno: TablaSimbolos, arbol: Arbol) {
        
        this.ins=this;
        const condition=this.condicion.traducir(entorno,arbol);
        Principal.historial += "\t";
        
        if(condition instanceof Excepcion){
            return condition;
        }
        
        //verifica que la condicion sea boolean
        if(this.condicion.tipo == TIPO.BOOLEAN){
        //declaracion de etiquetas y temporales
        let tem = Principal.temp;
        tem++;
        
        let t:string =  "t"+tem;//temporal donde se almacenara el resultado de la condicion
        t = condition;
        
        let lcont = Principal.etiqueta;
        lcont++;
        let l_veradero = "L"+lcont;
        lcont++;
        let l_falso = "L"+lcont;
        lcont++;
        let l_salida = "L"+lcont;
        
        Principal.etiqueta = lcont;
        
        
        Principal.addComentario("------------>If<----------------")
        
        Principal.historial += "if("+t+") goto "+l_veradero+";\n"+ 
                                "goto "+ l_falso+";\n";
        //console.log(this.condicion.traducir(entorno,arbol));
         Principal.historial += l_veradero+":\n"   ;

            //verifica que la condicion sea TRUE
          //  if(condition){
                //CREA UN ENTORNO PARA LAS INSTRUCCIONES DENTRO DEL IF
                const nuevaTabla=new TablaSimbolos(entorno);
                
                //EJECUTA LAS INSTRUCCIONES

                this.instruccionesIf.forEach((element:Instruccion) => {
                    if(element instanceof Excepcion){
                        arbol.excepciones.push(element);
                        arbol.updateConsolaError(element.toString());
                        console.log(element.toString());
                    }else{
                    const result=element.traducir(nuevaTabla,arbol);
                    if(result instanceof Excepcion){

                        arbol.excepciones.push(result);
                        arbol.updateConsolaError(result.toString());
                        
                    }
                    if(result instanceof Break || result instanceof Continue ){
                        this.ins=result;
                        return result;
                    }
                    if(result instanceof Return){
                        this.ins=result;
                    
                        //console.log(result.value?.traducir(nuevaTabla,arbol)+"VALUE RETURN");
                        return result;
                    }
                }
                    
                });
          //  }
            //SI ES FALSA
           // else{
               
            Principal.historial += "goto "+l_salida+";\n";
            Principal.addComentario("Else ")
            Principal.historial += l_falso+":\n"
                //console.log("la condicion tiene que entrar a else")
                if(this.instruccionesElse != null || this.instruccionesElse != undefined ){
                    //crea un nuevo entorno
                    const nuevaTabla=new TablaSimbolos(entorno);
                    
                    //ejecuta instrucciones else
                    this.instruccionesElse.forEach((element2:Instruccion) => {
                        if(element2 instanceof Excepcion){
                            arbol.excepciones.push(element2);
                            arbol.updateConsolaError(element2.toString());
                            console.log(element2.toString());
                        }else{
                        const result=element2.traducir(nuevaTabla,arbol);

                        if(result instanceof Excepcion){
                            ///
                            ///
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                        if(result instanceof Return){
                            this.ins=result;
                            //console.log(result.value?.traducir(nuevaTabla,arbol)+"VALUE RETURN");
                            return result;
                        }
                    }
                    });
                } 
                //INSTRUCCIONES ELSE IF
                else if(this.ElseIf !=null || this.ElseIf != undefined){

                    //ejecuta instrucciones else
                    const nuevaTabla=new TablaSimbolos(entorno);
                    this.ElseIf.forEach((element2) => {
                        if(element2 instanceof Excepcion){
                            arbol.excepciones.push(element2);
                            arbol.updateConsolaError(element2.toString());
                            console.log(element2.toString());
                        }else{
                        const result=element2.traducir(nuevaTabla,arbol);
                        
                        if(result instanceof Excepcion){
                            ///
                            ///
                            arbol.excepciones.push(result);
                            arbol.updateConsolaError(result.toString());
                        }
                        if(result instanceof Break || result instanceof Continue ){
                            this.ins=result;
                            return result;
                        }
                        if(result instanceof Return){
                            this.ins=result;
                            //console.log(result.value?.traducir(nuevaTabla,arbol)+"VALUE RETURN");
                            return result;
                        }
                    }

                    });
                
          
                }
            //}
           Principal.addComentario("Etiqeta de salida");
           Principal.historial += l_salida+":"


        }else{
            console.log('TIPO DATO NO BOOLEANO');
            return new Excepcion("Semantico", "Tipo de dato no Booleano en IF",`${this.fila}`,`${this.columna}`);
        }


        return this.ins;
    }
}