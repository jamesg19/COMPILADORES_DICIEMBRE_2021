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
'graficar_ts'  return 'graficar_ts';

//nativas
'sin'         return 'sin';
'log10'       return 'log10';
'cos'         return 'cos';
'tan'         return 'tan';
'sqrt'        return 'sqrt';
'pow'         return 'pow';
//nativas String
'^' return 'repeticion';
'toLowercase' return 'toLowercase';
'toUppercase' return 'toUppercase';
'subString' return 'subString';
'caracterOfPosition' return 'caracterOfPosition';
//casteos
'parse'     return 'parse';
'toInt'     return 'toInt';
'toDouble'  return 'toDouble';
'typeof'    return 'typeof';

//kw
'true'      return 'true';
'false'     return 'false';
'pop'       return 'pop';
'push'      return 'push';
'main'      return 'main';
'begin'     return 'begin';
'end'       return 'end';

//Patrones numericos
[0-9]+("."[0-9]+)\b  	return 'decimal';
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
'&'         return 'mass';
'||'        return 'or';
'!'         return 'not';
'?'         return 'interrogacion';

'#'         return 'nmral';


//Patrones para cadenas
\"[^\"]*\"			{ yytext = yytext.slice(1,-1); return 'string'; }
\'[^\']*\'			{ yytext = yytext.slice(1,-1); return 'string'; }
//\`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }



//errores
.					{
  const er = new error_1.Error({ tipo: 'lexico', linea: `${yylineno + 1}`, descripcion: `El valor "${yytext}" no es valido, columna: ${yylloc.first_column + 1}` });
  errores_1.Errores.getInstance().push(er);

  addReporte('Lexico',`El valor ${yytext} no se reconoce `,`${yylineno + 1}`,`${yylloc.first_column + 1}`)

  }

//Fin del archivo
<<EOF>>				return 'EOF';
/lex

%{
  
  
  const { Simbolo   } = require('../table/simbolo');
  //Instrucciones
    const { Print   } = require('../instruccion/print');
    const { D_IdExp } = require('../instruccion/declaracion_idexp');
    const { D_Id    } = require('../instruccion/declaracion_id');
    const { Funcion } = require('../instruccion/funcion');
    const { Llamada } = require ('../instruccion/llamada');
    const { Return }  = require ('../instruccion/Return');
    const { Main }    = require ('../instruccion/main');
    const { Asignacion } = require('../instruccion/asignacion');
    const { Asignacion_VAR_STRUCT } = require('../expresiones/struct/asignacion_var_struct');
    const { Asignacion_Struct_Exp } = require('../expresiones/struct/asignacion_struct_exp');
    const { Asignacion_Mas } = require('../instruccion/asignacion_mas');
    const { List_Declaracion } = require('../instruccion/list_declaracion');
    //List_Declaracion
    const { Modificar }  = require('../expresiones/array/modificar_array');
    const { Acceso }     = require('../expresiones/array/acceso');
    const { Pop } = require('../expresiones/array/pop');
    const { Pop_List } = require('../expresiones/array/pop_list');
    const { Push_List } = require('../expresiones/array/push_list');
    const { Push } = require('../expresiones/array/push');
    const { Rango } = require('../expresiones/array/rango');
    const { Begin_Rango } = require('../expresiones/array/begin_rango');
    const { Fin_Rango } = require('../expresiones/array/fin_rango');
    const { Rango_Complete } = require('../expresiones/array/rango_complete');
    const { Seno_Arr } = require('../expresiones/array/operaciones/seno');
    const { Cos_Arr } = require('../expresiones/array/operaciones/cos');
    const { Tan_Arr } = require('../expresiones/array/operaciones/tan');
    
    const { Multiplicacion_Arr } = require('../expresiones/array/operaciones/multiplicacion');
    const { Division_Arr } = require('../expresiones/array/operaciones/division');
    const { Suma_Arr } = require('../expresiones/array/operaciones/suma');
    const { Resta_Arr } = require('../expresiones/array/operaciones/resta');
    //Tipos
    const { Primitivo } = require('../expresiones/primitivo');
    
    //Enumerados        
    const { ARITMETICO } = require('../table/tipo');
    const { RELACIONAL } = require('../table/tipo');
    const { LOGICO} = require('../table/tipo');
    const { TIPO } = require('../table/tipo');
    
    
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
    const { IncrementoVariable} = require('../expresiones/artimetica/Incremento_variable');

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
    const { Casteos} = require('../expresiones/nativas/casteos');
    const { CasteosTo} = require('../expresiones/nativas/casteos_to');


    const { Struct }          = require('../expresiones/struct/struct')
    const { Dec_Struct }      = require('../expresiones/struct/instancia_struct')
    const { Atributo }        = require('../expresiones/struct/atributo')
    const { Acceso_Struct }   = require('../expresiones/struct/acceso_struct')
    //JAMES
    const { If } = require('../instruccion/if');
    const { Switch } = require('../instruccion/switch');
    const { Case } = require('../instruccion/case');
    const { Default } = require('../instruccion/default');
    const { Break } = require('../instruccion/break');
    const { For } = require('../instruccion/for');
    const { ForEach } = require('../instruccion/for_each');
    const { While } = require('../instruccion/while');
    const { DoWhile } = require('../instruccion/do_while');
    const { Continue } = require('../instruccion/continue');
    const { Excepcion } = require('../table/excepcion');
    const { Reporte } = require('./reporte');
    const { Graficar } = require('../instruccion/graficar');
    

    const reporte=new Reporte();

    var reporteGramatical =reporte.reporteGramatical;
    var reporte_error =[];


    // function reportarError(tipo,descripccion,linea,columna){
    //     errores.push({tipo:tipo,descripccion:descripccion,linea:linea,columna:columna});
    // }
    function addReporte(produccion,regla){
        reporte.reporteGramatical.push({produccion:produccion,regla:regla});
    }

    //METODOS GET PARA REPORTE DE ERRORES Y GRAMATICAL
    function getReporteError(){
      return reporte_error;
    }
    function getReporteGramatical(){
      return reporteGramatical;
    }

%}

// Asociacion de operadores y precedencia

%left 'interrogacion'
%left 'or' //listo
%left 'and'//listo
%left 'not' //listo
%left 'dif_que' //listo
%left 'igual_que' 
%left 'mayor' 'menor' 'mayor_igual' 'menor_igual' //listo
%left 'mas' 'menos' 'mass'
%left 'por' 'div' 'mod' 'repeticion'
%right 'potencia'
%left 'mas_mas' 'menos_menos' //listo
%left 'umenos'


%start INICIO 


//////////////////////////////PARTE SINTACTICA//////////////
%% /* DEFINICION DE LA GRAMATICA*/
//terminales con minuscula
//no terminales con mayuscula
INICIO:
    INSTRUCCIONES EOF                 { $$ = $1; return [$$,reporte];   }
    
;
INSTRUCCIONES:
      
    INSTRUCCIONES INSTRUCCION         {  addReporte('INSTRUCCIONES: INSTRUCCIONES INSTRUCCION','INSTRUCCIONES.val  INSTRUCCION.val'); $1.push($2); $$ = $1; }
    | INSTRUCCION                     {  addReporte('INSTRUCCIONES: INSTRUCCION','INSTRUCCIONES.val:= INSTRUCCION.val');    $$ = [$1];   }

;


//estas son las producciones que se tienen
//que agregar 
//
//La precedencia de operadores ya esta arriba
//solo hay que crear la produccion (ambigua)

INSTRUCCION: 
  //init_inst
    MAIN                            {   addReporte('INSTRUCCION: MAIN',' MAIN: INSTRUCCION'); $$ = $1; } 
  | DEC_ARRAY                       { addReporte('INSTRUCCION: DEC_ARRAY',' DEC_ARRAY: DEC_ARRAY.val');  $$ = $1 } 
  | DECLARACION_VARIABLE            {  addReporte('INSTRUCCION: DECLARACION_VARIABLE',' DECLARACION_VARIABLE: DECLARACION_VARIABLE.val'); $$ = $1 }//falta cuando hay una lista de id's
  | DECLARACION_FUNCION             { addReporte('INSTRUCCION: DECLARACION_FUNCION',' DECLARACION_FUNCION: DECLARACION_FUNCION.val');  $$ = $1 }//listo
  | DECLARACION_TYPE                {  addReporte('INSTRUCCION: DECLARACION_TYPE',' DECLARACION_TYPE: DECLARACION_TYPE.val'); $$ = $1 } //aca se crea la 'plantilla' para despues crear instancias
  | INSTANCIA_STRUCT                { addReporte('INSTRUCCION: INSTANCIA_STRUCT',' INSTANCIA_STRUCT: INSTANCIA_STRUCT.val');  $$ = $1 } 
  | ASIGNACION 	                    {  addReporte('INSTRUCCION: ASIGNACION',' ASIGNACION: ASIGNACION.val'); $$ = $1 } 
  //| PUSH_ARREGLO 	                  { addReporte('INSTRUCCION: PUSH_ARREGLO',' PUSH_ARREGLO: PUSH_ARREGLO.val');  $$ = $1 }
  | IMPRIMIR 	                      { addReporte('INSTRUCCION: IMPRIMIR',' IMPRIMIR: IMPRIMIR.val');  $$ = $1 }
  | CONDICION_IF 	                  { addReporte('INSTRUCCION: CONDICION_IF',' CONDICION_IF: CONDICION_IF.val');  $$ = $1 }
  | SWITCH 	                        { addReporte('INSTRUCCION: SWITCH',' SWITCH: SWITCH.val');  $$ = $1 }
  | BREAK 	                        { addReporte('INSTRUCCION: BREAK',' BREAK: BREAK.val');  $$ = $1 }
  | RETURN 	                        { addReporte('INSTRUCCION: RETURN',' RETURN: RETURN.val');  $$ = $1 }
  | CONTINUE 	                      { addReporte('INSTRUCCION: CONTINUE',' ');  $$ = $1 }
  | WHILE 	                        { addReporte('INSTRUCCION: WHILE',' WHILE: WHILE.val');  $$ = $1 }
  | DO_WHILE 	                      { addReporte('INSTRUCCION: DO_WHILE',' DO_WHILE: DO_WHILE.val');  $$ = $1 }
  | FOR 	                          { addReporte('INSTRUCCION: FOR',' FOR: FOR.val');  $$ = $1 }
  | FOR1_OF 	                      { addReporte('INSTRUCCION: RETURN',' RETURN: RETURN.val');  $$ = $1 }
  | FOR_IN 	                        { addReporte('INSTRUCCION: FOR_IN',' FOR_IN: FOR_IN.val');  $$ = $1 }
  | ARRAY_POP punto_coma                      { addReporte('INSTRUCCION: ARRAY_POP',' ARRAY_POP: ARRAY_POP.val');  $$ = $1 }
  | INCREMENTO_DECREMENTO           { addReporte('INSTRUCCION: INCREMENTO_DECREMENTO',' INCREMENTO_DECREMENTO: INCREMENTO_DECREMENTO.val');  $$ = $1 }
  | PRINTLN                         { addReporte('INSTRUCCION: PRINTLN',' PRINTLN: PRINTLN.val');  $$ = $1 }
  | PRINT                           { addReporte('INSTRUCCION: PRINT',' PRINT: PRINT.val');  $$ = $1 } //listo
  | LLAMADA_FUNCION_EXP punto_coma  { addReporte('INSTRUCCION: LLAMADA_FUNCION_EXP',' LLAMADA_FUNCION_EXP: LLAMADA_FUNCION_EXP.val');  $$ = $1 }
  | MODIFICAR_ARREGLO               { addReporte('INSTRUCCION: MODIFICAR_ARREGLO',' MODIFICAR_ARREGLO: MODIFICAR_ARREGLO.val');  $$ = $1 }
  | GRAFICAR_TABLA                  { $$=$1; }
  //| ACCESO_TYPE                     { $$ = $1 }
  | error  {$$=new Excepcion('Sintactico',`Error sintactico en ${$1}`,@1.first_line,@1.first_column); }
;

MAIN:

void main par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada { $$ = new Main($6,@1.firt_line,@1.first_column); } 
;
PRINT  :  println par_abierto LISTA_EXPRESIONES par_cerrado punto_coma  { addReporte('PRINT:= println par_abierto LISTA_EXPRESIONES par_cerrado punto_coma','PRINT.val := LISTA_EXPRESIONES.val'); $$ = new Print(@1.firt_line,@1.firt_column,$3,true);  }
        | print par_abierto LISTA_EXPRESIONES par_cerrado punto_coma    { addReporte('PRINT:= println par_abierto LISTA_EXPRESIONES par_cerrado punto_coma','PRINT.val := LISTA_EXPRESIONES.val'); $$ = new Print(@1.firt_line,@1.firt_column,$3,false);  }

;


PT_COMA:
   punto_coma {  }
;
//--------------------LLAMADA DE UNA FUNCION--------------------

LLAMAR_FUNCION 
  : id par_abierto par_cerrado PT_COMA                   { addReporte('LLAMAR_FUNCION: id par_abierto par_cerrado );',' ');  $$ = new Llamada($1,@1.first_line,@1.first_column); }
  | id par_abierto LISTA_EXPRESIONES par_cerrado PT_COMA { addReporte('LLAMAR_FUNCION: id par_abierto LISTA_EXPRESIONES par_cerrado',' ');  $$ = new Llamada($1,@1.first_line,@1.first_column,$3); }
;


WHILE 
  : while par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  { addReporte('WHILE: while par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada',' '); $$= new While($3,$6,@1.first_line,@1.first_column);  }
;


//---------------------------------DO WHILE----------------------
DO_WHILE 
  : do llave_abierta INSTRUCCIONES llave_cerrada while par_abierto EXP par_cerrado PT_COMA 
  { addReporte('DO_WHILE: do llave_abierta INSTRUCCIONES llave_cerrada while par_abierto EXP par_cerrado PT_COMA',' '); $$= new DoWhile($7,$3,@1.first_line,@1.first_column);   }
;


FOR : 
  for par_abierto DECLARACION_VARIABLE_FOR  punto_coma EXP punto_coma INCREMENTO_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  {  addReporte('FOR : for par_abierto DECLARACION_VARIABLE_FOR  punto_coma EXP punto_coma INCREMENTO_FOR par_cerrado { INSTRUCCIONES }',' '); $$= new For($3,$5,$7,$10,@1.firt_line,@1.firt_column); }
  //| for par_abierto ASIGNACION EXP punto_coma INCREMENTO_FOR par_cerrado llave_abierta INSTRUCCIONES llave_cerrada    {   }
;

// FOR_OF 
//   : for par_abierto TIPO_DEC_VARIABLE id of EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
//   {   }
// ;


FOR_IN 
  : for id in EXP  llave_abierta INSTRUCCIONES llave_cerrada 
  { addReporte('FOR_IN: for id in EXP  llave_abierta INSTRUCCIONES llave_cerrada','EXP:= EXP.val; '); $$=new ForEach($2,$4,$6,@1.first_line,@1.first_column);  }
;

ASIGNACION 
  : id  igual corchete_abierto corchete_cerrado    punto_coma         { addReporte('ASIGNACION: id -= EXP ;','EXP:= EXP.val; '); $$ = new Asignacion($1, null,false,@1.firt_line,@1.firt_column); }  
   | id igual EXP          punto_coma         { addReporte('ASIGNACION: id igual EXP ;','EXP:= EXP.val; ');  $$ = new Asignacion($1, $3,false,@1.firt_line,@1.firt_column); }
  | id mas igual EXP      punto_coma         { addReporte('ASIGNACION: id += EXP ;','EXP:= EXP.val; '); $$ = new Asignacion_Mas($1, $4,true,@1.firt_line,@1.firt_column); }
  | id menos igual EXP    punto_coma         { addReporte('ASIGNACION: id -= EXP ;','EXP:= EXP.val; '); $$ = new Asignacion_Mas($1, $4,false,@1.firt_line,@1.firt_column); }
  
  
  
  | ACCESO_TYPE igual EXP  punto_coma        { addReporte('ASIGNACION: ACCESO_TYPE = EXP ;',' EXP:= EXP.val; ');   $$ = new Asignacion_VAR_STRUCT($3,$1,@1.first_line,@1.first_column);}  
  //| ACCESO_TYPE igual  id par_abierto LISTA_EXPRESIONES par_cerrado punto_coma  
  //{ addReporte('ASIGNACION: ACCESO_TYPE = EXP ;',' EXP:= EXP.val; ');   $$ = new Asignacion_Struct_Struct($1,new Constructor_st($3,$5); }

;



INCREMENTO_FOR 
  : //id TIPO_IGUAL EXP {    }
   id mas_mas      {  addReporte('INCREMENTO_FOR: id mas_mas  ','id.val := id.val+1'); $$= new IncrementoVariable($1,@1.firt_line,@1.firt_column); }
  | id menos_menos  { addReporte('INCREMENTO_FOR: id menos_menos  ','id.val := id.val-1'); $$= new DecrementoVariable($1,@1.firt_line,@1.firt_column); }
;

SWITCH 
  : switch par_abierto EXP par_cerrado llave_abierta LISTA_CASE llave_cerrada 
  { addReporte('SWITCH: switch par_abierto EXP par_cerrado { LISTA_CASE }','EXP:=EXP.val LISTA_CASE:= LISTA_CASE.val');  $$=new Switch($3,$6,null,@1.firt_line,@1.firt_column);  }

  | switch par_abierto EXP par_cerrado llave_abierta LISTA_CASE DEFAULT llave_cerrada 
  {  addReporte('SWITCH: switch par_abierto EXP par_cerrado { LISTA_CASE DEFAULT }','EXP:=EXP.val'); $$=new Switch($3,$6,$7,@1.firt_line,@1.firt_column);  }

  | switch par_abierto EXP par_cerrado llave_abierta DEFAULT llave_cerrada   
  { addReporte('SWITCH: switch par_abierto EXP par_cerrado { DEFAULT } ','EXP:=EXP.val'); $$=new Switch($3,null,$6,@1.firt_line,@1.firt_column);  }
;

LISTA_CASE 
  : LISTA_CASE CASE     { addReporte('LISTA_CASE: LISTA_CASE CASE',' '); $1.push($2); $$ = $1; }
  | CASE                { addReporte('LISTA_CASE: CASE','LISTA_CASE:= CASE.val'); $$ = [$1]              }
;

CASE 
  : case EXP dos_puntos INSTRUCCIONES { addReporte('CASE: case EXP dos_puntos INSTRUCCIONES','EXP:= EXP.val'); $$ = new Case($2, $4,@1.firt_line,@1.firt_column); }
;

DEFAULT 
  : default dos_puntos INSTRUCCIONES { addReporte('DEFAULT: default dos_puntos INSTRUCCIONES','INSTRUCCIONES:= INSTRUCCIONES.val'); $$ = new Default($3,@1.firt_line,@1.firt_column);  }
;

CONTINUE 
  : continue PT_COMA { addReporte('CONTINUE: continue PT_COMA',' ' ); $$= new Continue(@1.firt_line,@1.firt_column); }
;

BREAK 
  : break PT_COMA     { addReporte('BREAK: break PT_COMA',' ' ); $$= new Break(@1.firt_line,@1.firt_column);  }
;

RETURN 
  : return EXP PT_COMA { addReporte('RETURN: return EXP PT_COMA','RETURN:= EXP.val',' ' );  $$ = new Return(true,@1.first_line,@1.first_column,$2); }
  | return punto_coma  { addReporte('RETURN: return punto_coma','RETURN:= return',' ' ); $$ = new Return(false,@1.first_line,@1.first_column); }
;

CONDICION_IF:
    if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
    { addReporte('CONDICION_IF: if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada','EXP:=EXP.val'); $$=new If($3,$6,null,null,@1.firt_line,@1.firt_column); }
    //if con una instruccion
    
    | if par_abierto EXP par_cerrado  INSTRUCCION 
    { addReporte('CONDICION_IF: if par_abierto EXP par_cerrado  INSTRUCCION ','EXP:=EXP.val'); $$=new If($3,$5,null,null,@1.firt_line,@1.firt_column); }
    
    | if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada else llave_abierta INSTRUCCIONES llave_cerrada 
    { addReporte('CONDICION_IF: if par_abierto EXP par_cerrado { INSTRUCCIONES } else { INSTRUCCIONES } ','EXP:=EXP.val'); $$=new If($3,$6,$10,null,@1.firt_line,@1.firt_column); }
    
    | if par_abierto EXP par_cerrado llave_abierta INSTRUCCIONES llave_cerrada else CONDICION_IF
    { addReporte('CONDICION_IF: if ( EXP ) { INSTRUCCIONES } else CONDICION_IF ','EXP:=EXP.val'); $$=new If($3,$6,null,[$9],@1.firt_line,@1.firt_column); }
;


PUSH_ARREGLO 
  : id punto push par_abierto EXP par_cerrado PT_COMA                     { console.log("ENTRA QUI EL PUSH"); $$ = new Push($1,$5,@1.first_line,@1.first_column);   }
  | id LISTA_ACCESOS_TYPE punto push par_abierto EXP par_cerrado PT_COMA  {  }
;


//------------------------------------- DECLARACION DE FUNCION ---------------------------------
DECLARACION_FUNCION 
  //   1               2         3     4           5           6            7
  :  TIPO_DEC_VARIABLE id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada 
  { $$ = new Funcion($2,$6,$1,@1.first_line,@1.first_column);   }
  | void id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada               { $$ = new Funcion($2,$6,TIPO.VOID,@1.first_line,@1.first_column);   }
  | id id par_abierto par_cerrado llave_abierta INSTRUCCIONES llave_cerrada                 { $$ = new Funcion($2,$6,TIPO.STRUCT,@1.first_line,@1.first_column);   }
  //Funcion con parametros y con tipo -> function TIPO test ( LISTA_PARAMETROS )  { INSTRUCCIONES }
  //1                  2       3     4         5                   6           
  |  TIPO_DEC_VARIABLE id par_abierto LISTA_PARAMETROS par_cerrado  llave_abierta INSTRUCCIONES llave_cerrada
   {  $$ = new Funcion($2,$7,$1,@1.first_line,@1.first_column,$4);    }
  | void id par_abierto LISTA_PARAMETROS par_cerrado  llave_abierta INSTRUCCIONES llave_cerrada {  $$ = new Funcion($2,$7,TIPO.VOID,@1.first_line,@1.first_column,$4);    }
  | id id par_abierto LISTA_PARAMETROS par_cerrado  llave_abierta INSTRUCCIONES llave_cerrada{  $$ = new Funcion($2,$7,TIPO.STRUCT,@1.first_line,@1.first_column,$4);    }
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
  : TIPO_DEC_VARIABLE id                                    { $$ = {'tipo':$1, 'id':$2, 'arreglo':false}   }
    | id id                                                 { $$ = {'tipo':TIPO.STRUCT, 'id':$2, 'arreglo':false}   }  
    | TIPO_DEC_VARIABLE LISTA_CORCHETES id                  { $$ = {'tipo':TIPO.ARREGLO,'id':$3, 'arreglo':true}      }
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
  : TIPO_DEC_VARIABLE id                   { $$ = new Simbolo($2,$1,@1.first_line,@1.first_column,null,false,false)}//$$ = new Atributo($2,$1,false,@1.firt_line,@1.firt_column);   }
  | id id                                  { $$ = new Simbolo($2,TIPO.STRUCT,@1.first_line,@1.first_column,$1,false,true)}//{ $$ = new Atributo($2,TIPO.STRUCT,false,@1.firt_line,@1.firt_column);   }
  | TIPO_DEC_VARIABLE  LISTA_CORCHETES id  { $$ = new Simbolo($3,$1,@1.first_line,@1.first_column,null,false,false)}//{ $$ = new Atributo($2,$1,true,@1.firt_line,@1.firt_column);}
  | id  id  LISTA_CORCHETES                { $$ = new Simbolo($3,$1,@1.first_line,@1.first_column,$1,true,true)}// { $$ = new Atributo($2,TIPO.STRUCT,true,@1.firt_line,@1.firt_column);}  
;

//=========================================>fin

DECLARACION_VARIABLE 
  : TIPO_DEC_VARIABLE id igual EXP punto_coma      {  $$ = new D_IdExp($1, $2, $4,false,@1.firt_line,@1.firt_column);  }
  | TIPO_DEC_VARIABLE id           punto_coma      {  $$ = new D_Id($1, $2,false,@1.firt_line,@1.firt_column);         }   
  | TIPO_DEC_VARIABLE id coma  LIST_ID punto_coma  {  $4.push($2) ; $$ = new List_Declaracion($1,$4,@1.first_line,@1.first_column)   }
   
     
;

LIST_ID:
    LIST_ID coma id                            { $1.push($3); $$ = $1;}
  | id                                         { $$ = [$1]}
  | LIST_ID coma INSTRUCCION    {   $1.push(new Excepcion('Sintactico',`NO SE PERMITE PALABRAS RESERVADAS ${$3}`,@1.first_line,@1.first_column)); $$ = $1;  }
;

DECLARACION_VARIABLE_FOR 
  : TIPO_DEC_VARIABLE id igual EXP   {  $$ = new D_IdExp($1, $2, $4,false,@1.firt_line,@1.firt_column);  }  
;


//let id : TIPO_VARIABLE_NATIVA = EXP;
DEC_ID_TIPO_EXP                                 
  : TIPO_DEC_VARIABLE id   igual EXP               {  $$ = new D_IdExp($1, $2, $3,false,@1.firt_line,@1.firt_column);            }
  | id id igual EXP                                {  $$ = new D_IdExp(TIPO.STRUCT, $2, $3,false,@1.firt_line,@1.firt_column);   }
;

//let id ;
DEC_ID  
  : id                                                { addReporte('DEC_ID: id','id:=id.val'); $$ = $1  }
;

INCREMENTO_DECREMENTO
  : id mas_mas PT_COMA     { addReporte('INCREMENTO_DECREMENTO: id ++ PT_COMA','id.val=id.val +1'); $$=new IncrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | id menos_menos PT_COMA { addReporte('INCREMENTO_DECREMENTO: id -- PT_COMA','id.val=id.val -1'); $$=new DecrementoVariable($1,@1.firt_line,@1.firt_column);  }
;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec UMENOS          { addReporte('EXP: - EXP %prec UMENOS ','EXP:=EXP.val'); $$ = new NegacionNum(6,$2,0,@1.firt_line,@1.firt_column);   }
  | EXP mas EXP                     { addReporte('EXP:  EXP + EXP ','EXP:=EXP.val+EXP.val'); $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP mass EXP                    { addReporte('EXP:  EXP & EXP ','EXP:=EXP.val&EXP.val'); $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP menos EXP                   { addReporte('EXP:  EXP - EXP','EXP:=EXP.val-EXP.val'); $$ = new Resta(1,$1,$3,@1.firt_line,@1.firt_column);        } 
  | EXP por EXP                     { addReporte('EXP:  EXP * EXP','EXP:=EXP.val*EXP.val'); $$ = new Multiplicar(2,$1,$3,@1.firt_line,@1.firt_column);  }
  | EXP div EXP                     { addReporte('EXP:  EXP / EXP','EXP:=EXP.val/EXP.val'); $$ = new Division(3,$1,$3,@1.firt_line,@1.firt_column);     }
  //| EXP potencia EXP                { $$ = new Potencia(4,$1,$3,@1.firt_line,@1.firt_column);     }
  | EXP mod EXP                     { addReporte('EXP:  EXP % EXP','EXP:=EXP.val % EXP.val'); $$ = new Modulo(5,$1,$3,@1.firt_line,@1.firt_column);       }
  | id mas_mas                      { addReporte('EXP:  EXP ++','EXP:=EXP.val+1'); $$=new IncrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | id menos_menos                  { addReporte('EXP:  EXP --','EXP:=EXP.val-1'); $$=new DecrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | par_abierto EXP par_cerrado     { addReporte('EXP:  ( EXP )','EXP:=EXP.val '); $$ = $2  }
  //nativas
  | sin par_abierto EXP par_cerrado             { addReporte('EXP: sin par_abierto EXP par_cerrado','EXP:=sen( EXP.val )'); $$ = new Seno($3,@1.firt_line,@1.firt_column);  }
  | cos par_abierto EXP par_cerrado             { addReporte('EXP: cos par_abierto EXP par_cerrado','EXP:=cos( EXP.val )'); $$ = new Coseno($3,@1.firt_line,@1.firt_column);  }
  | tan par_abierto EXP par_cerrado             { addReporte('EXP: tan par_abierto EXP par_cerrado','EXP:=tan( EXP.val )'); $$ = new Tangente($3,@1.firt_line,@1.firt_column);  }
  | sqrt par_abierto EXP par_cerrado            { addReporte('EXP: sqrt par_abierto EXP par_cerrado','EXP:=sqrt( EXP.val )'); $$ = new Sqrt($3,@1.firt_line,@1.firt_column);  }
  | pow par_abierto EXP coma EXP par_cerrado    { addReporte('EXP: pow par_abierto EXP coma EXP par_cerrado','EXP:=pow( EXP.val^ EXP.val)'); $$ = new Pow($3,$5,@1.firt_line,@1.firt_column);  }
  | log10 par_abierto EXP par_cerrado           { addReporte('EXP: log10 par_abierto EXP par_cerrado','EXP:=log10( EXP.val )'); $$ = new Log($3,@1.firt_line,@1.firt_column);  }
  //nativas string
  | NATIVA_STRING                 {$$=$1;}
  | EXP repeticion EXP         
  { addReporte('EXP:  EXP ^ EXP','EXP:=EXP1.val ^ EXP2.val'); $$= new RepeticionCadena($1,TIPO_NATIVA_CADENA.REPETICION,$3,null,@1.firt_line,@1.firt_column); }

  //casteos CADENA
  | int punto parse par_abierto EXP par_cerrado
  { $$=new Casteos($5,TIPO_NATIVA_CADENA.INTPARSE,@1.firt_line,@1.firt_column); }
  | double punto parse par_abierto EXP par_cerrado
  { $$=new Casteos($5,TIPO_NATIVA_CADENA.DOUBLEPARSE,@1.firt_line,@1.firt_column); }
  | boolean punto parse par_abierto EXP par_cerrado
  { $$=new Casteos($5,TIPO_NATIVA_CADENA.BOOLEANPARSE,@1.firt_line,@1.firt_column); }
  //casteos INT
  | toInt par_abierto EXP par_cerrado
  { $$=new CasteosTo($3,TIPO_NATIVA_CADENA.TOINT,@1.firt_line,@1.firt_column); }
  | toDouble par_abierto EXP par_cerrado
  { $$=new CasteosTo($3,TIPO_NATIVA_CADENA.TODOUBLE,@1.firt_line,@1.firt_column); }
  | typeof par_abierto EXP par_cerrado
  { $$=new CasteosTo($3,TIPO_NATIVA_CADENA.TYPEOF,@1.firt_line,@1.firt_column); }
  | string par_abierto EXP par_cerrado
  { $$=new CasteosTo($3,TIPO_NATIVA_CADENA.TOSTRING,@1.firt_line,@1.firt_column); }




  //Operaciones de Comparacion
  | EXP mayor EXP                   { addReporte('EXP:  EXP > EXP','EXP:=EXP1.val > EXP2.val');  $$ = new Mayor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP menor EXP                   { addReporte('EXP:  EXP < EXP','EXP:=EXP1.val < EXP2.val');   $$ = new Menor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP mayor_igual EXP             { addReporte('EXP:  EXP >= EXP','EXP:=EXP1.val >= EXP2.val');  $$ = new MayorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP menor_igual EXP             { addReporte('EXP:  EXP <= EXP','EXP:=EXP1.val <= EXP2.val');   $$ = new MenorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP igual_que EXP               { addReporte('EXP:  EXP == EXP','EXP:=EXP1.val == EXP2.val');   $$ = new IgualIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP dif_que EXP                 { addReporte('EXP:  EXP != EXP','EXP:=EXP1.val != EXP2.val');   $$ = new Diff($1,$3,@1.firt_line,@1.firt_column);        }
  
  //Operaciones Lógicas
  | EXP and EXP                     { addReporte('EXP:  EXP && EXP','EXP:=EXP1.val && EXP2.val'); $$ = new And($1,$3,@1.firt_line,@1.firt_column);   }
  | EXP or EXP                      { addReporte('EXP:  EXP || EXP','EXP:=EXP1.val || EXP2.val'); $$ = new Or($1,$3,@1.firt_line,@1.firt_column);  }
  | not EXP                         { addReporte('EXP:  ! EXP','EXP:= ! EXP1.val'); $$ = new Not($2,@1.firt_line,@1.firt_column);  }
  
  //Valores Primitivos
  
  | entero                          { addReporte('EXP:  entero','EXP:=entero.val'); $$ = new Primitivo(0,$1,@1.firt_line,@1.firt_column); }
  | decimal                         { addReporte('EXP:  decimal','EXP:=decimal.val'); $$ = new Primitivo(TIPO.DECIMAL,$1,@1.firt_line,@1.firt_column);}
  | string                          { addReporte('EXP:  string','EXP:=string.val'); $$ = new Primitivo(TIPO.CADENA,$1,@1.firt_line,@1.firt_column);   }
  | id                              { addReporte('EXP:  id','EXP:=id.val'); $$ = new Identificador($1,@1.firt_line,@1.firt_column);   }
  | true                            { addReporte('EXP:  true','EXP:=true'); $$ = new Primitivo(TIPO.BOOLEAN,true,@1.firt_line,@1.firt_column);   }
  | false                           { addReporte('EXP:  false','EXP:=false'); $$ = new Primitivo(TIPO.BOOLEAN,false,@1.firt_line,@1.firt_column);   }
  | null                            { addReporte('EXP:  null','EXP:=null'); $$ = new Primitivo(TIPO.NULL,$1,@1.firt_line,@1.firt_column);  }
  
  //Arreglos
  | ACCESO_ARREGLO                                      { addReporte('EXP:  ACCESO_ARREGLO','EXP:=ACCESO_ARREGLO');  $$ = $1; }
  | ARRAY_LENGTH                                        { addReporte('EXP:  ARRAY_LENGTH','EXP:=ARRAY_LENGTH');  $$ = $1; }
  | ARRAY_POP                                           { addReporte('EXP:  ACCESO_ARREGLO','EXP:=ACCESO_ARREGLO');  $$ = $1; }
  | corchete_abierto LISTA_EXPRESIONES corchete_cerrado { addReporte('EXP:  { LISTA_EXPRESIONES }','EXP:=LISTA_EXPRESIONES');  $$ = $2; }
  | ARRAY_METHOD                                        {  addReporte('EXP:  ARRAY_METHOD','EXP:=ARRAY_METHOD'); $$ = $1; }
  
  
  //Types - accesos
  | ACCESO_TYPE                                         { addReporte('EXP:  ACCESO_TYPE','EXP:=ACCESO_TYPE'); $$ = $1;   }
  | ACCESO_TYPE igual EXP punto_coma                    { addReporte('EXP:  ACCESO_TYPE igual EXP punto_coma','EXP:=EXP.val'); $$ = new Asignacion_Struct_Exp($1,$3,@1.first_line,@1.first_column);}  
  //| id id                                             { $$ = new Struct_Param($1,$2,@1.first_line,@1.first_column);}
  //Ternario
  | TERNARIO                                             { addReporte('EXP:  TERNARIO','EXP:=TERNARIO.val'); $$ = $1;  }
  
  //Funciones
  | LLAMADA_FUNCION_EXP                                  { addReporte('EXP: LLAMADA_FUNCION_EXP','EXP:= LLAMADA_FUNCION_EXP'); $$ = $1  }
  
;
NATIVA_STRING:
   id punto toLowercase par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto toLowercase par_abierto par_cerrado','EXP:= toLowercase(id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto toLowercase par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto toLowercase par_abierto par_cerrado','EXP:= toLowercase(id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto toUppercase par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto toUppercase par_abierto par_cerrado','EXP:= toUppercase(id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto toUppercase par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto toUppercase par_abierto par_cerrado','EXP:= toUppercase(id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto length par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto length par_abierto par_cerrado','EXP:= id.val.length()'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto length par_abierto par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto length par_abierto par_cerrado','EXP:= id.val.length()'); $$= new NativasString($1,TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto subString par_abierto EXP coma EXP par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto subString par_abierto EXP coma EXP par_cerrado','EXP:= id.val.subString(EXP1.val,EXP2.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column,$9); }
  | string punto subString par_abierto EXP coma EXP par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto subString par_abierto EXP coma EXP par_cerrado','EXP:= id.val.subString(EXP1.val,EXP2.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column,$9); }

  | id punto caracterOfPosition par_abierto EXP par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto caracterOfPosition par_abierto EXP par_cerrado','EXP:= id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column,$7); }
  | string punto caracterOfPosition par_abierto EXP par_cerrado NATIVA_STRING2        
  { addReporte('EXP: id punto caracterOfPosition par_abierto EXP par_cerrado','EXP:= id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column,$7); }

  ///////////////////////////////////
  | id punto toLowercase par_abierto par_cerrado         
  { addReporte('EXP: id punto toLowercase par_abierto par_cerrado','EXP:= toLowercase(id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column); }
  | string punto toLowercase par_abierto par_cerrado         
  { addReporte('EXP: id punto toLowercase par_abierto par_cerrado','EXP:= toLowercase(id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column); }

  | id punto toUppercase par_abierto par_cerrado         
  { addReporte('EXP: id punto toUppercase par_abierto par_cerrado','EXP:= toUppercase(id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column); }
  | string punto toUppercase par_abierto par_cerrado         
  { addReporte('EXP: id punto toUppercase par_abierto par_cerrado','EXP:= toUppercase(id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column); }

  | id punto length par_abierto par_cerrado         
  { addReporte('EXP: id punto length par_abierto par_cerrado','EXP:= id.val.length()'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column); }
  | string punto length par_abierto par_cerrado         
  { addReporte('EXP: id punto length par_abierto par_cerrado','EXP:= id.val.length()'); $$= new NativasString($1,TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column); }

  | id punto subString par_abierto EXP coma EXP par_cerrado         
  { addReporte('EXP: id punto subString par_abierto EXP coma EXP par_cerrado','EXP:= id.val.subString(EXP1.val,EXP2.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column); }
  | string punto subString par_abierto EXP coma EXP par_cerrado         
  { addReporte('EXP: id punto subString par_abierto EXP coma EXP par_cerrado','EXP:= id.val.subString(EXP1.val,EXP2.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column); }

  | id punto caracterOfPosition par_abierto EXP par_cerrado         
  { addReporte('EXP: id punto caracterOfPosition par_abierto EXP par_cerrado','EXP:= id.val)'); $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column); }
  | string punto caracterOfPosition par_abierto EXP par_cerrado         
  { addReporte('EXP: id punto caracterOfPosition par_abierto EXP par_cerrado','EXP:= id.val)'); $$= new NativasString($1,TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column); }

;
NATIVA_STRING2:

   NATIVA_STRING2 punto toLowercase par_abierto par_cerrado             { $1.push(new NativasString("",TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column)); $$=$1; }
  | NATIVA_STRING2 punto toUppercase par_abierto par_cerrado            { $1.push(new NativasString("",TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column)); $$=$1; }
  | NATIVA_STRING2 punto length par_abierto par_cerrado                 { $1.push(new NativasString("",TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column)); $$=$1; }
  | NATIVA_STRING2 punto subString par_abierto EXP coma EXP par_cerrado { $1.push(new NativasString("",TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column)); $$=$1; }
  | NATIVA_STRING2 punto caracterOfPosition par_abierto EXP par_cerrado { $1.push(new NativasString("",TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column)); $$=$1; }
  | punto toLowercase par_abierto par_cerrado                           { $$=[new NativasString("",TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column)]; } 
  | punto toUppercase par_abierto par_cerrado                           { $$=[new NativasString("",TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column)]; }         
  | punto length par_abierto par_cerrado                                { $$=[new NativasString("",TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column) ]; }
  | punto subString par_abierto EXP coma EXP par_cerrado                { $$=[new NativasString("",TIPO_NATIVA_CADENA.SUBSTRING,$4,$6,@1.firt_line,@1.firt_column)]; }
  | punto caracterOfPosition par_abierto EXP par_cerrado                { $$=[new NativasString("",TIPO_NATIVA_CADENA.CARACTER_POSITION,$4,null,@1.firt_line,@1.firt_column)]; }
;


// ARRAY_LENGTH 
//   : id punto length  {    }
//   | id LISTA_ACCESOS_ARREGLO punto length  {    }
//   | id LISTA_ACCESOS_TYPE punto length  {    }
// ;

 ARRAY_POP 
     : id punto pop par_abierto par_cerrado                        { addReporte('ARRAY_POP: id punto pop par_abierto par_cerrado',''); $$ = new Pop($1,@1.first_line,@1.first_column);   }
     | id punto push par_abierto EXP par_cerrado                   { addReporte('ARRAY_POP: id punto push par_abierto EXP par_cerrado',''); $$ = new Push($1,$5,@1.first_line,@1.first_column);   }
     | id EXPS_CORCHETE punto pop par_abierto par_cerrado          { addReporte('ARRAY_POP: id EXPS_CORCHETE punto pop par_abierto par_cerrado',''); $$ = new Pop_List($1,$2,@1.first_line,@1.first_column);  }
     | id EXPS_CORCHETE punto push par_abierto EXP par_cerrado     { addReporte('ARRAY_POP: id EXPS_CORCHETE punto push par_abierto EXP par_cerrado',''); $$ = new Push_List($1,$2,$6,@1.first_line,@1.first_column);   }     
//   | id LISTA_ACCESOS_ARREGLO punto pop par_abierto par_cerrado  {    }
//   | id LISTA_ACCESOS_TYPE punto pop par_abierto par_cerrado     {    }
 ;

TERNARIO 
  : EXP interrogacion EXP dos_puntos EXP          { addReporte('TERNARIO: EXP interrogacion EXP dos_puntos EXP',''); $$ = new Ternario($1,$3,$5,@1.firt_line,@1.firt_column);  }
;

ACCESO_TYPE                                                   //$1 => id struct //$2 objetos del struct
  : id LISTA_ACCESOS_TYPE                         {   addReporte('ACCESO_TYPE: id LISTA_ACCESOS_TYPE',''); $$ = new Acceso_Struct($1,$2,@1.first_line,@1.first_column);   }
 // | id = id LISTA_ACCESOS_TYPE  punto_coma       // {   $$ = new ($1,$2,@1.first_line,@1.first_column);   }
  
;
//------------------------------------------------------------------------------------------------------
//----------------------------------------------PRUEBA--------------------------------------------------
//------------------------------------------------------------------------------------------------------
LISTA_ACCESOS_TYPE 
  : LISTA_ACCESOS_TYPE punto id                                   { addReporte('LISTA_ACCESOS_TYPE: LISTA_ACCESOS_TYPE punto id',''); $1.push($3);$$ = $1;  }
  | punto id                                                      { addReporte('LISTA_ACCESOS_TYPE: punto id','');  $$ = [$2];            }
  | punto ACCESO_ARREGLO {   $$ = [$2];}
  
  //| punto id  EXPS_CORCHETE                                            {  $$ = new Acceso($1,$2,@1.first_line,@1.first_column); }  
  //| 
  //| LISTA_ACCESOS_TYPE punto  ACCESO_ARREGLO                      { $1.push($2); $$ = $1;  }
  
  //| punto id LISTA_ACCESOS_ARREGLO                                {    }
;

LISTA_ACCESOS_ARREGLO 
  : LISTA_ACCESOS_ARREGLO corchete_abierto EXP corchete_cerrado {    }
  | corchete_abierto EXP corchete_cerrado {    }
;

LISTA_EXPRESIONES 
  : LISTA_EXPRESIONES coma EXP { addReporte('LISTA_EXPRESIONES: LISTA_EXPRESIONES coma EXP','LISTA_EXPRESIONES:=LISTA_EXPRESIONES.push(EXP) '); $1.push($3); $$ = $1;  }
  | EXP                        { addReporte('LISTA_EXPRESIONES: EXP','LISTA_EXPRESIONES:=EXP.val '); $$ = [$1]; }
;


TIPO_DEC_VARIABLE
  : string                      { addReporte('TIPO_DEC_VARIABLE: string','TIPO_DEC_VARIABLE:= string.val'); $$ = TIPO.CADENA;  }
  | int                        { addReporte('TIPO_DEC_VARIABLE: int','TIPO_DEC_VARIABLE:= int.val'); $$ = 0;            }
  | double                     { addReporte('TIPO_DEC_VARIABLE: double','TIPO_DEC_VARIABLE:= double.val'); $$ = TIPO.DECIMAL; }
  | boolean                    { addReporte('TIPO_DEC_VARIABLE: boolean','TIPO_DEC_VARIABLE:= boolean.val'); $$ = TIPO.BOOLEAN; }
;

// TIPO_VARIABLE_NATIVA
//   : string                     { $$ = TIPO.CADENA;  } 
//   | int                        { $$ = 0;            }
//   | double                     { $$ = TIPO.DECIMAL; }
//   | boolean                    { $$ = TIPO.BOOLEAN; }
//   | void                       { $$ = TIPO.VOID;    }
//   | id                         { $$ = TIPO.STRUCT;  }
// ;
LLAMADA_FUNCION_EXP:
      id par_abierto par_cerrado                     { addReporte('LLAMADA_FUNCION_EXP: id par_abierto par_cerrado',''); $$ = new Llamada($1,@1.first_line,@1.first_column); }
    | id par_abierto PARAMETROS_LLAMADA par_cerrado  { addReporte('LLAMADA_FUNCION_EXP: id par_abierto PARAMETROS_LLAMADA par_cerrado',''); $$ = new Llamada($1,@1.first_line,@1.first_column,$3); }    
;

PARAMETROS_LLAMADA :
    PARAMETROS_LLAMADA coma PARAMETRO_LLAMADA       {  addReporte(''); $1.push($3); $$ = $1; }
  | PARAMETRO_LLAMADA                               { $$ = [$1];           }
;

PARAMETRO_LLAMADA:
    EXP                                            { $$ = $1; }  
;

//--------------------------------------ARRAY-----------------------------------

DEC_ARRAY //Arreglo del tipo---> int[] arr = [exp1,exp2, [exp3] ]

  : TIPO_DEC_VARIABLE LISTA_CORCHETES id  igual corchete_abierto  LISTA_EXPRESIONES corchete_cerrado punto_coma
                                                                          { $$ = new Arreglo ($1,$3,$6,$1,$3,@1.first_line,@1.first_column);    }
  | TIPO_DEC_VARIABLE LISTA_CORCHETES id  igual  nmral id                 { $$ = new Arreglo_Valor($1,$3,$6,@1.first_line,@1.first_column); }
;


LISTA_CORCHETES 
  : LISTA_CORCHETES corchete_abierto corchete_cerrado   {  $$ = $2+$1  }
  | corchete_abierto corchete_cerrado                   {  $$ = 1;     }
;

MODIFICAR_ARREGLO:
  id EXPS_CORCHETE igual EXP punto_coma                 {  $$ = new Modificar($1,$2, $4,@1.first_line,@1.first_column); }
;
ACCESO_ARREGLO:
    id  EXPS_CORCHETE                                            {  $$ = new Acceso($1,$2,@1.first_line,@1.first_column); }
  
  | id  corchete_abierto begin dos_puntos EXP corchete_cerrado  {  $$ = new Fin_Rango($1,$5,@1.first_line,@1.first_column); }
  | id  corchete_abierto EXP dos_puntos end corchete_cerrado    {  $$ = new Begin_Rango($1,$3,@1.first_line,@1.first_column); }
  | id  corchete_abierto EXP dos_puntos EXP corchete_cerrado      {  $$ = new Rango($1,$3 ,$5,@1.first_line,@1.first_column); }
  | id  corchete_abierto begin dos_puntos end corchete_cerrado    {  $$ = new Rango_Complete($1,$3 ,$5,@1.first_line,@1.first_column); }
;



EXPS_CORCHETE:
    EXPS_CORCHETE corchete_abierto EXP corchete_cerrado { $1.push($3); $$ = $1; }
  | corchete_abierto EXP corchete_cerrado               { $$ = [$2]             } 
;

INSTANCIA_STRUCT:
  id id igual id par_abierto LISTA_EXPRESIONES par_cerrado punto_coma
  { $$ = new Dec_Struct($1,$2,$4,$6,@1.first_line,@1.first_column); }
  //| id id  {$$ = new Dec_Struct($1,$2,,$6,@1.first_line,@1.first_column); }

;


ARRAY_METHOD:
  id nmral por EXP                                        {$$ = new Multiplicacion_Arr($1,$4,@1.first_line,@1.first_column);}
 | id nmral div EXP                                       {$$ = new Division_Arr($1,$4,@1.first_line,@1.first_column);}
 | id nmral menos EXP                                     {$$ = new Resta_Arr($1,$4,@1.first_line,@1.first_column);}
 | id nmral mas EXP                                       {$$ = new Suma_Arr($1,$4,@1.first_line,@1.first_column);}
 | sin nmral par_abierto id par_cerrado                   {$$ = new Seno_Arr($4,@1.first_line,@1.first_column);}
 | cos nmral par_abierto id par_cerrado                   {$$ = new Cos_Arr($4,@1.first_line,@1.first_column);}
 | tan nmral par_abierto id par_cerrado                   {$$ = new Tan_Arr($4,@1.first_line,@1.first_column);}
;

GRAFICAR_TABLA:
    graficar_ts par_abierto par_cerrado punto_coma
    { $$ = new Graficar(@1.first_line,@1.first_column);}

;

/*
'++'        return 'mas_mas';
'+'         return 'mas';
'--'        return 'menos_menos'
'-'         return 'menos';
'**'        return 'potencia';
'*'         return 'por';
'/'         return 'div';
'%'         return 'mod';
*/