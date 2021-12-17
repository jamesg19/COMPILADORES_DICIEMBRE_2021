import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";


export class Coseno extends Instruccion{

    operadorIzq:Instruccion;
    //operadorDer:Primitivo;
    fila: number;
    columna:number;
    tipo:TIPO;
    /**
     * CONSTRUCTOR DE OPERACION Cos()
     * @param operador 
     * @param operadorIzq 
     * @param fila 
     * @param columna 
     */
    constructor(operadorIzq:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.operadorIzq=operadorIzq;
        //this.operadorDer=operadorDer;
        this.fila=fila;
        this.columna=columna;
        this.tipo=TIPO.NULL;

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const izq=this.operadorIzq.interpretar(entorno,arbol);
            //const der=this.operadorDer.interpretar(entorno,arbol);
            if(izq instanceof Excepcion){
                return izq;
            }


            //--------------------------COSENO------------------------------

                //validaciones
                if(this.operadorIzq.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                    
                    //-------ENTERO
                    //sen(ENTERO);
                    if(this.operadorIzq.tipo===TIPO.ENTERO  ){
                        this.tipo=TIPO.DECIMAL;
                        return Math.cos(this.obtenerVal(this.operadorIzq.tipo,izq)) ;
                    }

                    ////--------DECIMAL
                    //SEN(DECIMAL)
                    else if(this.operadorIzq.tipo===TIPO.DECIMAL  ){
                        this.tipo=TIPO.DECIMAL;
                        return Math.cos(this.obtenerVal(this.operadorIzq.tipo,izq));
                    }
                    //SEN(BOOLEAN)
                    else if(this.operadorIzq.tipo===TIPO.BOOLEAN  ){
                        this.tipo=TIPO.DECIMAL;
                        return Math.cos(this.obtenerVal(this.operadorIzq.tipo,izq));
                    }


                return new Excepcion("Semantico",`Tipo de datos invalido para Cos()  ${this.operadorIzq.tipo}`,`${this.fila}`,`${this.columna}`);

            

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter Sen() tipo dato incorrecto ",`${this.fila}`,`${this.columna}`);

        }
    }

    getNodo(){
        const nodo= new NodoAST("COSENO");
        nodo.agregarHijo(this.operadorIzq.value+"");
        return nodo;
    }

    obtenerVal(tipo:TIPO,val:string):any{
        try {
            if(tipo === TIPO.ENTERO|| tipo === TIPO.DECIMAL){
                return Number(val);
            }
            else if(tipo === TIPO.BOOLEAN){
                if(val.toLowerCase() === "true"){
                    return true;
                }else{
                    return false;
                }
            }
            else if(tipo === TIPO.CADENA){
                return val;
            }else{
                return val;
            }

        } catch (error) {
            return new Excepcion("Semantico",`No se pudo obtener el valor cos() `,`${this.fila}`,`${this.columna}`);
            
        }

    }


    traducir(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const izq=this.operadorIzq.interpretar(entorno,arbol);
           
            if(izq instanceof Excepcion){
                return izq;
            }

                //validaciones
                if(this.operadorIzq.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                    
                //-------ENTERO
                //sen(ENTERO);
                if(this.operadorIzq.tipo===TIPO.ENTERO  ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq,"");
                    //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq)) ;
                }

                ////--------DECIMAL
                //SEN(DECIMAL)
                else if(this.operadorIzq.tipo===TIPO.DECIMAL  ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq,"");
                    //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq));
                }
                //SEN(BOOLEAN)
                else if(this.operadorIzq.tipo===TIPO.BOOLEAN  ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq,"");
                    //return Math.sin(this.obtenerVal(this.operadorIzq.tipo,izq));
                }


                return new Excepcion("Semantico",`Tipo de datos invalido para Cos()  ${this.operadorIzq.tipo}`,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter Cos() tipo dato incorrecto ",`${this.fila}`,`${this.columna}`);

        }

    }



    setAtributosC3D(izquierda:string,derecha:string){
        
        
        let temp = Principal.temp;
        temp++;
        
        let t = "t"+temp;
        Principal.temp = temp;
        Principal.historial += t +" = cos("+izquierda+");" ;
        Principal.historial += "\n";
        this.tipo = TIPO.DECIMAL;
        return t; 
    }



}