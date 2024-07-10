async function CargarFavoritos(){
    let perfil =JSON.parse(localStorage.getItem("logged"));
    //
    const dataUs ={
        "IdUsuario" : perfil.id
    }

    let Resultado = await fetchData(BASEURL+'/apis/favoritos/get', 'POST', dataUs);
        const tableFavoritos = document.querySelector('#list-table-favs tbody');
        tableFavoritos.innerHTML='';
        Resultado.forEach((favorito, index) => {
        let tr = `<tr>
        <td>${favorito.nombre}</td>

        <td>
        <img src="${favorito.imagen}" width="30%">
        </td>
        <td>
        <button class="btn-cac" onclick='deleteFavorito(${favorito.id},${perfil.id})'><i class="fa fa-trash" ></button></i>
        </td>
        </tr>`;
        tableFavoritos.insertAdjacentHTML("beforeend",tr);
        });
}

async function deleteFavorito(id_receta, id_usuario)
{
    
    const dataUs ={
        "IdReceta" : id_receta,
        "IdUsuario" : id_usuario
    }
    let Resultado = await fetchData(BASEURL+'/apis/favoritos', 'DELETE', dataUs);
    if(Resultado.resultado != -1)
    {
    Swal.fire({
        title: 'Favorito Borrado!',
        text: Resultado.message,
        icon: 'ok',
        confirmButtonText: 'Cerrar'
        });

        CargarFavoritos();
    }
}
CargarFavoritos();
async function CargarUsuario(){
    let perfil =JSON.parse(localStorage.getItem("logged"));
    
        const tableUsuario = document.querySelector('#list-table-usr tbody');
        tableUsuario.innerHTML='';
        
        let tr = `<tr>
        <td>${perfil.usuario}</td>

        <td>${perfil.correo}</td>
       `
        tableUsuario.insertAdjacentHTML("beforeend",tr);
 
}

CargarUsuario();
async function UpdateCorreo()
{
    let perfil =JSON.parse(localStorage.getItem("logged"));
    const correo =  document.querySelector('#nuevoCorreo').value;
    if(correo.lenght < 5)
    {
        alert("Ingrese un correo valido!");
        return;
    }
    let dataus = {
        "IdUsuario": perfil.id,
        "Correo": correo
    }
    let Resultado = await fetchData(BASEURL+'/apis/usuario/update', 'POST', dataus);
    if(Resultado.resultado != -1)
        {
        Swal.fire({
            title: 'Correo Actualizado!',
            text: Resultado.message,
            icon: 'ok',
            confirmButtonText: 'Cerrar'
            });
    
            perfil.correo = correo;
            localStorage.setItem("logged", JSON.stringify(perfil));
            CargarUsuario();
        }
}