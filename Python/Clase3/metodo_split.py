#help(str.split)

cursos = "Python Java C++ JavaScript"
lista_cursos = cursos.split()
print(f"Lista de cursos: {lista_cursos}; tipo: {type(lista_cursos)}")

cursos_separados_por_coma = "Python,Java,C++,JavaScript"
lista_cursos_coma = cursos_separados_por_coma.split(",", 2)#Especificamos el separador "," y el maximo de divisiones 2
print(f"Lista de cursos separados por coma: {lista_cursos_coma}; tipo: {type(lista_cursos_coma)}")
print(len(lista_cursos_coma))

"""
El método split() se utiliza para dividir una cadena en una lista de subcadenas, utilizando un separador especificado. 
Si no se especifica un separador, se utilizará el espacio en blanco como separador por defecto.
"""