/**
 * @param String name
 * @return String
 */
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

async function leerReceta()
{
    var prodId = getParameterByName('idR');
    let dataUs ={
        "id_receta":prodId
    }
    let Resultado = await fetchData(BASEURL+'/apis/receta', 'POST', dataUs);
    if(Resultado.resultado==0)
    {
        const nombre = document.querySelector('#nombreReceta');
        nombre.innerHTML='';
        nombre.insertAdjacentHTML("beforeend",Resultado.nombre);
        const ingredientesr=document.querySelector('#ingredientesr');
        Resultado.ingredientesR.forEach((ingrediente, index) => {
            let li = `<p>${ingrediente}</p>`

            ingredientesr.insertAdjacentHTML("beforeend",li);
        });

        const aderezo = document.querySelector('#aderezor');
        aderezo.innerHTML='';
        const aderezol = document.querySelector('#aderezorl');
        aderezol.innerHTML='';
        const preparacionAT = document.querySelector('#PreparacionAT');
        preparacionAT.innerHTML='';
        if( Resultado.ingredientesA.length>0)
        {
            aderezo.insertAdjacentHTML("beforeend","Aderezo");
            Resultado.ingredientesA.forEach((ingrediente, index) => {
                let li = `<p>${ingrediente}</p>`
    
                aderezol.insertAdjacentHTML("beforeend",li);
            });
        preparacionAT.insertAdjacentHTML("beforeend","Aderezo");
           
            
        }
        const nombreR =  document.querySelector('#nombreR');
        nombreR.innerHTML='';
        nombreR.insertAdjacentHTML("beforeend",Resultado.NombreR);
        const preparR =  document.querySelector('#PreparacionR');
        preparR.innerHTML='';
        preparR.insertAdjacentHTML("beforeend",Resultado.preparacionR);
        const preparA =  document.querySelector('#PreparacionA');
        preparA.innerHTML='';
        preparA.insertAdjacentHTML("beforeend",Resultado.preparacionA);
        const imagenM =  document.querySelector('#ImagenMuestra');
        imagenM.innerHTML='';
        let imm = `<img class="muestra"  src="${Resultado.imagen}" alt="${Resultado.nombre}"><br>`
        imagenM.insertAdjacentHTML("beforeend",imm);
        const FavoritoAd =  document.querySelector('#favoritoadd');
        FavoritoAd.innerHTML='';
        let agrf = `<br><li style="color:yellow; cursor:pointer" onclick="AgregarFavorito(${Resultado.id})";> Agregar a favorito </li>`
        FavoritoAd.insertAdjacentHTML("beforeend",agrf);
    }
}
async function AgregarFavorito(idReceta)
{
    let perfil =JSON.parse(localStorage.getItem("logged"));
    //

    const dataUs ={
        "IdUsuario" : perfil.id,
        "IdReceta": idReceta
    }
    
    let Resultado = await fetchData(BASEURL+'/apis/favoritos', 'POST', dataUs);
    if(Resultado.resultado==0)
    {
    Swal.fire({
        title: 'Favorito Agregado!',
        text: Resultado.message,
        icon: 'ok',
        confirmButtonText: 'Cerrar'
        });
    }
}
leerReceta();