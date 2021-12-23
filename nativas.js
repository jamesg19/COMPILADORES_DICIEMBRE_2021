"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Nativas = void 0;
const principal_1 = require("./principal");
class Nativas {
    constructor() { }
    print_function(arbol) {
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let label0 = "L" + etiqueta;
        etiqueta++;
        let label1 = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let print_line = "/*  Imprimir secuencia de caracteres  */\n" +
            "void printString() {\n" +
            "\t" + t1 + "= P;\n" +
            "\t" + t2 + " = stack[(int)" + t1 + "];\n" +
            "\t" + label1 + ":\n" +
            "\t" + t3 + " = heap[(int)" + t2 + "];\n" +
            "\tif(" + t3 + " == -1) goto " + label0 + ";\n" +
            "\tprintf(\"%c\", (char)" + t3 + ");\n" +
            "\t" + t2 + " = " + t2 + "+1;\n" +
            "\tgoto " + label1 + ";\n" +
            "\t" + label0 + ":\n" +
            "\treturn;\n" +
            "}\n";
        return print_line;
    }
    toUpper() {
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let l0 = "L" + etiqueta;
        etiqueta++;
        let l1 = "L" + etiqueta;
        etiqueta++;
        let l2 = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let toUpper = "void toUpper() {\n"
            + "\t" + t1 + " = H;\n" //1
            + "\t" + t2 + " = P+1;\n" //p2->3
            + "\t" + t2 + " = stack[(int)" + t2 + "];\n"
            + "\t" + l0 + ":\n"
            + "\t" + t3 + " = heap[(int)" + t2 + "];\n"
            + "\t" + "if(" + t3 + " == -1) goto " + l2 + ";\n"
            + "\t" + "if(" + t3 + " < 97) goto " + l1 + ";\n"
            + "\t" + "if(" + t3 + " > 122) goto " + l1 + ";\n"
            + "\t" + t3 + " = " + t3 + "-32;\n"
            + "\t" + l1 + ":\n"
            + "\t" + "heap[(int)H] = " + t3 + ";\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + t2 + " = " + t2 + "+1;\n"
            + "\t" + "goto " + l0 + ";\n"
            + "\t" + l2 + ":\n"
            + "\t" + "heap[(int)H] = -1;\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + "stack[(int)P] = " + t1 + ";\n"
            + "\t" + "return;\n"
            + "}";
        return toUpper;
    }
    getLength() {
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        temp++;
        let t4 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let L0 = "L" + etiqueta;
        etiqueta++;
        let L1 = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let len = "void len() {\n"
            + "\t" + t1 + " = 0;\n"
            + "\t" + t2 + " = P;\n"
            + "\t" + t3 + " = stack[(int)" + t2 + "];\n"
            + "\t" + t4 + " = heap[(int)" + t3 + "];\n"
            + "\t" + L1 + ":\n"
            + "\t" + "if(" + t4 + " == -1) goto " + L0 + ";\n"
            + "\t" + t3 + " = " + t3 + "+1;"
            + "\t" + t4 + " = heap[(int)" + t3 + "];\n"
            + "\t" + t1 + " = " + t1 + "+1;\n"
            + "\t" + "goto " + L1 + ";\n"
            + "\t" + L0 + ":\n"
            + "\t" + "stack[(int)P] =" + t1 + ";\n"
            + "\t" + "return;\n"
            + "}\n";
        return len;
    }
    toLower() {
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let l0 = "L" + etiqueta;
        etiqueta++;
        let l1 = "L" + etiqueta;
        etiqueta++;
        let l2 = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let toUpper = "void toLower() {\n"
            + "\t" + t1 + " = H;\n" //1
            + "\t" + t2 + " = P+1;\n" //p2->3
            + "\t" + t2 + " = stack[(int)" + t2 + "];\n"
            + "\t" + l0 + ":\n"
            + "\t" + t3 + " = heap[(int)" + t2 + "];\n"
            + "\t" + "if(" + t3 + " == -1) goto " + l2 + ";\n"
            + "\t" + "if(" + t3 + " < 65) goto " + l1 + ";\n"
            + "\t" + "if(" + t3 + " > 90) goto " + l1 + ";\n"
            + "\t" + t3 + " = " + t3 + "+32;\n"
            + "\t" + l1 + ":\n"
            + "\t" + "heap[(int)H] = " + t3 + ";\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + t2 + " = " + t2 + "+1;\n"
            + "\t" + "goto " + l0 + ";\n"
            + "\t" + l2 + ":\n"
            + "\t" + "heap[(int)H] = -1;\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + "stack[(int)P] = " + t1 + ";\n"
            + "\t" + "return;\n"
            + "}";
        return toUpper + "";
    }
    charAt() {
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        temp++;
        let t4 = "t" + temp;
        temp++;
        let t5 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let l0 = "L" + etiqueta;
        etiqueta++;
        let l1 = "L" + etiqueta;
        etiqueta++;
        let l2 = "L" + etiqueta;
        etiqueta++;
        let l3 = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let charAtS = "void charAt() {\n"
            + "\t" + t1 + " = H;\n"
            + "\t" + t3 + " = P;\n"
            + "\t" + t2 + " = stack[(int)" + t3 + "];\n"
            + "\t" + t3 + " = " + t3 + "-1;\n"
            + "\t" + t3 + " = stack[(int)" + t3 + "];\n"
            + "\t" + t4 + " = 0;"
            + "\t" + l0 + ":\n"
            + "\t" + t5 + " = heap[(int)" + t3 + "];\n"
            + "\t" + "if(" + t5 + " == -1) goto " + l1 + ";\n"
            + "\t" + "if(" + t4 + " == " + t2 + ") goto " + l2 + ";\n"
            + "\t" + t3 + " = " + t3 + "+1;\n"
            + "\t" + t4 + " = " + t4 + "+1;\n"
            + "\t" + "goto " + l0 + ";\n"
            + "\t" + l1 + ":\n"
            + "\t" + "heap[(int)H] = -1;\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + "goto " + l3 + ";\n"
            + "\t" + l2 + ":  \n"
            + "\t" + t5 + " = heap[(int)" + t3 + "];\n"
            + "\t" + "heap[(int)H] = " + t5 + ";\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + "heap[(int)H] = -1;\n"
            + "\t" + "H = H + 1;\n"
            + "\t" + l3 + ":\n"
            + "\t" + "stack[(int)P] = " + t5 + ";\n"
            + "\t" + "return;\n"
            + "\t" + "}\n";
        return charAtS;
    }
    potencia_string() {
        principal_1.Principal.addComentario("Iniciando con Potencia");
        let temp = principal_1.Principal.temp;
        temp++;
        let t1 = "t" + temp;
        temp++;
        let t2 = "t" + temp;
        temp++;
        let t3 = "t" + temp;
        temp++;
        let tcantidad = "t" + temp;
        temp++;
        let tref = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let label0 = "L" + etiqueta;
        etiqueta++;
        let label1 = "L" + etiqueta;
        etiqueta++;
        let label_discount = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let print_line = "/*------- POTENCIA STRING ------*/\n" +
            //Principal.addComentario("creo que debo tambien almacenar el valor de H para reasignarlo, para evitar que se llene rapido");                               
            "void potencia_string() {\n" +
            "\t" + t1 + "= P-1; //referencia a la cadena \n" + //referencia a la cadena                    //puntero disponible
            "\t" + tcantidad + "= stack[(int)(P+1)];//Numero de veces que se van a repetir\n" + //cantidad de veces que se debera repetir la cadena
            "\t" + t2 + " = stack[(int)" + t1 + "];// posicion del heap donde inicia la cadena\n" + //le asigno el primer caracteer 
            "\t" + tref + " = P+2;\n //encuentro la nueva posicion libre en la que se almacenara el resultado de la potencia\n" +
            "\tstack[(int)" + tref + "] = H;\n\n" + //guardo la referencia en donde se almacenara la cadena repetida
            "\t" + label1 + ":\n" + //etiqueta para un loop
            "\t" + t3 + " = heap[(int)" + t2 + "];\n" + //le doy el caracter actual, en la primera iteracion seria la primera letra
            "\tif(" + t3 + " == -1) goto " + label_discount + ";\n" + //le pregunto  si ya llego al limite de la palabra
            "\theap[(int)H] = " + t3 + " ;\n" +
            "\tH = H + 1;\n" +
            "\t" + t2 + " = " + t2 + "+1;\n" +
            "\tgoto " + label1 + ";\n" +
            "\t" + label_discount + ":\n" +
            "\t" + tcantidad + " = " + tcantidad + " - 1;\n" +
            "\n\tif(" + tcantidad + " == 0) goto " + label0 + ";\n" +
            "\t" + t2 + " = stack[(int)" + t1 + "];// primer caracaeter\n" +
            "\t goto " + label1 + ";\n" +
            //Principal.addComentario("Etiqueta de Salida")
            "\t" + label0 + ":\n" +
            "\theap[(int)H] = -1;\n" +
            "\tH = H+1;\n" +
            "\tP = " + tref + ";\n" +
            "\treturn;\n" +
            "}\n";
        principal_1.Principal.addComentario("Fin Potencia String");
        return print_line;
    }
    potencia_int() {
        principal_1.Principal.addComentario("Potencia Enteros");
        let temp = principal_1.Principal.temp;
        temp++;
        let tbase = "t" + temp; //valor que se multiplicara
        temp++;
        let texponente = "t" + temp; //cantidad de veces que se multiplicara
        temp++;
        let tresultado = "t" + temp; //cantidad de veces que se multiplicara
        temp++;
        let tpos = "t" + temp;
        temp++;
        let tval = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let label0 = "L" + etiqueta;
        etiqueta++;
        let label1 = "L" + etiqueta;
        etiqueta++;
        let label_salida = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        //
        //inicia proceso para realizar una potencia
        let potencia = "void potencia(){\n" +
            "\t" + tbase + " = P;\n" +
            "\t" + tpos + " = P+1;//posicion del exponente\n" +
            "\t" + tval + " = stack[(int)P];//posicion de la base\n" +
            "\t" + texponente + " = stack[(int)" + tpos + "];//valor del exponente\n" +
            "\t" + tresultado + " = 1;\n" +
            "\t" + label0 + ":\n" +
            "\t\t" + tresultado + "= " + tresultado + " * " + tval + ";\n" +
            "\t\t" + texponente + " = " + texponente + " - 1;\n" +
            "\t\t" + "if(" + texponente + "== 0) goto " + label1 + ";\n" +
            "\t\t\t" + "goto " + label0 + ";\n" +
            "\t" + label1 + ":\n" +
            "\t\t" + "P = P + 2;\n" +
            "\t\t" + "stack[(int) P] = " + tresultado + ";\n" + //salida
            "}";
        return potencia;
    }
    acceso_array() {
        principal_1.Principal.addComentario("buscando elemento");
        let temp = principal_1.Principal.temp;
        temp++;
        let t_pos_heap_element = "t" + temp; ////;posicion que se busca en el heap
        temp++;
        let t_array = "t" + temp; //posicion del array en el stack
        temp++;
        let t_contador = "t" + temp; //contador de posciones que han pasado
        temp++;
        let tref = "t" + temp; //posicion que se devuelve
        temp++;
        let taux = "t" + temp; //una variable auxiliar
        temp++;
        let temp_comparacio = "t" + temp; //temporal que guardara el resultado de la comparacion
        temp++;
        let t2 = "t" + temp;
        principal_1.Principal.temp = temp;
        let etiqueta = principal_1.Principal.etiqueta;
        etiqueta++;
        let label0 = "L" + etiqueta;
        etiqueta++;
        let label1 = "L" + etiqueta;
        etiqueta++;
        etiqueta++;
        let label2 = "L" + etiqueta;
        let literacion = "L" + etiqueta;
        etiqueta++;
        let liter = "L" + etiqueta;
        etiqueta++;
        let labelsalida = "L" + etiqueta;
        principal_1.Principal.etiqueta = etiqueta;
        let acces = "void acces(){\n" +
            "\t" + t_array + " = P;//posicion del arreglo en el stack\n" +
            "\t" + t_pos_heap_element + " = P + 1 ;//elemento que se busca\n" +
            "\t" + t_contador + "= 0;//un contador de posicones\n" +
            "\t" + t_array + "= stack[(int) " + t_array + "] ;\n" +
            "\t" + t_array + "= stack[(int) " + t_array + "] ;\n" +
            "\t" + t_pos_heap_element + "= stack[(int) " + t_pos_heap_element + "] ;\n" +
            "//iniciando con las iteraciones para buscar el elemento\n" +
            "\n\t" + label0 + ":\n" +
            "if (" + t_contador + "==" + t_pos_heap_element + ") goto " + labelsalida + ";\n" +
            label2 + ":\n" +
            t_array + " = " + t_array + " + 1 ;\n" +
            "if(heap[(int)" + t_array + "] == -1 ) goto " + label1 + ";\n" +
            "goto " + label2 + ";" +
            label1 + ":\n" +
            t_array + "=" + t_array + "+ 1;\n//finaliza con -1, entonces le sumo 1 para entrar al nuevo item" +
            t_contador + " = " + t_contador + "+ 1 ;\n//aumento el contador" +
            "goto " + label0 + ";\n" +
            labelsalida + " : \n" +
            "P = " + t_array + ";\n" +
            "return;\n" +
            //heap[(int)"+t_array+"];\n"+
            //  "\t\t"+tref  +" = heap[(int)"+t_array+"];\n//obtengo lo que esta almacenado en el heap"+
            //  "if("+tref+" == -1) goto"+label1+";\n"//label1 -> aumenta el contador
            //  "goto "+label0+";\n"+//-> 
            //  label1+":\n"+
            // "\t\t"+taux  +" = "+tref+";//almacena la posicion actual antes de continuar con la iteracion\n"+
            // "\t\t"+temp_comparacio + " = "+t_contador+"=="+t_pos_heap_element+";\n"+
            // "\n\t\t"+"if("+temp_comparacio+") goto " +labelsalida+";\n"+
            // "\t"+liter+":\n"+
            // "\t\t"+t_array  +" = "+t_array+" + 1;\n"+
            // "\t\t"+tref  +" = heap[(int)"+t_array+"];\n"+
            // //"if("+tref+" != -1 ) goto " +liter+";\n"+
            // "\n\t\t"+"if("+tref+" == -1 ) goto " +label0+";\n"+
            // "\t\t"+t_array +" = "+t_array+" + 1 ;\n"+
            // "\t\t"+"goto "+liter+";\n"+
            // "\t"+labelsalida+":\n"+
            // "\t\t"+"P = "+t_array+";\n"+
            // "\t"+"return;\n"+
            "}\n";
        return acces;
    }
}
exports.Nativas = Nativas;
