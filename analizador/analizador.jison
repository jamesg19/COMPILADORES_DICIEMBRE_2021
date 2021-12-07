%lex
%options case-sensitive

%%

\s+											                // espacios en blanco
"//".*										              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//tipos de datos
'string'    return 'string';
'int'       return 'int';
'double'    return 'double';
'boolean'   return 'boolean';
'void'      return 'void';
'Struct'    return 'Struct';
'const'     return 'const';

//funciones nativas
'print'     return 'print';
'println'   return 'println';
'push'      return 'push';
'length'    return 'length';
'pop'       return 'pop';

'function'  return 'function';
'return'    return 'return';
'null'      return 'null';

//condicionales y ciclos
'if'        return 'if';
'else'      return 'else';
'break'     return 'break';
'switch'    return 'switch';
'case'      return 'case';
'default'   return 'default';
'continue'  return 'continue';
'while'     return 'while';
'do'        return 'do';
'for'       return 'for';
'in'        return 'in';

//kw
'true'      return 'true';
'false'     return 'false';

//Patrones numericos
[0-9]+("."[0-9]+)?\b  	return 'decimal';
[0-9]+\b  	return 'entero';
([a-zA-Z])[a-zA-Z0-9_]* return 'id';


//Signos
';'         return  'punto_coma';
','         return 'coma';
':'         return 'dos_puntos';
'.'         return 'punto';

//agrupacion
'{'         return 'llave_abierta';
'}'         return 'llave_cerrada';
'('         return 'par_abierto';
')'         return 'par_cerrado';
'['         return 'corchete_abierto';
']'         return 'corchete_cerrado';

//operadores aritmeticos
'++'        return 'mas_mas';
'+'         return 'mas';
'--'        return 'menos_menos'
'-'         return 'menos';
'**'        return 'potencia';
'*'         return 'por';
'/'         return 'div';
'%'         return 'mod';

//operadores relaciona
'<='        return 'menor_igual';
'>='        return 'mayor_igual';
'>'         return 'mayor';
'<'         return 'menor';
'=='        return 'igual_que';

//asignacion
'='         return 'igual';

//operadores logicos
'!='        return 'dif_que';
'&&'        return 'and';
'&'         return 'concatenacion';
'||'        return 'or';
'!'         return 'not';
'?'         return 'interrogacion';



//Patrones para cadenas
\"[^\"]*\"			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
\'[^\']*\'			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
//\`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }



//errores
.					{
  const er = new error_1.Error({ tipo: 'lexico', linea: `${yylineno + 1}`, descripcion: `El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` });
  errores_1.Errores.getInstance().push(er);
  }

//Fin del archivo
<<EOF>>				return 'EOF';
/lex

%{
  //const  Nodo = require('../ts/arbol/ast');
    const { Primitivo } = require('../expresiones/primitivo');
    const { Print } = require('../instruccion/print');
    const { Instruccion } = require('../instruccion/print');
            
    const { ARITMETICO } = require('../table/tipo')
    const { TIPO } = require('../table/tipo');
    const { RELACIONAL } = require('../table/tipo');
    const { LOGICO} = require('../table/tipo');
    
    const { IgualIgual } = require('../expresiones/relacional/igual_igual');
    const { And } = require('../expresiones/logico/and');
    const { Suma} = require('../expresiones/artimetica/suma');
%}

// Asociacion de operadores y precedencia

%left 'interrogacion'
%left 'or' //listo
%left 'and'//listo
%left 'not' //listo
%left 'igual_que' 'dif_que' //listo
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual' //listo
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos' //listo
%left 'interrogacion'
%left 'or' //listo
%left 'and'//listo
%left 'not' //listo
%left 'igual_que' 'dif_que' //listo
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual' //listo
%left 'mas' 'menos'
%left 'por' 'div' 'mod'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos' //listo

%start INICIO 


//////////////////////////////PARTE SINTACTICA//////////////
%% /* DEFINICION DE LA GRAMATICA*/
//terminales con minuscula
//no terminales con mayuscula
INICIO:
    INSTRUCCIONES EOF{ $$ = $1; return $$;   }
    
;
INSTRUCCIONES:
      
    INSTRUCCIONES INSTRUCCION {  $1.push($2); $$ = $1; }
    | INSTRUCCION             { $$ = [$1] }

;


//estas son las producciones que se tienen
//que agregar 
//
//La precedencia de operadores ya esta arriba
//solo hay que crear la produccion (ambigua)

INSTRUCCION: 
    DECLARACION_VARIABLE            {   $$ = $1 }
  | DECLARACION_FUNCION             {   $$ = $1 }
  | DECLARACION_TYPE                {   $$ = $1 }
  | ASIGNACION 	                    {   $$ = $1 } 
  | PUSH_ARREGLO 	                  {   $$ = $1 }
  | IMPRIMIR 	                      {   $$ = $1 }
  | CONDICION_IF 	                  {   $$ = $1 }
  | SWITCH 	                        {   $$ = $1 }
  | BREAK 	                        {   $$ = $1 }
  | RETURN 	                        {   $$ = $1 }
  | CONTINUE 	                      {   $$ = $1 }
  | WHILE 	                        {   $$ = $1 }
  | DO_WHILE 	                      {   $$ = $1 }
  | FOR 	                          {   $$ = $1 }
  | FOR1_OF 	                      {   $$ = $1 }
  | FOR2_IN 	                      {   $$ = $1 }
  | LLAMAR_FUNCION                  {   $$ = $1 }
  | INCREMENTO_DECREMENTO           {   $$ = $1 }
  | PRINTLN                         {   $$ = $1 }
  | PRINT                           {   $$ = $1 }
;


PRINT  :  println par_abierto EXP par_cerrado punto_coma  { $$ = new Print(1,1,$3);  };

// //--------------------------------------IMPRIMIR--------------------------------------
 //print 
  // : imprimir par_abierto LISTA_EXPRESIONES par_cerrado punto_coma {    }
// ;


PT_COMA:
   punto_coma
;
//--------------------LLAMADA DE UNA FUNCION--------------------

LLAMAR_FUNCION 
  : id par_abierto par_cerrado PT_COMA {   }
  | id par_abierto LISTA_EXPRESIONES par_cerrado PT_COMA {   }
;

//---------------------LLAMAR A FUNCION EXP
LLAMAR_FUNCION_EXP 
  : id par_abierto par_cerrado {   }
  | id par_abierto LISTA_EXPRESIONES par_cerrado {   }
;

WHILE 
  : while par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {   }
;


//---------------------------------DO WHILE----------------------
DO_WHILE 
  : do llave_abierta INSTRUCCIONES llave_cerrada while par_abierto EXP par_cerrado PT_COMA {   }
;

////xxx raiz
FOR : for par_abierto DECLARACION_VARIABLE EXP punto_coma ASIGNACION_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {   }
  | for par_abierto ASIGNACION EXP punto_coma ASIGNACION_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada    {   }
;

FOR_OF 
  : for par_abierto TIPO_DEC_VARIABLE id of EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  {   }
;


FOR_IN 
  : for par_abierto TIPO_DEC_VARIABLE id in EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {   }
;

ASIGNACION 
  //variable = EXP ;
  
  : id TIPO_IGUAL EXP punto_coma {   }

  // type.accesos = EXP ; || type.accesos[][] = EXP;
  
  | id LISTA_ACCESOS_TYPE TIPO_IGUAL EXP PT_COMA {   }

  //variable[][] = EXP ;
  
  | ACCESO_ARREGLO TIPO_IGUAL EXP punto_coma {   }
;


TIPO_IGUAL 
  : igual {    }
  | mas igual {    }
  | menos igual {    }
;

ASIGNACION_FOR 
  : id TIPO_IGUAL EXP {    }
  | id mas_mas {    }
  | id menos_menos {    }
;

SWITCH 
  : switch par_abierto EXP par_cerrado llave_abierta LISTA_CASE llave_cerrada {   }
;

LISTA_CASE 
  : LISTA_CASE CASE {  }
  | CASE {  }
  | DEFAULT { }
  | LISTA_CASE DEFAULT {  }
;

CASE 
  : case EXP dos_puntos INSTRUCCIONES {  }
;

DEFAULT 
  : default dos_puntos INSTRUCCIONES {  }
;

CONTINUE 
  : continue PT_COMA {  }
;

BREAK 
  : break PT_COMA {  }
;

RETURN 
  : return EXP PT_COMA {  }
  | return punto_coma {  }
;

CONDICION_IF 
  : IF  {  }
  | IF ELSE  {  }
  | IF LISTA_ELSE_IF  {  }
  | IF LISTA_ELSE_IF ELSE  {  }
;

IF 
  : if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {  }
;


ELSE 
  : else llave_abierta INSTRUCCIONES llave_cerrada {  }
;

ELSE_IF 
  : else if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {  }
;

LISTA_ELSE_IF 
  : LISTA_ELSE_IF ELSE_IF  {  }
  | ELSE_IF  {  }
;

PUSH_ARREGLO 
  : id punto push par_abierto EXP par_cerrado PT_COMA  {  }
  | id LISTA_ACCESOS_TYPE punto push par_abierto EXP par_cerrado PT_COMA  {  }
;


//------------------------------------- DECLARACION DE FUNCION ---------------------------------
DECLARACION_FUNCION 
  //Funcion sin parametros y con tipo -> 
  //function TIPO test() { INSTRUCCIONES }
  : function TIPO_VARIABLE_NATIVA id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

   //Funcion sin parametros y con tipo -> function TIPO[][] test()  { INSTRUCCIONES }
  | function TIPO_VARIABLE_NATIVA LISTA_CORCHETES id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

  //Funcion sin parametros y sin tipo -> function test() { INSTRUCCIONES }
  
  | function id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

  //Funcion con parametros y con tipo -> function TIPO test ( LISTA_PARAMETROS )  { INSTRUCCIONES }
  
  | function TIPO_VARIABLE_NATIVA id par_abierto LISTA_PARAMETROS par_cerrado  llave_abierta INSTRUCCIONES llave_cerrada {    }

  //Funcion con parametros y con tipo -> function TIPO[][] test ( LISTA_PARAMETROS )  { INSTRUCCIONES }
  | function TIPO_VARIABLE_NATIVA LISTA_CORCHETES id par_abierto LISTA_PARAMETROS par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

  //Funcion con parametros y sin tipo -> function test ( LISTA_PARAMETROS ) { INSTRUCCIONES }
  
  | function id par_abierto LISTA_PARAMETROS par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

;

LISTA_PARAMETROS 
  : LISTA_PARAMETROS coma PARAMETRO {    }
  | PARAMETRO {    }
;

PARAMETRO 
  : id dos_puntos TIPO_VARIABLE_NATIVA {    }
  | id dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES {    }
  | id dos_puntos Array menor TIPO_VARIABLE_NATIVA mayor {    }
;


DECLARACION_TYPE 
  : type id igual llave_abierta LISTA_ATRIBUTOS llave_cerrada punto_coma {    }
  | type id igual llave_abierta LISTA_ATRIBUTOS llave_cerrada  {    }
;

LISTA_ATRIBUTOS 
  : ATRIBUTO coma LISTA_ATRIBUTOS {    }
  | ATRIBUTO {    }
;

ATRIBUTO 
  : id dos_puntos TIPO_VARIABLE_NATIVA {    }
  | id dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES {    }
;

DECLARACION_VARIABLE 
  : TIPO_DEC_VARIABLE LISTA_DECLARACIONES punto_coma {    }
 // | TIPO_DEC_VARIABLE LISTA_DECLARACIONES {    }
;

//TODO: REVISAR DEC_ID_COR Y DEC_ID_COR_EXP
LISTA_DECLARACIONES 
  : LISTA_DECLARACIONES coma DEC_ID  {    }//No utilice las comas
  | LISTA_DECLARACIONES coma DEC_ID_TIPO  {    }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_CORCHETES  {    }
  | LISTA_DECLARACIONES coma DEC_ID_EXP  {    }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_EXP  {    }
  | LISTA_DECLARACIONES coma DEC_ID_TIPO_CORCHETES_EXP  {    }
  | DEC_ID  {    }
  | DEC_ID_TIPO  {    }
  | DEC_ID_TIPO_CORCHETES  {    }
  | DEC_ID_EXP  {    }
  | DEC_ID_TIPO_EXP  {    }
  | DEC_ID_TIPO_CORCHETES_EXP  {    }
;

//let id : TIPO_VARIABLE_NATIVA LISTA_CORCHETES = EXP ;
DEC_ID_TIPO_CORCHETES_EXP 
  : id dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES igual EXP {    }
;

//let id : TIPO_VARIABLE_NATIVA = EXP;
DEC_ID_TIPO_EXP 
  : id dos_puntos TIPO_VARIABLE_NATIVA igual EXP {    }
;

//let id = EXP ;
DEC_ID_EXP 
  : id igual EXP {    }
;

//let id : TIPO_VARIABLE_NATIVA ;
DEC_ID_TIPO  
  : id dos_puntos TIPO_VARIABLE_NATIVA {    }
;

//let id ;
DEC_ID  
  : id  {    }
;

//let id : TIPO_VARIABLE_NATIVA LISTA_CORCHETES ;
DEC_ID_TIPO_CORCHETES 
  : id dos_puntos TIPO_VARIABLE_NATIVA LISTA_CORCHETES {    }
;


LISTA_CORCHETES 
  : LISTA_CORCHETES corchete_abierto corchete_cerrado {    }
  | corchete_abierto corchete_cerrado {    }
;

INCREMENTO_DECREMENTO
  : id mas_mas PT_COMA {    }
  | id menos_menos PT_COMA {    }
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec UMENOS  {    }
  | EXP mas EXP  { $$ = new Suma(0,$1,$3,yylineno,0);   }
  | EXP menos EXP  {    }
  | EXP por EXP  {    }
  | EXP div EXP  {    }
  | EXP mod EXP  {    }
  | EXP potencia EXP  {    }
  | id mas_mas  {    }
  | id menos_menos  {    }
  | par_abierto EXP par_cerrado  {  $$ = $2  }
  //Operaciones de Comparacion
  | EXP mayor EXP  {    }
  | EXP menor EXP  {    }
  | EXP mayor_igual EXP  {    }
  | EXP menor_igual EXP  {    }
  //| EXP igual_que EXP  { $$ = new IgualIgual($1,$3,yylineno,0);     }
  | EXP dif_que EXP  {    }
  
  //Operaciones Lógicas
  | EXP and EXP  { $$ = new And($1,$3,yylineno,0);   }
  | EXP or EXP  {    }
  | not EXP  {    }
  
  //Valores Primitivos
  
  | entero { $$ = new Primitivo(TIPO.ENTERO,$1,yylineno,0); }
  | decimal {$$ = new Primitivo(1,$1,yylineno,0);}
  | string  { $$ = new Primitivo(TIPO.CADENA,$1,yylineno,0);   }
  | id   {    }
  | true  { $$ = new Primitivo(2,$1,yylineno,0);   }
  | false  { $$ = new Primitivo(2,$1,yylineno,0);   }
  | null  {  $$ = new Primitivo(TIPO.NULL,$1,yylineno,0);  }
  
  //Arreglos
  | corchete_abierto LISTA_EXPRESIONES corchete_cerrado  {    }
  | corchete_abierto corchete_cerrado  {    }
  | ACCESO_ARREGLO  {    }
  | ARRAY_LENGTH  {    }
  | ARRAY_POP  {    }
  
  //Types - accesos
  | ACCESO_TYPE  {    }
  | TYPE  {    }
  
  //Ternario
  | TERNARIO  {    }
  
  //Funciones
  | LLAMADA_FUNCION_EXP  {    }
;

TYPE 
  : llave_abierta ATRIBUTOS_TYPE llave_cerrada {    }
;

ATRIBUTOS_TYPE 
  : ATRIBUTO_TYPE coma ATRIBUTOS_TYPE {    }
  | ATRIBUTO_TYPE {    }
;

ATRIBUTO_TYPE 
  : id dos_puntos EXP {    }
;

ARRAY_LENGTH 
  : id punto length  {    }
  | id LISTA_ACCESOS_ARREGLO punto length  {    }
  | id LISTA_ACCESOS_TYPE punto length  {    }
;

ARRAY_POP 
  : id punto pop par_abierto par_cerrado  {    }
  | id LISTA_ACCESOS_ARREGLO punto pop par_abierto par_cerrado  {    }
  | id LISTA_ACCESOS_TYPE punto pop par_abierto par_cerrado  {    }
;

TERNARIO 
  : EXP interrogacion EXP dos_puntos EXP {    }
;

ACCESO_ARREGLO 
  : id LISTA_ACCESOS_ARREGLO {    }
;

ACCESO_TYPE 
  : id LISTA_ACCESOS_TYPE {    }
;

LISTA_ACCESOS_TYPE 
  : LISTA_ACCESOS_TYPE punto id {    }
  | punto id {    }
  | LISTA_ACCESOS_TYPE punto id LISTA_ACCESOS_ARREGLO {    }
  | punto id LISTA_ACCESOS_ARREGLO {    }
;

LISTA_ACCESOS_ARREGLO 
  : LISTA_ACCESOS_ARREGLO corchete_abierto EXP corchete_cerrado {    }
  | corchete_abierto EXP corchete_cerrado {    }
;

LISTA_EXPRESIONES 
  : LISTA_EXPRESIONES coma EXP {    }
  | EXP  {    }
;


TIPO_DEC_VARIABLE
  :  
   string     {    }
  | int     {    }
  | double     {    }
  | boolean    { }
;

TIPO_VARIABLE_NATIVA
  : string  {  }
  | number  {  }
  | boolean {  }
  | void    {  }
  | id      {  }
;

