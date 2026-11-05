    #DAR FORMATO STR
    
nombre = "ariel"
edad = 28
persona = ("Carla","Gomez",5000.00)
diccionario = {"Nombre": "Juan", "Edad" : 23, "Sueldo":34000.00}

####ESTE SISTEMA YA NO SE USA
print("FORMATO ANTIGUO")
formato_antiguo = "Mi nombre es %s y tengo %d años" %(nombre,edad)
print(formato_antiguo)
# "%" : Esto es un  marcador de posición en una cadena de texto se puede asignar con s(String),d(Decimal),i(Integer),f(Float) y asi para los tipos de datos

#Tupla
formato_antiguo1 = "Hola %s %s, tu sueldo es %.2f " 
print(formato_antiguo1 %persona)

#DICCIONARIO
formato_antiguo2 = "Nombre : %(Nombre)s , Edad: %(Edad)i , Sueldo: %(Sueldo).2f \n"
print(formato_antiguo2 % diccionario)



####ESTE SISTEMA es Útil si el texto base viene de un archivo externo.
print("FORMATO PARA ARCHIVOS EXTERNOS")
# Las llaves vacías respetan el orden posicional de .format()
mensaje = "Hola {}, tienes {} años.".format(nombre, edad)
print(mensaje) 

#Tuplas
#El método .format() tiene un truco genial.
#Si pones un asterisco * antes del nombre de la tupla, Python la "desempaqueta".
# Esto significa que toma cada elemento de la tupla 
# y lo mete en las llaves {} en estricto orden posicional:
mensaje1 = "Hola {} {}, tu sueldo es {}".format(*persona)
print(mensaje1)

#DICCIONARIO
#De la misma forma que la tupla, se puede hacer con un **
mensaje2 ="Nombre: {dic[Nombre]}, Edad: {dic[Edad]}, Sueldo: {dic[Sueldo]:.2f} \n".format(dic=diccionario)
print(mensaje2)


desempaquetado = "Agregando ** antes :Nombre : {Nombre} , Edad: {Edad} , Sueldo: {Sueldo:.2f} \n"
print(desempaquetado.format(**diccionario))


####ESTE SE ESTA USANDO
print("FORMATO MODERNO")
# Es el más rápido de procesar y el más legible.(f-strings)
f_string = f"Mi nombre es {nombre} y tengo {edad} años"
print(f_string)

#Tupla
#Usamos el indice de la tupla 
f_string1 = f"Hola {persona[0]} {persona[1]}, tu sueldo es {persona[2]}"
print(f_string1)

#DICCIONARIO
f_string2 = f"Hola {diccionario['Nombre']}, tu edad es: {diccionario['Edad']} y tu sueldo es de: {diccionario['Sueldo']:.2f}"
print(f_string2)