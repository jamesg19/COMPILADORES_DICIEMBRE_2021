import { Instruccion } from "../../abs/Instruccion";
import { Arbol } from "../../table/arbol";
import { TablaSimbolos } from "../../table/tablasimbolos";
import { TIPO } from "../../table/tipo";
import { ARITMETICO } from "../../table/tipo";
import { Excepcion} from "../../table/excepcion"
import { Primitivo } from "../primitivo";
import { NodoAST } from "../../abs/nodo";
import { Principal } from '../../principal';


export class Resta extends Instruccion{
    operador:ARITMETICO;
    operadorIzq:Primitivo;
    operadorDer:Primitivo;
    fila: number;
    columna:number;
    tipo:TIPO;
    
    constructor(operador:ARITMETICO,operadorIzq:Primitivo,operadorDer:Primitivo,fila:number,columna:number){
        super(fila,columna);
        this.operadorIzq=operadorIzq;
        this.operadorDer=operadorDer;
        this.fila=fila;
        this.columna=columna;
        this.operador=operador;
        this.tipo=TIPO.NULL;

    }
    interpretar(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const izq=this.operadorIzq.interpretar(entorno,arbol);
            const der=this.operadorDer.interpretar(entorno,arbol);
            if(izq instanceof Excepcion){
                return izq;
            }
            if(this.operadorDer!= null || this.operadorDer != undefined){
                
                if(der instanceof Excepcion){
                    return der;
                }
            }

            //--------------------------RESTA------------------------------
            
            if(this.operador === ARITMETICO.MENOS ){
                //validaciones
                if(this.operadorIzq.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                if(this.operadorDer.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO - ENTERO
                if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.ENTERO;
                    return this.obtenerVal(this.operadorIzq.tipo,izq) - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //ENTERO - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo,izq) - this.obtenerVal(this.operadorDer.tipo,der);
                }

                //ENTERO - BOOLEAN
                else if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.BOOLEAN ){
                    this.tipo=TIPO.ENTERO;
                    var valorBooleanq=0;
                    if(this.obtenerVal(this.operadorDer.tipo,der) === false){
                         valorBooleanq=0;
                    }else{
                         valorBooleanq=1;
                    }

                    return this.obtenerVal(this.operadorIzq.tipo,izq) -valorBooleanq;
                }
                
                ////--------DECIMAL
                //DECIMAL - ENTERO
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.DECIMAL;
                     return this.obtenerVal(this.operadorIzq.tipo,izq) - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //DECIMAL - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    return this.obtenerVal(this.operadorIzq.tipo,izq) - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //DECIMAL - BOOLEAN
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.BOOLEAN ){
                    this.tipo=TIPO.DECIMAL;
                    var valorBoolean11=0;
                    if(this.obtenerVal(this.operadorDer.tipo,der) === false){
                         valorBoolean11=0;
                    }else{
                         valorBoolean11=1;
                    }

                    return this.obtenerVal(this.operadorIzq.tipo,izq) -valorBoolean11;
                }

                //----BOOLEANO
                //BOOLEAN - ENTERO
                else if(this.operadorIzq.tipo===TIPO.BOOLEAN && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.ENTERO;
                    var valorBoolean22=0;
                    if(this.obtenerVal(this.operadorIzq.tipo,izq) === false){
                         valorBoolean22=0;
                    }else{
                         valorBoolean22=1;
                    }

                    return valorBoolean22 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //BOOLEAN - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.BOOLEAN && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    var valorBoolean33=0;

                    if(this.obtenerVal(this.operadorIzq.tipo,izq) === false){
                        valorBoolean33=0;
                    }else{
                        valorBoolean33=1;
                    }
                    return valorBoolean33 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                return new Excepcion("Semantico",`Tipo de datos invalido para resta ${this.operadorIzq.tipo} - ${this.operadorDer.tipo}  `,`${this.fila}`,`${this.columna}`);

            } 

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Poiter resta",`${this.fila}`,`${this.columna}`);

        }
    }

    getNodo(){
        const nodo= new NodoAST("ARITMETICA");
        if( (this.operadorDer!=null) || (this.operadorDer != undefined)){
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
            nodo.agregarHijo("-");
            nodo.agregarHijoNodo(this.operadorDer.getNodo());
            return nodo;
        }else{
            nodo.agregarHijo("-");
            nodo.agregarHijoNodo(this.operadorIzq.getNodo());
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
            return new Excepcion("Semantico",`No se pudo obtener el valor en resta `,`${this.fila}`,`${this.columna}`);
        }

    }
    traducir(entorno: TablaSimbolos, arbol: Arbol): any {
        try {
            const izq=this.operadorIzq.traducir(entorno,arbol);
            const der=this.operadorDer.traducir(entorno,arbol);
            if(izq instanceof Excepcion){
                return izq;
            }
            if(this.operadorDer!= null || this.operadorDer != undefined){
                
                if(der instanceof Excepcion){
                    return der;
                }
            }

            //--------------------------RESTA------------------------------
            
            if(this.operador === ARITMETICO.MENOS ){
                //validaciones
                if(this.operadorIzq.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                if(this.operadorDer.tipo == TIPO.NULL){
                    return new Excepcion("Semantico", "Error de operacion en variable NULA", `${this.fila}`, `${this.columna}`);
                }
                //-------ENTERO
                //ENTERO - ENTERO
                if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.ENTERO;
                    return this.setAtributosC3D(izq+"",der+"");
                }
                //ENTERO - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq+"",der+"");
                }

                //ENTERO - BOOLEAN
                else if(this.operadorIzq.tipo===TIPO.ENTERO && this.operadorDer.tipo===TIPO.BOOLEAN ){
                    this.tipo=TIPO.ENTERO;
                    var valorBooleanq=0;
                    if(this.obtenerVal(this.operadorDer.tipo,der) === false){
                         valorBooleanq=0;
                    }else{
                         valorBooleanq=1;
                    }

                    return this.setAtributosC3D(izq+"",valorBooleanq+"");
                }
                
                ////--------DECIMAL
                //DECIMAL - ENTERO
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq+"",der+"");
                }
                //DECIMAL - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    return this.setAtributosC3D(izq+"",der+"");
                }
                //DECIMAL - BOOLEAN
                else if(this.operadorIzq.tipo===TIPO.DECIMAL && this.operadorDer.tipo===TIPO.BOOLEAN ){
                    this.tipo=TIPO.DECIMAL;
                    var valorBoolean11=0;
                    if(this.obtenerVal(this.operadorDer.tipo,der) === false){
                         valorBoolean11=0;
                    }else{
                         valorBoolean11=1;
                    }
                    return this.setAtributosC3D(izq,valorBoolean11+"");
                    //return this.obtenerVal(this.operadorIzq.tipo,izq) -valorBoolean11;
                }

                //----BOOLEANO
                //BOOLEAN - ENTERO
                else if(this.operadorIzq.tipo===TIPO.BOOLEAN && this.operadorDer.tipo===TIPO.ENTERO ){
                    this.tipo=TIPO.ENTERO;
                    var valorBoolean22=0;
                    if(this.obtenerVal(this.operadorIzq.tipo,izq) === false){
                         valorBoolean22=0;
                    }else{
                         valorBoolean22=1;
                    }
                    return this.setAtributosC3D(valorBoolean22+"",der);
                    //return valorBoolean22 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                //BOOLEAN - DECIMAL
                else if(this.operadorIzq.tipo===TIPO.BOOLEAN && this.operadorDer.tipo===TIPO.DECIMAL ){
                    this.tipo=TIPO.DECIMAL;
                    var valorBoolean33=0;

                    if(this.obtenerVal(this.operadorIzq.tipo,izq) === false){
                        valorBoolean33=0;
                    }else{
                        valorBoolean33=1;
                    }
                    return this.setAtributosC3D(valorBoolean33+"",der);
                    //return valorBoolean33 - this.obtenerVal(this.operadorDer.tipo,der);
                }
                return new Excepcion("Semantico",`Tipo de datos invalido para resta ${this.operadorIzq.tipo} - ${this.operadorDer.tipo}  `,`${this.fila}`,`${this.columna}`);

            } 

        } catch (error) {

            return new Excepcion("Semantico","QUETZAL Null Pointer Exception resta",`${this.fila}`,`${this.columna}`);

        }
    }
    setAtributosC3D(izquierda:string,derecha:string){
        
        
        let temp = Principal.temp;
        temp++;
        
        let t = "t"+temp;
        Principal.temp = temp;
        Principal.historial += t +" = "+izquierda+" - "+derecha+";" ;
        Principal.historial += "\n";
        this.tipo = TIPO.DECIMAL;
        return t; 
    }
    

}