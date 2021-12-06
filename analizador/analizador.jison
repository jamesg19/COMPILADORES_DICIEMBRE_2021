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


INICIO : INSTRUCCIONES EOF { $$ = $1; return $$; };

INSTRUCCIONES : INSTRUCCIONES INSTRUCCION { $1.push($2); $$ = $1;  }
              | INSTRUCCION { $$ = [$1] }
              ;
%start INICIO 

//////////////////////////////PARTE SINTACTICA//////////////
%% /* DEFINICION DE LA GRAMATICA*/
//terminales con minuscula
//no terminales con mayuscula
INICIO:
    INSTRUCCIONES EOF{ return new Nodo({etiqueta: 'INICIO', hijos: [$1], linea: yylineno});   }
    
;
INSTRUCCIONES:
      
    INSTRUCCIONES INSTRUCCION { $$ = new Nodo({etiqueta: 'INSTRUCCIONES', hijos: [...$1.hijos, ...$2.hijos], linea: yylineno}); }
    | INSTRUCCION             { $$ = new Nodo({etiqueta: 'INSTRUCCIONES', hijos: [...$1.hijos], linea: yylineno}); }

;

//estas son las producciones que se tienen
//que agregar 
//
//La precedencia de operadores ya esta arriba
//solo hay que crear la produccion (ambigua)

INSTRUCCION: 
    DECLARACION_VARIABLE            {    }
  | DECLARACION_FUNCION             {     }
  | DECLARACION_TYPE                {    }
  | ASIGNACION 	                    {   } 
  | PUSH_ARREGLO 	            {   }
  | IMPRIMIR 	                {    }
  | CONDICION_IF 	            {    }
  | SWITCH 	                  {   }
  | BREAK 	                  {   }
  | RETURN 	                  {   }
  | CONTINUE 	                {   }
  | WHILE 	                  {   }
  | DO_WHILE 	                {   }
  | FOR 	                    {   }
  | FOR1_OF 	                {   }
  | FOR2_IN 	                {   }
  | LLAMAR_FUNCION            {   }
  | INCREMENTO_DECREMENTO     {   }
  | PRINTLN                   {   }
  | PRINT                     {   }


PRINT  :  println par_abierto decimal par_cerrado punto_coma  { $$ = new Print(1,1,$3);  };


