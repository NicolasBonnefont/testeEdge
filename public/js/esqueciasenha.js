
  //ACESSA A ROTA QUE ENVIA POR EMAIL O TOKEN PARA RESETAR O ACESSO
async function recuperar() {
  event.preventDefault();
  
  const email = document.getElementById('email').value;
  
  document.getElementById('campos').disabled = true

  await axios.post('/passwords', { "email": `${email}` })
    .then(function (response) {
      let timerInterval
      Swal.fire({

        position: 'center',
        icon: 'success',
        title: 'Token de Recuperação enviado!',
        text: ' Favor, verificar sua caixa de Entrada.',
        footer: email,
        showConfirmButton: false,
        timer: 6000

      }).then((result) => {
        
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace("home");
        }
      })     

      
    })
    .catch(function (error) {
      let timerInterval
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email informado não cadastrado !',
        showConfirmButton: false,
        timer: 2000

      }).then((result) => {
        
        if (result.dismiss === Swal.DismissReason.timer) {
         
        }
      }) 
      document.getElementById("form").reset();
      document.getElementById('campos').disabled = false
    });
}

