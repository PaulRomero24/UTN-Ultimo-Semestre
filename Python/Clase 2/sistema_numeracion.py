## SISTEMAS DE NUMERACION

#Sistema DECIMAL
#Por qué se usa: Es la base estándar que usamos los humanos en la vida cotidiana (derivada de contar con 10 dedos).
#Usos clave:
#Es la capa de abstracción final para interfaces de usuario, cálculos contables, precios y cualquier dato pensado para lectura de personas.

# {0,1,2,3,4,5,6,7,8,9}

decimal= 10
print(f"Sistema decimal {decimal}")

#Sistema BINARIO
#Por qué se usa: Es el idioma nativo de la electrónica. 
#Los circuitos digitales operan mediante transistores que solo reconocen dos estados físicos: con voltaje (1 / encendido) o sin voltaje (0 / apagado).
#Usos clave:
# Álgebra booleana, operaciones a nivel de compuertas lógicas, máscaras de red IP (subredes) y manipulación directa de bits (bitwise operations).

# {0,1}

binario= 0b1010
print(f"Sistema binario {binario}")

##SISTEMA OCTAL
#Por qué se usa: Cada dígito octal agrupa exactamente 3 bits. Históricamente fue muy popular en arquitecturas de computadoras de 12, 24 o 36 bits (múltiplos de 3).
#Usos clave: 
# Su uso más común hoy en día es la gestión de permisos en sistemas Unix/Linux (chmod 755, donde cada dígito del 0 al 7 representa combinaciones de lectura 4,
# escritura 2 y ejecución 1).

# {0,1,2,3,4,5,6,7}

octal= 0o12
print(f"Sistema Octal {octal}")

##SISTEMA HEXADECIMAL
#Por qué se usa: Sirve como una "abreviatura visual" del binario para los programadores. Un solo dígito hexadecimal representa exactamente un bloque de 4 bits (nibble). Escribir 0xFF es mucho más legible y menos propenso a errores humanos que escribir 11111111.
#Usos clave:
#Direcciones de memoria RAM (punteros y volcados de memoria).
#Códigos de color en diseño web y CSS (#FFFFFF, #FF0000).
#Direcciones físicas de red (direcciones MAC) y direcciones IPv6.
#Inspección de archivos binarios en editores hexadecimales.

# {0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F}

hexadecimal = 0xA
print(f"Sistema Hexadecimal {hexadecimal}")



#USO DE LOS SISTEMAS EN BASE
baseD=int("23",10)
print(f"Uso de base numerica en Decimal {baseD}")

baseB=int("10111",2)
print(f"Uso de la base numerica Binaria {baseB}")

baseO=int("27",8)
print(f"Uso de la base numerica Octal {baseO}") 

baseH=int("17",16)
print(f"Uso de la base numerica Hexadecimal {baseH}")


##Sistema Inverso. Pasar un ENTERO y convertirlo a los diferentes sistemas
numero = 23

# Devuelve strings con prefijo
binario = bin(numero)        # '0b10111'
octal = oct(numero)          # '0o27'
hexadecimal = hex(numero)    # '0x17'

print(f"Sistema Binario = {binario}")      # Salida: 0b10111
print(f"Sistema Octal = {octal}")        # Salida: 0o27
print(f"Sistema HexaDecimal = {hexadecimal}")  # Salida: 0x17

