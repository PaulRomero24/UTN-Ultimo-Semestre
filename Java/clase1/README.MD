# CLASE UNO DE JAVA

## CONFIGURACION DE MAVEN + MySQL

**INSTALAR MAVEN EN LA PC** Desde VSCode no me tomaba la version de Maven que viene incluida con la extension,asique tuve que instalar la dependencia
El problema es configurar bien la variable de entorno del sistema. Yo tuve que forzar con un comando ' setx /M PATH "%PATH%;C:\Program Files (x86)\Maven\apache-maven-3.9.16\bin" '
**A TENER EN CUENTA** MAVEN SOPORTA CASI TODAS VERSIONES DE JAVA... PERO A LA HORA DE CONFIGURAR EL POM.XML hay que fijarse la version para que sincronice


## SOBRECARGA Y SOBREESCRITURA

**SOBRECARGA** 
Debido a que no podia hacer funcionar una variable, entendi como trabaja la sobrecarga de metodos.(Varios metodos con el mismo nombre)
Java los diferencia automáticamente por la cantidad y tipo de parámetros

*Nombre técnico*Overloading
*¿Dónde?*Misma clase	
*¿Mismo nombre?*✅ Sí
*¿Mismos parámetros?*❌ No — cambian	
*¿Conflicto?*❌ No	
*Ejemplo*Tus constructores

**SOBREESCRITURA**
Sobreescritura → con @Override para avisarle a Java que estás reemplazando un método del padre.
*¿Es obligatorio el @Override?*
Técnicamente no — el código funciona igual sin él. Pero es una buena práctica porque:
-Si te equivocás en el nombre del método, Java te avisa con error
-Hace el código más legible
-El IDE te ayuda mejor

*Nombre técnico*Overriding
*¿Dónde?*Clase hija hereda de padre
*¿Mismo nombre?*Sí
*¿Mismos parámetros?*Sí — son iguales
*¿Conflicto?*Reemplaza el padre
*Ejemplo*@Override toString()