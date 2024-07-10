const BASEURL = 'http://127.0.0.1:5000';
/**
* Función para realizar una petición fetch con JSON.
* @param {string} url - La URL a la que se realizará la petición.
* @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
* @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
* @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
*/
async function fetchData(url, method, data = null) {
const options = {
method: method,
headers: {
'Content-Type': 'application/json',
},
body: data ? JSON.stringify(data) : null, // Si hay datos, los convierte a JSON y los incluye en el cuerpo
};
try {
const response = await fetch(url, options); // Realiza la petición fetch
if (!response.ok) {
throw new Error(`Error: ${response.statusText}`);
}
return await response.json(); // Devuelve la respuesta en formato JSON
} catch (error) {
console.error('Fetch error:', error);
alert('An error occurred while fetching data. Please try again.');
let err_resp= {
    "resultado": "-1"
}
return err_resp;
}
}

let Fcategorias=[];
function crearEjecucionFrente(allDatos, actual)
{
 let data = "'" + allDatos[actual].idFrente + "', '" + allDatos[actual].idDorso + "' "
 let otroDatoFrente ="";
 let otroDatoDorso ="";
 for(j = 0; j < allDatos.length; j++)
 {
    if(j != actual )
    {
        otroDatoFrente = otroDatoFrente + ", '" + allDatos[j].idFrente + "' ";
        otroDatoDorso = otroDatoDorso + ", '" + allDatos[j].idDorso + "' ";
    }
 }
 return data + otroDatoFrente + otroDatoDorso;
}
function crearEjecucionDorso(allDatos, actual)
{
 let data = "'" + allDatos[actual].idDorso + "', '" + allDatos[actual].idFrente + "', "
 let otroDatoFrente ="";
 let otroDatoDorso ="";
 for(j = 0; j < allDatos.length; j++)
 {
    if(j != actual )
    {
        otroDatoFrente = otroDatoFrente + " '" + allDatos[j].idFrente + "' ";
        otroDatoDorso = otroDatoDorso + " '" + allDatos[j].idDorso + "' ";
    }
 }
 return data + otroDatoFrente + otroDatoDorso;
}
async function ListaComidas(idCategoria)
{
    const cate =
    {
        "id_categoria": idCategoria
    }
    let comidas = await fetchData(BASEURL+'/apis/categoriasr', 'POST', cate);
    return comidas;
    /*
    datos.idFrente
    datos.idFondo
    datos
    */
}
function getRecetas(listas)
{
    let listaR = "";
            for(j=0; j <listas.length; j++)
            {
                lista = `<a href="Recetas.html?idR=${listas[j].id}"> ${listas[j].nombre}</a></br>`;
                listaR = listaR+ lista;
            }
            
    return listaR;
}
async function showCategorias(){
    // let categs = await fetchData(BASEURL+'/apis/categorias', 'GET');
     let divMenus = document.querySelector('#menus');
     
     for(i=0; i < Fcategorias.length; i++)
     {
       let ejef = crearEjecucionFrente(Fcategorias,i);
       let ejed = crearEjecucionDorso(Fcategorias,i);
        let lstcom = await ListaComidas(Fcategorias[i].id);
        
        let rst=getRecetas(lstcom);
        let div = `<div class="cnt">
        <div id="${Fcategorias[i].idFrente}" class="frente" onclick="doRotar(${ejef})"> <h2>${Fcategorias[i].nombre}</h2> <br> <img src=".${Fcategorias[i].imagen}" alt="${Fcategorias[i].idFrente}"> </div>
        <div id="${Fcategorias[i].idDorso}" class="dorso padt5" onclick="doRotar(${ejed})"> <h2>${Fcategorias[i].nombre}</h2>
        ${rst}
        </div>
        `
        divMenus.insertAdjacentHTML("beforeend",div);
      
     }

     }
    

async function getCategorias()
{
    let categs = await fetchData(BASEURL+'/apis/categorias', 'GET');
    Fcategorias=categs;
    
    showCategorias();
}
getCategorias();
class LoginD
{
    constructor(usuario, resultado)
    {
        this.usuario=usuario;
        this.result= resultado;
        
    }

}

async function IniciarSesion(Usuario, passw)
{
    const datos = {
        "usuario": Usuario,
        "passw": passw 
    }
    let Resultado = await fetchData(BASEURL+'/apis/usuario/login', 'POST', datos);
    if(Resultado.resultado == -1)
    {
        Swal.fire({
            title: 'Error!',
            text: 'Nombre de usuario o contraseña incorrectos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
            });
   let usr=LoginD("","-1")
   localStorage.setItem("logged",JSON.stringify(usr));
            return usr;
            // Crea un objeto con los datos de la pel
    }
        //let usr=LoginD(Resultado.usuario,Resultado.resultado)
        localStorage.setItem("logged",JSON.stringify(Resultado));
        return Resultado;
    

}
async function Registrarse(Usuario, passw, Correo)
{
    const datos = {
        "usuario": Usuario,
        "passw": passw,
        "correo":Correo
    }
    let Resultado = await fetchData(BASEURL+'/apis/usuario/registro', 'POST', datos);
    if(Resultado.resultado == -1)
    {
        Swal.fire({
            title: 'Error!',
            text: Resultado.mensaje,
            icon: 'error',
            confirmButtonText: 'Cerrar'
            });
            return false;
    }else{
        Swal.fire({
            title: 'Registro Satisfactorio!',
            text: Resultado.mensaje,
            icon: 'susess',
            confirmButtonText: 'Cerrar'
            });
            return true;
    }
}