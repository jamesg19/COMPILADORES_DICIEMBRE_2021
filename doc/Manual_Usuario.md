# **Manuel de usuario**
Quetzal es un interprete de código y traductor de código intermedio con sintaxis similar a Java donde se manejan struct similar a C. Ademas tiene varias funcionalidades, que se describen a continuación:

- Interpretacion de código
- Traduccion a código (3 direcciones).
- Grafica AST del código ingresado
- Visualización de tabla de símbolos en diferentes entornos.
- Reporte de errores Lexico, Sintactico, Semantico.
- Reporte de las producciones gramaticales utilizadas para las reglas sintácticas de cada instrucción de código.

Instrucciones permitidas en Compilador Quetzal.

1) **Instrucciones**(#introduccion)
   1) **[Print(Imprimir)](#print)**
      1) **[Println](#print)**
      1) **[Print](#print)**
   2) **[Declaracion de variables](#declaracion)**
   1) **[Asignacion de variables](#asignacion)**
   1) **[Funciones](#funciones)**
   1) **[Sentencias de control](#sentenciasdecontrol)**
      1) **[For](#for)**
      1) **[For in](#forin)**
      1) **[While](#while)**
      1) **[Do while](#wdowhile)**
   1) **Arreglos(#arreglos)**
   1) **Operaciones(#operacion)**
      1) **Aritméticas(#aritmetica)**
      1) **Lógicas(#logica)**
      1) **Condicionales(#condicion)**
      1) **Trigonométricas(#trigonometrica)**
   1) **Structs(#struct)**
   1) **Llamadas a función(#llamada)**
1) **Expresiones(#expresiones)**






Quetzal es un lenguaje muy sencillo de utilizar por lo que se define la sintaxis del lenguaje

## **Print** <a name="print"></a>
La instrucción permite imprimir datos en consola para la visualización del usuario:

- Imprimir con salto de linea

```println();```

- Imprimir en consola sin salto de línea

```print();```
##
## **Comentarios** <a name="comentarios"></a>
Los comentarios pueden declarase de la siguiente manera: 

- ```//este es un comentario de una línea```
- ```/\* Este es un comentario Multi-línea  \*/```





## Asignacion de variables <a name="asignacion"></a>

para asignar se hace de la siguiente manera

```java

   miVar = 20;

```
## **Tipos de Datos** <a name="datos"></a>
Permite el ingreso de los siguientes tipos de datos:

- String
- Int
- Double
- Boolean
- Char
## **String** <a name="string"></a>
Este tipo de dato permite todos los caracteres ASCI
## **Int** <a name="int"></a>
Permite numeros enteros desde -32768 a 32767 de 16 bits.
## **Double** <a name="double"></a>
Permite números con punto decimal 3.4E-38 a 3.4E+38 con 32 bit.
### **Boolean** <a name="bool"></a>
Permite true o false ( verdadero o falso) únicamente equivalente en entero es 1 y 0.
## **Char** <a name="char"></a>
Permite únicamente 1 carácter de ASCI.

##
##
## **Declaracion de variables y tipos** <a name="decvar"></a>
Deben de seguir el formato

Tipo identificaror = dato a guardar ;

```java
String cadena=”Hola Quetzal”;

int varaible1=100;

double variable2=150.00;

boolean flag=true;

boolean flag2=false;
```

Tambien existe la declaracion en lista de variables

```java
String a,b,c,d,e,f=”Hola Quetzal”;

Int n1,n2,n3=100;
```

```java
   //tipo id = valor;
  int miVar = 20;
  
   //tipo lstId = valor;
  int a,b,c,d;
  
   //tipo id ;
   int x;
   
   //en esta declaracion el compilador le asigna el valor 0 por defecto

```

## **Funciones** <a name="funciones"></a>
una función es una sección de un programa que calcula un valor de manera independiente al resto del programa el código de la función, que son las operaciones que hace la función; y. el resultado (o valor de retorno), que es el valor final que entrega la función.

Las funciones pueden declararse:

```java
Tipo identifcador(){

….

…

..

. //codigo

}

void saludar(){

println(“Hola mundo”);

} 
```

Tambien pueden declararse con parámetros e indicando su tipo a cada uno

```java
Void sumar(int numero1, double numero2){

Println(numero1+numero2);

}
```

Las funciones pueden llamarse de la siguiente manera

Identificador_de_funcion ();

``` sumar(); ```

``Restar();``

```Dividir(); ```

Además se pueden llamar pasandole una lista de parámetros según el tipo de dato que corresponda.

```Multiplicar(numero1 , numero2 );```

```Calcular_numero_mayor(numero1, numero2, numero3 …… ,numero5);```
## **Sentencias de control** <a name="sentenciasdecontrol"></a>
Las centencias de control son utilizadas para iterar en varias ocaciones un conjunto de datos en las variables o arreglos
## **FOR** <a name="for"></a>
Se puede declarac de la siguiente manera

```java
for ( declaración/asignación  ; condición    ; incremento  ){

… //codigo

} 

For( int i=0;i<5;i++){

}
```


## **FOR-IN** <a name="forin"></a>
Se puede declarac de la siguiente manera

```python

for a in [“hola”,”mundo”,”quiero”,”ganar”, “compi2”)  {

… //codigo

}

```
## WHILE <a name="while"></a>
La declaracion de un while es la siguiente

```java
while( a<15){

   … //codigo

}

DO WHILE

 do{

   … //codigo

}while(a>15 && a< 25);

```

**SENTENCIAS DE SALIDAS CICLICAS** <a name="sentenciasciclicas"></a>

Existen funciones para salir de los ciclos o romper 

**Continue y Break** <a name="continiue"></a>

Continue sirve para avanzar a la siguiente iteración del ciclo y Break sirve para salir de dicho ciclo.

INSTRUCIONES CONDICIONALES

```java
if (CONDICION){

   LISTA_INTRUCCIONES

}

if (CONDICION)

   INSTRUCCION

if(CONDICION1){

   LISTA\_INTRUCCIONES

}

else if(CONDICION1){

   LISTA\_INTRUCCIONES

}

else{

   LISTA\_INTRUCCIONES

}

switch(expression) {

   case x:

      LISTA\_INTRUCCIONES

   break;

   case y:

      LISTA\_INTRUCCIONES

   break;

      default:

   LISTA\_INTRUCCIONES

}

// el break puede ser opcional, se manejará igual que un switch de java

```
## **ARREGLOS** <a name="arreglos"></a>
Se pueden declarar de la siguiente manera

```java
int[] arr = [1,2,3,4,5,6];

print(arr[2:4]); //[2,3,4]

print(arr[begin:4]) //[1,2,3,4]

print(arr[4:end]) //[4,5,6]
```



## STRUCT <a name="struct"></a>

Se pueden declarar de la siguiente manera

```c
// Struct

struct NOMBRE\_STRUCT

{

      LISTA\_ATRIBUTOS

};
```

Instanciar un struct 

NOMBRE\_STRUCT ID = NOMBRE\_STRUCT(LISTA\_VALORES);


# **Generacion de código 3D** <a name="generaciondecodigo3d"></a>
En el proceso de traducir un programa fuente a código destino, un compilador puede construir una o más representaciones intermedias, las cuales pueden tener una variedad de formas. Los árboles sintácticos son una forma de representación intermedia; por lo general, se utilizan durante el análisis sintáctico y semántico.

Después del análisis sintáctico y semántico del programa fuente, muchos compiladores generan un nivel bajo explícito, o una representación intermedia similar al código máquina, que podemos considerar como un programa para una máquina abstracta. Esta representación intermedia debe tener dos propiedades importantes: debe ser fácil de producir y fácil de traducir en la máquina destino. Existe una forma intermedia llamada código de tres direcciones, que consiste en una secuencia de instrucciones similares a ensamblador, con tres operandos por instrucción. Cada operando puede actuar como un registro. La salida del generador de código intermedio en la figura 2.7 consiste en la secuencia de código de tres direcciones. 

```assembler
a=150\*6-3

t1=150\*6

t2=t1-3

a=t2;
```
