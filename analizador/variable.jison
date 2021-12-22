%lex
%options case-sensitive
%x state1
%%


"//".*										              // comentario simple
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
//stados iniciales


[{]               this.begin("state1"); return 'llave_abierta'; 
//tipos de datos
<state1>'string'    return 'string';
<state1>'int'       return 'int';
<state1>'double'    return 'double';
<state1>'boolean'   return 'boolean';
<state1>'void'      return 'void';
<state1>'struct'    return 'struct';
<state1>'const'     return 'const';
//funciones nativas
<state1>'print'     return 'print';
<state1>'println'   return 'println';
<state1>'push'      return 'push';
<state1>'length'    return 'length';
<state1>'pop'       return 'pop';

<state1>'return'    return 'return';
<state1>'null'      return 'null';

//condicionales y ciclos
<state1>'if'        return 'if';
<state1>'else'      return 'else';
<state1>'break'     return 'break';
<state1>'switch'    return 'switch';
<state1>'case'      return 'case';
<state1>'default'   return 'default';
<state1>'continue'  return 'continue';
<state1>'while'     return 'while';
<state1>'do'        return 'do';
<state1>'for'       return 'for';
<state1>'in'        return 'in';

//nativas
<state1>'sin'         return 'sin';
<state1>'log10'       return 'log10';
<state1>'cos'         return 'cos';
<state1>'tan'         return 'tan';
<state1>'sqrt'        return 'sqrt';
<state1>'pow'         return 'pow';
//nativas String
<state1>'^' return 'repeticion';
<state1>'toLowercase' return 'toLowercase';
<state1>'toUppercase' return 'toUppercase';
<state1>'subString' return 'subString';
<state1>'caracterOfPosition' return 'caracterOfPosition';
//casteos
<state1>'parse'     return 'parse';
<state1>'toInt'     return 'toInt';
<state1>'toDouble'  return 'toDouble';
<state1>'typeof'    return 'typeof';

//kw
<state1>'true'      return 'true';
<state1>'false'     return 'false';
<state1>'pop'       return 'pop';
<state1>'push'      return 'push';
<state1>'main'      return 'main';
<state1>'begin'     return 'begin';
<state1>'end'       return 'end';


//Patrones numericos
<state1>[0-9]+("."[0-9]+)\b  	return 'decimal';
//[0-9]+\b  	return 'entero';





//Signos
<state1>';'         return  'punto_coma';
<state1>','         return 'coma';
<state1>':'         return 'dos_puntos';
<state1>'.'         return 'punto';

//agrupacion

//agrupacion
//'{'         return 'llave_abierta';
//'}'         return 'llave_cerrada';
<state1>\s+	            {  }
<state1>'+'         return 'mas';
<state1>[0-9]+\b   	return 'entero';
<state1>([a-zA-Z])[a-zA-Z0-9_]* return 'id';
//<state1>[}]       this.begin('INITIAL'); return 'llave_cerrada';
<state1>'('         return 'par_abierto';
<state1>')'         return 'par_cerrado';
<state1>'['         return 'corchete_abierto';
<state1>']'         return 'corchete_cerrado';

//operadores aritmeticos
<state1>'++'        return 'mas_mas';
//'+'         return 'mas';
<state1>'--'        return 'menos_menos'
<state1>'-'         return 'menos';
<state1>'**'        return 'potencia';
<state1>'*'         return 'por';
<state1>'/'         return 'div';
<state1>'%'         return 'mod';


//operadores relaciona
<state1>'<='        return 'menor_igual';
<state1>'>='        return 'mayor_igual';
<state1>'>'         return 'mayor';
<state1>'<'         return 'menor';
<state1>'=='        return 'igual_que';

//asignacion
<state1>'='         return 'igual';

//operadores logicos
<state1>'!='        return 'dif_que';
<state1>'&&'        return 'and';
<state1>'&'         return 'mass';
<state1>'||'        return 'or';
<state1>'!'         return 'not';
<state1>'?'         return 'interrogacion';
<state1>'#'         return 'nmral';
//Patrones para cadenas
<state1>\"[^\"]*\"			{ yytext = yytext.slice(1,-1); return 'string'; }
<state1>\'[^\']*\'			{ yytext = yytext.slice(1,-1); return 'string'; }
//\`[^\`]*\`			{ yytext = yytext.substr(0,yyleng-0); return 'string'; }
<state1>[}]      this.popState(); return 'llave_cerrada';


([$][a-zA-ZÀ-ÿ_$])[À-ÿ$a-zA-Z0-9_]* return 'id2';
'$'       return 'dolar';
([a-zA-ZÀ-ÿ_$])[À-ÿ$a-zA-Z0-9_]* return 'id';
\s+					return 'esp';						                // espacios en blanco

//errores
.					{

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
%left 'igual_que' 'dif_que' //listo
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
    INSTRUCCIONES EOF                 { $$ = $1; return $$;   }
    
;
INSTRUCCIONES:
      
    INSTRUCCIONES INSTRUCCION         {  $1.push($2); $$ = $1; }
    | INSTRUCCION                     {  $$ = [$1];   }

;



INSTRUCCION: 
  
    dolar llave_abierta EXP llave_cerrada 
    { $$=$3; }
    | id  { $$ = new Primitivo(TIPO.CADENA,$1,@1.firt_line,@1.firt_column); }
    | esp     { $$ = new Primitivo(TIPO.CADENA,$1,@1.firt_line,@1.firt_column); }
    | id2     { $$ = new Identificador($1.slice(1),@1.firt_line,@1.firt_column);   }

;

EXP
  //Operaciones Aritmeticas
  : menos EXP %prec UMENOS          {  $$ = new NegacionNum(6,$2,0,@1.firt_line,@1.firt_column);   }
  | EXP mas EXP                     { $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP mass EXP                    {  $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP menos EXP                   {  $$ = new Resta(1,$1,$3,@1.firt_line,@1.firt_column);        } 
  | EXP por EXP                     {  $$ = new Multiplicar(2,$1,$3,@1.firt_line,@1.firt_column);  }
  | EXP div EXP                     {  $$ = new Division(3,$1,$3,@1.firt_line,@1.firt_column);     }
  //| EXP potencia EXP                { $$ = new Potencia(4,$1,$3,@1.firt_line,@1.firt_column);     }
  | EXP mod EXP                     {  $$ = new Modulo(5,$1,$3,@1.firt_line,@1.firt_column);       }
  | id mas_mas                      {  $$=new IncrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | id menos_menos                  {  $$=new DecrementoVariable($1,@1.firt_line,@1.firt_column);  }
  | par_abierto EXP par_cerrado     {  $$ = $2  }
  //nativas
  | sin par_abierto EXP par_cerrado             {  $$ = new Seno($3,@1.firt_line,@1.firt_column);  }
  | cos par_abierto EXP par_cerrado             {  $$ = new Coseno($3,@1.firt_line,@1.firt_column);  }
  | tan par_abierto EXP par_cerrado             {  $$ = new Tangente($3,@1.firt_line,@1.firt_column);  }
  | sqrt par_abierto EXP par_cerrado            { $$ = new Sqrt($3,@1.firt_line,@1.firt_column);  }
  | pow par_abierto EXP coma EXP par_cerrado    { $$ = new Pow($3,$5,@1.firt_line,@1.firt_column);  }
  | log10 par_abierto EXP par_cerrado           {  $$ = new Log($3,@1.firt_line,@1.firt_column);  }
  //nativas string
  | NATIVA_STRING                 {$$=$1;}
  | EXP repeticion EXP         
  {  $$= new RepeticionCadena($1,TIPO_NATIVA_CADENA.REPETICION,$3,null,@1.firt_line,@1.firt_column); }

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
  | EXP mayor EXP                   { $$ = new Mayor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP menor EXP                   { $$ = new Menor($1,$3,@1.firt_line,@1.firt_column);       }
  | EXP mayor_igual EXP             { $$ = new MayorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP menor_igual EXP             { $$ = new MenorIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP igual_que EXP               { $$ = new IgualIgual($1,$3,@1.firt_line,@1.firt_column);  }
  | EXP dif_que EXP                 { $$ = new Diff($1,$3,@1.firt_line,@1.firt_column);        }
  
  //Operaciones Lógicas
  | EXP and EXP                     {  $$ = new And($1,$3,@1.firt_line,@1.firt_column);   }
  | EXP or EXP                      { $$ = new Or($1,$3,@1.firt_line,@1.firt_column);  }
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
  | ACCESO_ARREGLO                                      { $$ = $1; }
  | ARRAY_LENGTH                                        { $$ = $1; }
  | ARRAY_POP                                           { $$ = $1; }
  | corchete_abierto LISTA_EXPRESIONES corchete_cerrado { $$ = $2; }
  | ARRAY_METHOD                                        { $$ = $1; }
  | corchete_abierto corchete_cerrado                   {    }
  
  //Types - accesos
  | ACCESO_TYPE                                         { $$ = $1;   }
  | ACCESO_TYPE igual EXP punto_coma                    {  $$ = new Asignacion_Struct_Exp($1,$3,@1.first_line,@1.first_column);}  
  //| id id                                             { $$ = new Struct_Param($1,$2,@1.first_line,@1.first_column);}
  //Ternario
  | TERNARIO                                             {  $$ = $1;  }
  
  //Funciones
  | LLAMADA_FUNCION_EXP                                  {  $$ = $1  }
  
;
NATIVA_STRING:
   id punto toLowercase par_abierto par_cerrado NATIVA_STRING2        
  {  $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto toLowercase par_abierto par_cerrado NATIVA_STRING2        
  {  $$= new NativasString($1,TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto toUppercase par_abierto par_cerrado NATIVA_STRING2        
  { $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto toUppercase par_abierto par_cerrado NATIVA_STRING2        
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto length par_abierto par_cerrado NATIVA_STRING2        
  { $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column,$6); }
  | string punto length par_abierto par_cerrado NATIVA_STRING2        
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column,$6); }

  | id punto subString par_abierto EXP coma EXP par_cerrado NATIVA_STRING2        
  { $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column,$9); }
  | string punto subString par_abierto EXP coma EXP par_cerrado NATIVA_STRING2        
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column,$9); }

  | id punto caracterOfPosition par_abierto EXP par_cerrado NATIVA_STRING2        
  { $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column,$7); }
  | string punto caracterOfPosition par_abierto EXP par_cerrado NATIVA_STRING2        
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column,$7); }

  ///////////////////////////////////
  | id punto toLowercase par_abierto par_cerrado         
  { $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column); }
  | string punto toLowercase par_abierto par_cerrado         
  { $$= new NativasString($1,TIPO_NATIVA_CADENA.TOLOWER,null,null,@1.firt_line,@1.firt_column); }

  | id punto toUppercase par_abierto par_cerrado         
  {  $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column); }
  | string punto toUppercase par_abierto par_cerrado         
  { ; $$= new NativasString($1,TIPO_NATIVA_CADENA.TOUPPER,null,null,@1.firt_line,@1.firt_column); }

  | id punto length par_abierto par_cerrado         
  {  $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column); }
  | string punto length par_abierto par_cerrado         
  {  $$= new NativasString($1,TIPO_NATIVA_CADENA.LENGHT,null,null,@1.firt_line,@1.firt_column); }

  | id punto subString par_abierto EXP coma EXP par_cerrado         
  {  $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column); }
  | string punto subString par_abierto EXP coma EXP par_cerrado         
  {  $$= new NativasString($1,TIPO_NATIVA_CADENA.SUBSTRING,$5,$7,@1.firt_line,@1.firt_column); }

  | id punto caracterOfPosition par_abierto EXP par_cerrado         
  {  $$= new NativasString(new Identificador($1,@1.firt_line,@1.firt_column),TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column); }
  | string punto caracterOfPosition par_abierto EXP par_cerrado         
  {  $$= new NativasString($1,TIPO_NATIVA_CADENA.CARACTER_POSITION,$5,null,@1.firt_line,@1.firt_column); }

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


ACCESO_ARREGLO:
    id  EXPS_CORCHETE                                            {  $$ = new Acceso($1,$2,@1.first_line,@1.first_column); }
  
  | id  corchete_abierto begin dos_puntos EXP corchete_cerrado  {  $$ = new Fin_Rango($1,$5,@1.first_line,@1.first_column); }
  | id  corchete_abierto EXP dos_puntos end corchete_cerrado    {  $$ = new Begin_Rango($1,$3,@1.first_line,@1.first_column); }
  | id  corchete_abierto EXP dos_puntos EXP corchete_cerrado      {  $$ = new Rango($1,$3 ,$5,@1.first_line,@1.first_column); }
  | id  corchete_abierto begin dos_puntos end corchete_cerrado    {  $$ = new Rango_Complete($1,$3 ,$5,@1.first_line,@1.first_column); }
;

 ARRAY_POP 
     : id punto pop par_abierto par_cerrado                        { $$ = new Pop($1,@1.first_line,@1.first_column);   }
     | id punto push par_abierto EXP par_cerrado                   { $$ = new Push($1,$5,@1.first_line,@1.first_column);   }
     | id EXPS_CORCHETE punto pop par_abierto par_cerrado          { $$ = new Pop_List($1,$2,@1.first_line,@1.first_column);  }
     | id EXPS_CORCHETE punto push par_abierto EXP par_cerrado     { $$ = new Push_List($1,$2,$6,@1.first_line,@1.first_column);   }     
//   | id LISTA_ACCESOS_ARREGLO punto pop par_abierto par_cerrado  {    }
//   | id LISTA_ACCESOS_TYPE punto pop par_abierto par_cerrado     {    }
 ;
 LISTA_EXPRESIONES 
  : LISTA_EXPRESIONES coma EXP { $1.push($3); $$ = $1;  }
  | EXP                        { $$ = [$1]; }
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
ACCESO_TYPE                                                   //$1 => id struct //$2 objetos del struct
  : id LISTA_ACCESOS_TYPE                         { $$ = new Acceso_Struct($1,$2,@1.first_line,@1.first_column);   }
 // | id = id LISTA_ACCESOS_TYPE  punto_coma       // {   $$ = new ($1,$2,@1.first_line,@1.first_column);   }
  
;
TERNARIO 
  : EXP interrogacion EXP dos_puntos EXP          { $$ = new Ternario($1,$3,$5,@1.firt_line,@1.firt_column);  }
;
LLAMADA_FUNCION_EXP:
      id par_abierto par_cerrado                     { $$ = new Llamada($1,@1.first_line,@1.first_column); }
    | id par_abierto PARAMETROS_LLAMADA par_cerrado  { $$ = new Llamada($1,@1.first_line,@1.first_column,$3); }    
;
// id asda 
