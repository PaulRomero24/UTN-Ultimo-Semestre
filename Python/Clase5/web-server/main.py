import store
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

app = FastAPI() # Primera instancia

#Primera Ruta
@app.get("/")
def get_list():
    return[1,2,3]

#Segunda Ruta
@app.get("/Contact",response_class=HTMLResponse)
def get_list():
    return """
        <h1>Soy un sitio web </h1>
        <p>Soy un parrafo </p>
        """

def run():
    store.get_razas()

if __name__ == '__main__':
    run()