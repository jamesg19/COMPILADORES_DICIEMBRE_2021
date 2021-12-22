import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from "../../principal";


export class Pow extends Instruccion{
    base:Instruccion;
    potencia:Instruccion;
    //operadorDer:Primitivo;
    fila: number;
    columna:number;
    tipo:TIPO;
    
    static Pow:boolean = false;
    /**
     * CONSTRUCTOR DE OPERACION TANGENTE()
     * @param operador 
     * @param base 
     * @param fila 
     * @param columna 
     */
    constructor(base:Instruccion,potencia:Instruccion,fila:number,columna:number){
        super(fila,columna);
        this.base=base;
        this.potencia=potencia;
        //this.operadorDer=operadorDer;
        this.fila=fila;
        this.columna=columna;
        this.tipo=TIPO.NULL;

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const base=this.base.interpretar(entorno,arbol);
            const potencia=this.potencia.interpretar(entorno,arbol);
            //const der=this.operadorDer.interpretar(entorno,arbol);
            if(base instanceof Excepcion){
                return base;
            }

                //validaciones
                if(this.base.tipo == TIPO.NULL || this.potencia.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULL", `${this.fila}`, `${this.columna}`);
                }
                    
                //-------ENTERO
                //pow(ENTERO, ENTERO);
                if(this.base.tipo===TIPO.ENTERO && this.potencia.tipo===TIPO.ENTERO  ){
                    this.tipo=TIPO.ENTERO;
                    return Math.pow(this.obtenerVal(this.base.tipo,base),this.obtenerVal(this.potencia.tipo,potencia)) ;
                }
                //pow(ENTERO, DECIMAL);
                else if(this.base.tipo===TIPO.ENTERO && this.potencia.tipo===TIPO.DECIMAL  ){
                    this.tipo=TIPO.DECIMAL;
                    return Math.pow(this.obtenerVal(this.base.tipo,base),this.obtenerVal(this.potencia.tipo,potencia)) ;
                }

                ////--------DECIMAL
                //pow(DECIMAL, ENTERO);
                else if(this.base.tipo===TIPO.DECIMAL && this.potencia.tipo===TIPO.ENTERO  ){
                    this.tipo=TIPO.DECIMAL;
                    return Math.pow(this.obtenerVal(this.base.tipo,base),this.obtenerVal(this.potencia.tipo,potencia)) ;
                }

                //pow(DECIMAL, DECIMAL);
                else if(this.base.tipo===TIPO.DECIMAL && this.potencia.tipo===TIPO.DECIMAL  ){
                    this.tipo=TIPO.DECIMAL;
                    return Math.pow(this.obtenerVal(this.base.tipo,base),this.obtenerVal(this.potencia.tipo,potencia)) ;
                }

                return new Excepcion("Semantico",`Tipo de datos invalido para pow( ${this.base.tipo} , ${this.potencia.tipo}) `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter pow() tipo dato incorrecto ",`${this.fila}`,`${this.columna}`);

        }
    }

    getNodo(){
        const nodo= new NodoAST("ARITMETICA");
        if( (this.potencia!=null) || (this.potencia != undefined)){
            nodo.agregarHijoNodo(this.base.getNodo());
            nodo.agregarHijo("POW");
            nodo.agregarHijoNodo(this.potencia.getNodo());
            return nodo;
        }else{
            nodo.agregarHijo("POW");
            nodo.agregarHijoNodo(this.base.getNodo());
            return nodo;
        }
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
            return new Excepcion("Semantico",`No se pudo obtener el valor en Sen() `,`${this.fila}`,`${this.columna}`);
        }

    }



    traducir(entorno: TablaSimbolos, arbol: Arbol): any {

        try{

            const izq=this.base.traducir(entorno,arbol);
            const der=this.potencia.traducir(entorno,arbol);

            if(izq instanceof Excepcion){
                return izq;
            }
            if(this.potencia!= null || this.potencia != undefined){
                
                if(der instanceof Excepcion){
                    return der;
                }
            }


            //validaciones
            if(this.base.tipo == TIPO.NULL){
                return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }
            if(this.potencia.tipo == TIPO.NULL){
                return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
            }


                
            //-------ENTERO
            //ENTERO ^^ ENTERO
            if(this.base.tipo===TIPO.ENTERO && this.potencia.tipo===TIPO.ENTERO ){
                this.tipo=TIPO.DECIMAL;
                return this.setAtributosC3D(izq,der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            //ENTERO ^ DECIMAL
            else if(this.base.tipo===TIPO.ENTERO && this.potencia.tipo===TIPO.DECIMAL ){
                this.tipo=TIPO.DECIMAL;
                return this.setAtributosC3D(izq,der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }

            ////--------DECIMAL
            //DECIMAL ^ ENTERO
            else if(this.base.tipo===TIPO.DECIMAL && this.potencia.tipo===TIPO.ENTERO ){
                this.tipo=TIPO.DECIMAL;
                return this.setAtributosC3D(izq,der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }
            //DECIMAL ^ DECIMAL
            else if(this.base.tipo===TIPO.DECIMAL && this.potencia.tipo===TIPO.DECIMAL ){
                this.tipo=TIPO.DECIMAL;
                return this.setAtributosC3D(izq,der);
                //return this.obtenerVal(this.operadorIzq.tipo,izq) ^ this.obtenerVal(this.operadorDer.tipo,der);
            }

            return new Excepcion("Semantico",`Tipo de datos invalido para Modulo ${this.base.tipo} ^ ${this.potencia.tipo}  `,`${this.fila}`,`${this.columna}`);

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Pointer Exception Modulo",`${this.fila}`,`${this.columna}`);

        }
    }

    setAtributosC3D(izquierda:string,derecha:string){
        
        
        let temp = Principal.temp;
        temp++;
        
        let t = "t"+temp;
        
        Pow.Pow = true;
        // Principal.temp = temp;
        // Principal.historial += t +" = pow("+izquierda+" , "+derecha+");" ;
        // Principal.historial += "\n";
        this.tipo = TIPO.DECIMAL;
        
        let tspos = Principal.posicion;
        Principal.historial += "P = "+tspos+";\n";
        Principal.historial += "stack[(int)"+tspos+"] = " + izquierda+";\n";
        Principal.historial += "stack[(int)"+(tspos+1)+"] = " + derecha+";\n";
        Principal.historial += "potencia();\n" ;
        Principal.historial += t +" =  stack[(int) P];\n";
        return t; 
    }


}



