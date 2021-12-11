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
'struct'    return 'struct';
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

//nativas
'sin'         return 'sin';
'log10'       return 'log10';
'cos'         return 'cos';
'tan'         return 'tan';
'sqrt'        return 'sqrt';
'pow'        return 'pow';
//nativas String
'^' return 'repeticion';
'toLowercase' return 'toLowercase';
'toUppercase' return 'toUppercase';
'subString' return 'subString';
'caracterOfPosition' return 'caracterOfPosition';

//kw
'true'      return 'true';
'false'     return 'false';
'pop'       return 'pop';
'push'      return'push';

//Patrones numericos
[0-9]+\b  	return 'entero';
[0-9]+("."[0-9]+)?\b  	return 'decimal';

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

'#'         return 'nmral';


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
  
  
  //Instrucciones
    const { Print   } = require('../instruccion/print');
    const { D_IdExp } = require('../instruccion/declaracion_idexp');
    const { D_Id    } = require('../instruccion/declaracion_id');
    const { Funcion } = require('../instruccion/funcion');
    const { Llamada } = require ('../instruccion/llamada');
    const { Return } = require ('../instruccion/Return');
    const { Asignacion } = require('../instruccion/asignacion');
    const { Modificar } = require('../expresiones/array/modificar_array');
    const { Acceso } = require('../expresiones/array/acceso');
    const { Pop } = require('../expresiones/array/pop');
    const { Pop_List } = require('../expresiones/array/pop_list');
    const { Push_List } = require('../expresiones/array/push_list');
    const { Push } = require('../expresiones/array/push');
    
    //Tipos
    const { Primitivo } = require('../expresiones/primitivo');
    
    //Enumerados        
    const { ARITMETICO } = require('../table/tipo');
    const { RELACIONAL } = require('../table/tipo');
    const { LOGICO} = require('../table/tipo');
    const { TIPO } = require('../table/TipoNativo');
    
    //relacionales
    const { Diff } = require('../expresiones/relacional/dif');
    const { IgualIgual } = require('../expresiones/relacional/igual_igual');
    const { MayorIgual } = require('../expresiones/relacional/mayor_igual');
    const { Mayor } = require('../expresiones/relacional/mayor');
    const { MenorIgual } = require('../expresiones/relacional/menor_igual');
    const { Menor } = require('../expresiones/relacional/menor');
    const {Identificador} = require('../expresiones/identificador');
    const { Ternario } = require('../expresiones/ternario/ternario');
    //logicos
    const { And } = require('../expresiones/logico/and');
    const { Or } = require('../expresiones/logico/or');
    const { Not } = require('../expresiones/logico/not');
    
    //Operaciones Aritmeticas
    const { Suma} = require('../expresiones/artimetica/suma');
    const { Resta} = require('../expresiones/artimetica/resta');
    const { Multiplicar} = require('../expresiones/artimetica/multiplicar');
    const { Division } = require('../expresiones/artimetica/division');
    const { Modulo} = require('../expresiones/artimetica/modulo');
    const { NegacionNum} = require('../expresiones/artimetica/negacion_numero');    
    const { Potencia } = require('../expresiones/artimetica/potencia');    
    
    const { Arreglo } = require('../expresiones/array/declarar_array')
    //Arreglo_Valor
    const { Arreglo_Valor } = require('../expresiones/array/array_valor')
    const { DecrementoVariable} = require('../expresiones/artimetica/decremento_variable');
    //const { IncrementoVariable} = require('../expresiones/artimetica/Incremento_variable');

    //nativas
    const { Seno} = require('../expresiones/nativas/seno');
    const { Coseno} = require('../expresiones/nativas/coseno');
    const { Tangente} = require('../expresiones/nativas/tangente');
    const { Sqrt} = require('../expresiones/nativas/sqrt');
    const { Pow} = require('../expresiones/nativas/pow');
    const { Log} = require('../expresiones/nativas/log');
    const { NativasString} = require('../expresiones/nativas/nativas_string');
    const { RepeticionCadena} = require('../expresiones/nativas/repeticion_cadena');
    const { TIPO_NATIVA_CADENA} = require('../expresiones/nativas/tiponativacadena');


    const { Struct }     = require('../expresiones/struct/struct')
    const { Dec_Struct } = require('../expresiones/struct/instancia_struct')
    const { Atributo }   = require('../expresiones/struct/atributo')
    const { Acceso_Struct }   = require('../expresiones/struct/acceso_struct')
    const { Asignacion_Struct }   = require('../expresiones/struct/asignacion_struct')
    //Asignacion_Struct
    //JAMES
    const { If } = require('../instruccion/if');
    const { Switch } = require('../instruccion/switch');
    const { Case } = require('../instruccion/case');
    const { Default } = require('../instruccion/default');
    const { Break } = require('../instruccion/break');
    const { For } = require('../instruccion/for');
    const { While } = require('../instruccion/while');
    const { DoWhile } = require('../instruccion/do_while');
    const { Continue } = require('../instruccion/continue');
%}

// Asociacion de operadores y precedencia

%left 'interrogacion'
%left 'or' //listo
%left 'and'//listo
%left 'not' //listo
%left 'igual_que' 'dif_que' //listo
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual' //listo
%left 'mas' 'menos'
%left 'por' 'div' 'mod' 'repeticion'
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
%left 'por' 'div' 'mod' 'repeticion'
%left 'umenos'
%right 'potencia'
%left 'mas_mas' 'menos_menos' //listo

%start INICIO 


//////////////////////////////PARTE SINTACTICA//////////////
%% /* DEFINICION DE LA GRAMATICA*/
//terminales con minuscula
//no terminales con mayuscula
INICIO:
    INSTRUCCIONES EOF                 { $$ = $1; return $$;   }
    
;
INSTRUCCIONES:
      
    INSTRUCCIONES INSTRUCCION         {  $1.push($2); $$ = $1; }
    | INSTRUCCION                     { $$ = [$1]              }

;


//estas son las producciones que se tienen
//que agregar 
//
//La precedencia de operadores ya esta arriba
//solo hay que crear la produccion (ambigua)

INSTRUCCION: 
  //init_inst
   DEC_ARRAY
  |  DECLARACION_VARIABLE           {   $$ = $1 }//falta cuando hay una lista de id's
  | DECLARACION_FUNCION             {   $$ = $1 }//listo
  | DECLARACION_TYPE                {   $$ = $1 } //aca se crea la 'plantilla' para despues crear instancias
  | INSTANCIA_STRUCT                {   $$ = $1 } 
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
  | INCREMENTO_DECREMENTO           {   $$ = $1 }
  | PRINTLN                         {   $$ = $1 }
  | PRINT                           {   $$ = $1 } //listo
  | LLAMADA_FUNCION_EXP punto_coma  {   $$ = $1 }
  | MODIFICAR_ARREGLO               {   $$ = $1 }
  
  | error {console.log("errir",$1)}
  
;


PRINT  :  println par_abierto LISTA_EXPRESIONES par_cerrado punto_coma  { $$ = new Print(@1.firt_line,@1.firt_column,$3);  }
;


PT_COMA:
   punto_coma
;
//--------------------LLAMADA DE UNA FUNCION--------------------

LLAMAR_FUNCION 
  : id par_abierto par_cerrado PT_COMA                   {  $$ = new Llamada($1,@1.first_line,@1.first_column); }
  | id par_abierto LISTA_EXPRESIONES par_cerrado PT_COMA {  $$ = new Llamada($1,@1.first_line,@1.first_column,$3); }
;


WHILE 
  : while par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  { $$= new While($3,$6,@1.first_line,@1.first_column);  }
;


//---------------------------------DO WHILE----------------------
DO_WHILE 
  : do llave_abierta INSTRUCCIONES llave_cerrada while par_abierto EXP par_cerrado PT_COMA 
  { $$= new DoWhile($7,$3,@1.first_line,@1.first_column);   }
;


FOR : 
  for par_abierto DECLARACION_VARIABLE_FOR  punto_coma EXP punto_coma INCREMENTO_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  {  $$= new For($3,$5,$7,$10,@1.firt_line,@1.firt_column); }
  //| for par_abierto ASIGNACION EXP punto_coma INCREMENTO_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada    {   }
;

FOR_OF 
  : for par_abierto TIPO_DEC_VARIABLE id of EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  {   }
;


FOR_IN 
  : for par_abierto TIPO_DEC_VARIABLE id in EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {   }
;

ASIGNACION 
  : id igual EXP punto_coma               {  $$ = new Asignacion($1, $3,false,@1.firt_line,@1.firt_column);       }
  | ACCESO_STRUCT igual EXP punto_coma    {  $$ = new Asignacion_Struct($1,$3,@1.first_line,@1.first_column);     }
  //| id igual ACCESO_STRUCT  punto_coma    {  $$ = new Asignacion_VAR_STRUCT($1,$3,@1.first_line,@1.first_column); }
  // type.accesos = EXP ; || type.accesos[][] = EXP;
  
 // | id LISTA_ACCESOS_TYPE TIPO_IGUAL EXP PT_COMA {   }
  
;

TIPO_IGUAL 
  : igual {    }
  | mas igual {    }
  | menos igual {    }
;
// CONDICION_FOR
// : id TIPO_IGUAL EXP {    }
// ;
INCREMENTO_FOR 
  : //id TIPO_IGUAL EXP {    }
  | id mas_mas      { $$= new IncrementoVariable($1,@1.firt_line,@1.firt_column); }
  | id menos_menos  { $$= new DecrementoVariable($1,@1.firt_line,@1.firt_column); }
;

SWITCH 
  : switch par_abierto EXP par_cerrado llave_abierta LISTA_CASE llave_cerrada 
  { $$=new Switch($3,$6,null,@1.firt_line,@1.firt_column);  }

  | switch par_abierto EXP par_cerrado llave_abierta LISTA_CASE DEFAULT llave_cerrada 
  { $$=new Switch($3,$6,$7,@1.firt_line,@1.firt_column);  }

  | switch par_abierto EXP par_cerrado llave_abierta DEFAULT llave_cerrada   
  { $$=new Switch($3,null,$6,@1.firt_line,@1.firt_column);  }
;

LISTA_CASE 
  : LISTA_CASE CASE     {  $1.push($2); $$ = $1; }
  | CASE                { $$ = [$1]              }
;

CASE 
  : case EXP dos_puntos INSTRUCCIONES { $$ = new Case($2, $4,@1.firt_line,@1.firt_column); }
;

DEFAULT 
  : default dos_puntos INSTRUCCIONES { $$ = new Default($3,@1.firt_line,@1.firt_column);  }
;

CONTINUE 
  : continue PT_COMA { $$= new Continue(@1.firt_line,@1.firt_column); }
;

BREAK 
  : break PT_COMA     { $$= new Break(@1.firt_line,@1.firt_column);  }
;

RETURN 
  : return EXP PT_COMA {  $$ = new Return(true,@1.first_line,@1.first_column,$2); }
  | return punto_coma  {  $$ = new Return(false,@1.first_line,@1.first_column); }
;

CONDICION_IF:
    if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
    { $$=new If($3,$6,null,null,@1.firt_line,@1.firt_column); }
    //if con una instruccion
    
    | if par_abierto EXP par_cerrado  INSTRUCCION 
    { $$=new If($3,$6,null,null,@1.firt_line,@1.firt_column); }
    | if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada else llave_abierta INSTRUCCIONES llave_cerrada 
    {  $$=new If($3,$6,$10,null,@1.firt_line,@1.firt_column); }
    | if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada else CONDICION_IF
    {  $$=new If($3,$6,null,[$9],@1.firt_line,@1.firt_column); }
;


PUSH_ARREGLO 
  : id punto push par_abierto EXP par_cerrado PT_COMA                     {  }
  | id LISTA_ACCESOS_TYPE punto push par_abierto EXP par_cerrado PT_COMA  {  }
;


//------------------------------------- DECLARACION DE FUNCION ---------------------------------
DECLARACION_FUNCION 
  //   1          2                3     4           5           6            7
  : funcion TIPO_VARIABLE_NATIVA id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada { $$ = new Funcion($3,$7,$2,@1.first_line,@1.first_column);   }

   //Funcion sin parametros y con tipo -> function TIPO[][] test()  { INSTRUCCIONES }
  //| function TIPO_VARIABLE_NATIVA  id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }
   
  //Funcion con parametros y con tipo -> function TIPO test ( LISTA_PARAMETROS )  { INSTRUCCIONES }
  //1         2                   3     4         5                   6           
  | function TIPO_VARIABLE_NATIVA id par_abierto LISTA_PARAMETROS par_cerrado  llave_abierta INSTRUCCIONES llave_cerrada {  $$ = new Funcion($3,$8,$2,@1.first_line,@1.first_column,$5);    }

  //Funcion con parametros y con tipo -> function TIPO[][] test ( LISTA_PARAMETROS )  { INSTRUCCIONES }
  //| function TIPO_VARIABLE_NATIVA LISTA_CORCHETES id par_abierto LISTA_PARAMETROS par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

  //Funcion con parametros y sin tipo -> function test ( LISTA_PARAMETROS ) { INSTRUCCIONES }
  
  //| function id par_abierto LISTA_PARAMETROS par_cerrado llave_abierta INSTRUCCIONES llave_cerrada {    }

;

LISTA_PARAMETROS 
  : LISTA_PARAMETROS coma PARAMETRO                        {  $1.push($3); $$ = $1;   }
  | PARAMETRO                                              {  $$ =  [$1]              }
;

PARAMETRO 
  : TIPO_VARIABLE_NATIVA id                                { $$ = {'tipo':$1, 'id':$2, 'arreglo':false}   }
  //| TIPO_VARIABLE_NATIVA LISTA_CORCHETES id              {    }
  //| id dos_puntos Array menor TIPO_VARIABLE_NATIVA mayor {    }
;



//=========================================>declaracion de struct<=========================================>

DECLARACION_TYPE 
  : struct id  llave_abierta LISTA_ATRIBUTOS llave_cerrada punto_coma { $$ = new Struct($2,$4,@1.first_linem,@1.first_column);    }
;

LISTA_ATRIBUTOS 
  : LISTA_ATRIBUTOS coma ATRIBUTO   { $1.push($3); $$ = $1;  }
  | ATRIBUTO {   $$ = [$1]; }
;

ATRIBUTO 
  : TIPO_VARIABLE_NATIVA id   { $$ = new Atributo($2,$1,false,@1.firt_line,@1.firt_column);   }
  | TIPO_VARIABLE_NATIVA id   LISTA_CORCHETES { $$ = new Atributo($2,$1,true,@1.firt_line,@1.firt_column);}
;
//ASIGNACION_VALUE_STRUCT:
  
//;
//=========================================>fin

DECLARACION_VARIABLE 
  : TIPO_DEC_VARIABLE id igual EXP punto_coma  {  $$ = new D_IdExp($1, $2, $4,false,@1.firt_line,@1.firt_column);  }
  | TIPO_DEC_VARIABLE id punto_coma            {  $$ = new D_Id($1, $2,false,@1.firt_line,@1.firt_column);  }   
  
  //| TIPO_DEC_VARIABLE LIST_ID punto_coma     {  $$ = new D_IdList($1, $2,false,@1.firt_line,@1.firt_column);  }   
;

DECLARACION_VARIABLE_FOR 
  : TIPO_DEC_VARIABLE id igual EXP   {  $$ = new D_IdExp($1, $2, $4,false,@1.firt_line,@1.firt_column);  }  
;


//let id : TIPO_VARIABLE_NATIVA = EXP;
DEC_ID_TIPO_EXP                                 
  : TIPO_VARIABLE_NATIVA id   igual EXP               {  $$ = new D_IdExp($1, $2, $3,false,@1.firt_line,@1.firt_column);   }
;

//let id ;
DEC_ID  
  : id                                                {  $$ = $1  }
;

INCREMENTO_DECREMENTO
  : id mas_mas PT_COMA     {  $$=new IncrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | id menos_menos PT_COMA {  $$=new DecrementoVariable($1,@1.firt_line,@1.firt_column);  }
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec UMENOS          { $$ = new NegacionNum(6,$2,0,@1.firt_line,@1.firt_column);   }
  | EXP mas EXP                     { $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP menos EXP                   { $$ = new Resta(1,$1,$3,@1.firt_line,@1.firt_column);        } 
  | EXP por EXP                     { $$ = new Multiplicar(2,$1,$3,@1.firt_line,@1.firt_column);  }
  | EXP div EXP                     { $$ = new Division(3,$1,$3,@1.firt_line,@1.firt_column);     }
  //| EXP potencia EXP                { $$ = new Potencia(4,$1,$3,@1.firt_line,@1.firt_column);     }
  | EXP mod EXP                     { $$ = new Modulo(5,$1,$3,@1.firt_line,@1.firt_column);       }
  | id mas_mas                      { $$=new IncrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | id menos_menos                  { $$=new DecrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | par_abierto EXP par_cerrado     {  $$ = $2  }
  //nativas
  | sin par_abierto EXP par_cerrado             {  $$ = new Seno($3,@1.firt_line,@1.firt_column);  }
  | cos par_abierto EXP par_cerrado             {  $$ = new Coseno($3,@1.firt_line,@1.firt_column);  }
  | tan par_abierto EXP par_cerrado             {  $$ = new Tangente($3,@1.firt_line,@1.firt_column);  }
  | sqrt par_abierto EXP par_cerrado            {  $$ = new Sqrt($3,@1.firt_line,@1.firt_column);  }
  | pow par_abierto EXP coma EXP par_cerrado    {  $$ = new Pow($3,$5,@1.firt_line,@1.firt_column);  }
  | log10 par_abierto EXP par_cerrado           {  $$ = new Log($3,@1.firt_line,@1.firt_column);  }
  //nativas string
  | id punto toLowercase par_abierto par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column); }
  | id punto toUppercase par_abierto par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column); }
  | id punto length par_abierto par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column); }
  | id punto subString par_abierto EXP coma EXP par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column); }
  | id punto caracterOfPosition par_abierto EXP par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column); }
  | EXP repeticion EXP         
  { $$= new RepeticionCadena($1,TIPO_NATIVA_CADENA.REPETICION,$3,null,@1.firt_line,@1.firt_column); }


  //Operaciones de Comparacion
  | EXP mayor EXP                   {   $$ = new Mayor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP menor EXP                   {   $$ = new Menor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP mayor_igual EXP             {   $$ = new MayorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP menor_igual EXP             {   $$ = new MenorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP igual_que EXP               {   $$ = new IgualIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP dif_que EXP                 {   $$ = new Diff($1,$3,@1.firt_line,@1.firt_column);        }
  
  //Operaciones Lógicas
  | EXP and EXP                     {  $$ = new And($1,$3,@1.firt_line,@1.firt_column);   }
  | EXP or EXP                      {  $$ = new Or($1,$3,@1.firt_line,@1.firt_column);  }
  | not EXP                         {  $$ = new Not($2,@1.firt_line,@1.firt_column);  }
  
  //Valores Primitivos
  
  | entero                          { $$ = new Primitivo(0,$1,@1.firt_line,@1.firt_column); }
  | decimal                         { $$ = new Primitivo(TIPO.DECIMAL,$1,@1.firt_line,@1.firt_column);}
  | string                          { $$ = new Primitivo(TIPO.CADENA,$1,@1.firt_line,@1.firt_column);   }
  | id                              { $$ = new Identificador($1,@1.firt_line,@1.firt_column);   }
  | true                            { $$ = new Primitivo(TIPO.BOOLEAN,true,@1.firt_line,@1.firt_column);   }
  | false                           { $$ = new Primitivo(TIPO.BOOLEAN,false,@1.firt_line,@1.firt_column);   }
  | null                            { $$ = new Primitivo(TIPO.NULL,$1,@1.firt_line,@1.firt_column);  }
  
  //Arreglos
  | ACCESO_ARREGLO                                      {   $$ = $1; }
  | ARRAY_LENGTH                                        {   $$ = $1; }
  | ARRAY_POP                                           {   $$ = $1; }
  | corchete_abierto LISTA_EXPRESIONES corchete_cerrado {   $$ = $2;  }
  
  //Types - accesos
  | ACCESO_STRUCT                                       { $$ = $1;   }
  | TYPE            {    }
  //| id id                                               { $$ = new Struct_Param($1,$2,@1.first_line,@1.first_column);}
  //Ternario
  | TERNARIO                                             {  $$ = $1;  }
  
  //Funciones
  | LLAMADA_FUNCION_EXP                                  {  $$ = $1  }
  
;


// ARRAY_LENGTH 
//   : id punto length  {    }
//   | id LISTA_ACCESOS_ARREGLO punto length  {    }
//   | id LISTA_ACCESOS_TYPE punto length  {    }
// ;

 ARRAY_POP 
     : id punto pop par_abierto par_cerrado                        { $$ = new Pop($1,@1.first_line,@1.first_column);   }
     | id punto push par_abierto EXP par_cerrado                   { $$ = new Push($1,$5,@1.first_line,@1.first_column);   }
     | id EXPS_CORCHETE punto pop par_abierto par_cerrado          { $$ = new Pop_List($1,$2,@1.first_line,@1.first_column);  }
     | id EXPS_CORCHETE punto push par_abierto EXP par_cerrado     { $$ = new Push_List($1,$2,$6,@1.first_line,@1.first_column);   }     
//   | id LISTA_ACCESOS_ARREGLO punto pop par_abierto par_cerrado  {    }
//   | id LISTA_ACCESOS_TYPE punto pop par_abierto par_cerrado     {    }
 ;

TERNARIO 
  : EXP interrogacion EXP dos_puntos EXP          {  $$ = new Ternario($1,$3,$5,@1.firt_line,@1.firt_column);  }
;

ACCESO_STRUCT                                      //$1 => id struct //$2 objetos del struct
  : id LISTA_ACCESOS_TYPE                         {  $$ = new Acceso_Struct($1,$2,@1.first_line,@1.first_column);   }
  
;
//------------------------------------------------------------------------------------------------------
//----------------------------------------------PRUEBA--------------------------------------------------
//------------------------------------------------------------------------------------------------------
LISTA_ACCESOS_TYPE 
  : LISTA_ACCESOS_TYPE punto id                                 {  $$ = $1.push($3);  }
  | punto id                                                    {  $$ = [$2];         }
  //| LISTA_ACCESOS_TYPE punto id LISTA_ACCESOS_ARREGLO           {    }
  //| punto id LISTA_ACCESOS_ARREGLO                              {    }
;


LISTA_EXPRESIONES 
  : LISTA_EXPRESIONES coma EXP {  $1.push($3); $$ = $1;  }
  | EXP                        {  $$ = [$1];             }
;


TIPO_DEC_VARIABLE
  : string                      {  $$ = TIPO.CADENA;  }
  | int                        {  $$ = 0;            }
  | double                     {  $$ = TIPO.DECIMAL; }
  | boolean                    {  $$ = TIPO.BOOLEAN; }
;

TIPO_VARIABLE_NATIVA
  : string                     { $$ = TIPO.CADENA;  } 
  | int                        { $$ = 0;            }
  | double                     { $$ = TIPO.DECIMAL; }
  | boolean                    { $$ = TIPO.BOOLEAN; }
  | void                       { $$ = TIPO.VOID;    }
  | id                         { $$ = TIPO.STRUCT;  }
;
LLAMADA_FUNCION_EXP:
      id par_abierto par_cerrado                     { $$ = new Llamada($1,@1.first_line,@1.first_column); }
    | id par_abierto PARAMETROS_LLAMADA par_cerrado  { $$ = new Llamada($1,@1.first_line,@1.first_column,$3); }    
;

PARAMETROS_LLAMADA :
    PARAMETROS_LLAMADA coma PARAMETRO_LLAMADA       { $1.push(3); $$ = $1; }
  | PARAMETRO_LLAMADA                               { $$ = [$1];           }
;

PARAMETRO_LLAMADA:
     EXP                                            { $$ = $1; }  
;

//--------------------------------------ARRAY-----------------------------------

DEC_ARRAY //Arreglo del tipo---> int[] arr = [exp1,exp2, [exp3] ]

  : TIPO_DEC_VARIABLE LISTA_CORCHETES id  igual corchete_abierto  LISTA_EXPRESIONES corchete_cerrado punto_coma
   { $$ = new Arreglo ($1,$3,$6,$1,$3,@1.first_line,@1.first_column);    }
  | TIPO_DEC_VARIABLE LISTA_CORCHETES id  igual  nmral id { $$ = new Arreglo_Valor($1,$3,$6,@1.first_line,@1.first_column); }
;


LISTA_CORCHETES 
  : LISTA_CORCHETES corchete_abierto corchete_cerrado   {  $$ = $2+$1  }
  | corchete_abierto corchete_cerrado                   {  $$ = 1;     }
;

MODIFICAR_ARREGLO:
  id EXPS_CORCHETE igual EXP punto_coma                 {  $$ = new Modificar($1,$2, $4,@1.first_line,@1.first_column); }
;
ACCESO_ARREGLO:
  id  EXPS_CORCHETE                                     {  $$ = new Acceso($1,$2,@1.first_line,@1.first_column); }
;



EXPS_CORCHETE:
    EXPS_CORCHETE corchete_abierto EXP corchete_cerrado { $1.push($3); $$ = $1; }
  | corchete_abierto EXP corchete_cerrado               { $$ = [$2]             } 
;

INSTANCIA_STRUCT:
  id id igual id par_abierto LISTA_EXPRESIONES par_cerrado punto_coma
  {$$ = new Dec_Struct($1,$2,$4,$6,@1.first_line,@1.first_column); }

;

