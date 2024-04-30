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



