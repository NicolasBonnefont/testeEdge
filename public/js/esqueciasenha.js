
  //ACESSA A ROTA QUE ENVIA POR EMAIL O TOKEN PARA RESETAR O ACESSO
async function recuperar() {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  const progresso = document.getElementById('progresso')
  //progresso.className="progress"

  await axios.post('/passwords', { "email": `${email}` })
    .then(function (response) {
      console.log(response.data);
      if (response.status === 200) {
        //progresso.className=""
        alert("Token de Recuperação enviado ao email : " + email + '. Favor, verificar sua caixa de Entrada.');
        window.location.replace("resetpassword");
      }
    })
    .catch(function (error) {
     //progresso.className = ""
      console.log(error);
      alert('Email não existe !', error);
      document.getElementById("form").reset();
    });
}

