//FUNCION1

function doRotar(idOut, idIn, stay1, stay2, stay3, hide1, hide2, hide3)
{
    //Rotar(idOut, idIn);
    var sh = document.getElementById(idOut);
    var sh2 = document.getElementById(idIn);
    sh2.style.visibility="hidden";
    sh.style.visibility="visible";
    Rotar(sh,sh2);

var sh3= document.getElementById(stay1);
var sh4= document.getElementById(stay2);
var sh5= document.getElementById(stay3);

var sh6= document.getElementById(hide1);
var sh7= document.getElementById(hide2);
var sh8= document.getElementById(hide3);

if(sh6.style.visibility!='visible')
{
    sh3.style.visibility="hidden";
    sh6.style.visibility="visible";
    Rotar(sh6, sh3);
}

if(sh7.style.visibility!='visible')
{
    sh4.style.visibility="hidden";
    sh7.style.visibility="visible";
    Rotar(sh7, sh4);
}

if(sh8.style.visibility!='visible')
{
    sh5.style.visibility="hidden";
    sh8.style.visibility="visible";
    Rotar(sh8, sh5);
}

}

function Rotar(shh, shb)
{
    shh.style.animation="rotacionSalida 0.9s 1 forwards";
    shb.style.animation="0.9s rotacionEntrada 0.9s 1 forwards";

}


//FUNCION2

function showPopPup(pagina)
{

 var elemento = document.getElementById('card');
 
 elemento.style.visibility='visible';
FetchPage(pagina);
 
}
function closePopUp()
{
 var elemento = document.getElementById('card');
 
 elemento.style.visibility='hidden';

}
function FetchPage(pagina) //Funcion que lee la página y la devuelve su contenido
{
  
  var data = fetch(pagina)
  .then(response => {
   
    return response.text()
    
  })
  .then(data => {
    var elemento2 = document.getElementById('popup');
    elemento2.innerHTML=data;
});
}


//Seccion Registro
class Registro
{
    constructor(Usuario,Pass,Correo)
    {
        this.usuario=Usuario;
        this.correo=Correo;
        this.password=Pass;
    }

}
class Login
{
    constructor(usuario)
    {
        this.usuario=usuario;
        
    }

}

function validarFormulario()
 {
    let formu = document.getElementById("registroForm");
    //formu.addEventListener('submit', validaFormulario);
    //formu.preventDefault();

    const User = document.querySelector("#User");
    const Pass = document.querySelector("#Password");
    //const chkpol = document.querySelector("#aceptPol");
    const email = document.querySelector("#Mail");
    //const Correo = document.querySelector("#Correo");
    var validation = true;

        if(User.value.length < 3 || User.value.length > 20)
            {
                alert("Tu usuario debe tener entre 3 y 20 caracteres");
                validation = false;
                return;
            }
        if(Pass.value.length < 6 || Pass.value.length > 20)
        {
            alert("Tu Contraseña debe tener entre 6 y 20 caracteres");
            validation = false;
           return;
        }

         /*if (chkpol.checked == false) {
         alert("Debe aceptar las políticas de privacidad para registrarse");
         validation = false;
         return;
          }*/

    if(validation==true){
       // formu.submit();
       tryReg(User.value, Pass.value, email.value );
       alert("Te registraste exitosamente, inicia sesion")
       location.href="/"
    } else{

        return false;
    }

}
/* La siguiente funcion guarda los datos de registro de la persona para usarlo como si se guardara en la bd,
    este método solo será utilizado para guardar la info de registro a modo de usar el login y se borrará cuando
    se programe el backend */
    
function tryReg(usuario, pass, email)
{
    const Registrodat= new Registro(usuario, pass, email);
savedata(Registrodat);
}
function savedata(reg)
{
    localStorage.setItem("Registro",JSON.stringify(reg));
}
function loadData(usr,pass)
{
    let rk = localStorage.getItem("Registro");
    rg = JSON.parse(rk);
    if(usr==rg.usuario)
        {
        if(pass==rg.password)
            {
            let lg = new Login(rg.usuario);
        return lg;
            }
        }
        return new Login("");
    /*
    alert (rg.usuario);
    alert (rg.password);
    alert (rg.correo);
    */
}
function tryIs()
{
    const User = document.querySelector("#lgUser");
    const Pass = document.querySelector("#lgPass");
    
    let valida = true;
    if(User.value.length < 3)
        {
               alert("Usuario o contraseña incorrectos!");
               valida=false;
               return; 
        }
     if(Pass.value.length < 6)
        {
               alert("Usuario o contraseña incorrectos!");
               valida=false;
               return; 
        }
    let loginData=loadData(User.value,Pass.value);
    if(loginData.usuario=="")
        {
            alert("Usuario o contraseña incorrectos!");
            valida=false;
            return; 
        }
        if(valida==true)
            {
                alert("Bienvenidx " + loginData.usuario + "\nAhora se te dirigirá a la página principal!");
                let lg= new Login(loginData.usuario);
                savelogi(lg);
                location.href="/";
                //aca va el submit, si hubiera uno en backend (xD)
            }

}

function savelogi(User){
    localStorage.setItem("logged",JSON.stringify(User));
}

function loadlog(){
    let rk = localStorage.getItem("logged");
    var lg = JSON.parse(rk);
    if(lg.usuario=="")
        {
    return;
        }
        else{
          CrearSesion(lg.usuario)
        }
        return new Login("");
}
function CrearSesion(usuario)
{
    let ident = document.getElementById('identificar');
    ident.innerHTML = "<li class='userdata' id='userdata' onclick='CerrarSesion();'> &nbsp &nbsp &nbsp Cerrar Sesion </li> <li class='userdata'> Bienvenidx " + usuario + "</li> ";
}
loadlog();

function CerrarSesion(){
    localStorage.setItem("logged","");
    location.href="/";
}



