async function login(){

let user=document.getElementById("user").value;
let pass=document.getElementById("pass").value;

let r=await fetch("/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({user,pass})
});

let data=await r.json();

if(!data.ok){

alert("error login");
return;

}

localStorage.setItem("user",data.user);

window.location="panel.html";

}

function generar(){

let serial=document.getElementById("serial").value;

fetch("/generar",{

method:"POST",

headers:{"Content-Type":"application/json"},

body:JSON.stringify({
user:localStorage.getItem("user"),
serial:serial
})

})

.then(r=>r.json())

.then(data=>{

if(!data.ok){

alert(data.msg);
return;

}

alert("Clave: "+data.clave);

});

}