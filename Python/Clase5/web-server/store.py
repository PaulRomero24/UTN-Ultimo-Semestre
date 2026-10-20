import requests

def get_razas():
    r = requests.get('https://dog.ceo/api/breeds/list/all')
    print(r.status_code)
    #print(r.text)
    #print(type(r.text))
    razas = r.json()#Diccionario
    for nombre, subrazas in razas["message"].items():
        print(f"Raza: {nombre} — Subrazas: {subrazas}")