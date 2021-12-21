%lex
%options case-sensitive

%%


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
\s+					return 'esp';						                // espacios en blanco
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
'$'       return 'dolar';

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
    | id  { $$=$1; }
    | esp     { $$=$1; }

;

EXP
  //Operaciones Aritmeticas
  : 
  menos EXP %prec UMENOS          {  $$ = new NegacionNum(6,$2,0,@1.firt_line,@1.firt_column);   }
    | esp     {  }
  | EXP mas EXP                     {  $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP mass EXP                    {  $$ = new Suma(0,$1,$3,@1.firt_line,@1.firt_column);         }
  | EXP menos EXP                   {  $$ = new Resta(1,$1,$3,@1.firt_line,@1.firt_column);        } 
  | EXP por EXP                     {  $$ = new Multiplicar(2,$1,$3,@1.firt_line,@1.firt_column);  }
  | EXP div EXP                     {  $$ = new Division(3,$1,$3,@1.firt_line,@1.firt_column);     }
  | entero                        { $$ = new Primitivo(0,$1,@1.firt_line,@1.firt_column); }
  | decimal                         {  $$ = new Primitivo(TIPO.DECIMAL,$1,@1.firt_line,@1.firt_column);}
  | id                              {  $$ = new Identificador($1,@1.firt_line,@1.firt_column);   }
  | string par_abierto EXP par_cerrado
  { $$=new CasteosTo($3,TIPO_NATIVA_CADENA.TOSTRING,@1.firt_line,@1.firt_column); }

  ;
// id asda 
