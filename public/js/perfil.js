function novaImg(){

var data = sessionStorage.getItem("user")
const u = JSON.parse(data)
document.getElementById("imgPerfil").src = u.url
document.getElementById("nomePerfil").innerHTML = u.name
document.getElementById("cargoPerfil").innerHTML = u.cargo
document.getElementById("emailPerfil").innerHTML = u.email


}



novaImg()