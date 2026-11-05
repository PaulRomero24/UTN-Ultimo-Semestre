## Tipos FLOAT

import math


a = 3.0

#Constructor de tipo float -> puede recibir INT y STRING
entero = float(10)

cadena = float("10")
print(f"entero = {entero} y cadena = {cadena}")


#VALORES EXPONENCIALES
exponencial_pos = 3e5
print(f"Exponencial positivo : {exponencial_pos:.2f}")#El 2f es la cantidad de numeros que muestre de "float"

exponencial_neg = 3e-5
print(f"Exponencial negativo : {exponencial_neg}")


#VALORES INFINITOS

infinito_positivo = float("inf")
print(f"Infinito positivo : {infinito_positivo}")
print(f"Es infinito? {math.isinf(infinito_positivo)}")

infinito_negativo = float("-inf")
print(f"Infinito negativo : {infinito_negativo}")
print(f"Es infinito? {math.isfi(infinito_negativo)}")