# Manual Tecnico

## Tabla de Contenido
**[Introducción](#introduccion)**

**[Objetivos Generales](#obgenerales)**

**[Objetivos Específicos](#obespe)**

**[Descripcion](#descripcion)**

**[Tecnologias](#tecnologia)**

**[Usabilidad](#usabilidad)**

## Introducción <a name="introduccion"></a>

Interprete quetzal cuenta con una mezcla de la sintaxis de los lenguajes de programacion mas conocidos como lo son java, python y c, el proyecto se puede encontrar en el siguiente [Enlace](https://github.com/jamesg19/COMPILADORES_DICIEMBRE_2021) , cuenta con un patron de diseño facil de reimplentar el cual se explicara a mas detalle en el siguiente manual.

## Objetivos Generales <a name="obgenerales"></a>

- Desarrollar un pseudo lenguaje de programacion facil de usar e implementar con su traduccion a codigo intermedio

## Objetivos Específicos <a name="obespe"></a>

- Crear una gramatica no ambigua para un analizador ascendente
- Implementar el patron de diseño interprete para desarrollar reglas semanticas para la gramatica desarrollada
- Traducir a un codigo intermedio de bajo nivel el codigo introducido
- Desplegar el interprete en github pages, para el uso publico

## Descripcion <a name="descripcion"></a>

Como se menciono anteriormente el lenguaje es una mezcla de varios lenguajes ya conocidos, la siguiente imagen demuestra de mejor manera el patron utilizado para crear el lenguaje

![img_patron_interprete](https://github.com/jamesg19/COMPILADORES_DICIEMBRE_2021/blob/main/img_patron.png)

Donde el proyecto se encuentra estructurado de la siguiente manera

- Analizador
  - Parser (analizadores)
- Clase Abstracta
  - Instrucciones
- Expresiones
  - las clases que se encuentran en este paquete tienen la caracteristica de retornar un valor
    - Aritmeticas
    - Logicas
    - Relacionales
    - Operador Ternario
    - expresiones nativas
    - expresiones para arreglos
- Table
  - Arbol, el cual simula el ast del lenguaje
  - Tabla de simbolos
  - Tipos Nativos
- Assets
  - paquete que se encuentra relacionado con la interfaz del usuario
- Paquete Principal
  - Principal
  - Traduccion

## Tecnologias <a name="tecnologia"></a>

- Typescript Version 4.5.2, lenguaje principal
- Node , npm , Jison

## Usabilidad <a name="usabilidad"></a>

Para evitar resultados inesperados se debe de utilizar las tecnologias anteriormente mencioandas.

Pasos (Linux)

```bash
#clona el proyecto desde el repositorio ofical
git clone https://github.com/jamesg19/COMPILADORES_DICIEMBRE_2021.git

#se desplaza a la carpeta donde se encentra el proyecto
cd COMPILADORES\_DICIEMBRE\_202

#comando para instalar las dependencias utilizadas

npm i
#usa la funcionalidad watch de typescript,
#para transpilar los cambios al instante
tsc -w

```

si se desea modificar la gramatica tener corriendo watch para generar el parser el siguiente comando puede ayudar

```bash
    #para ejecutar este comando se debe estar en el directorio
    #del archivo analizador
    watch -n 1 'jison analizador.jison'
```
