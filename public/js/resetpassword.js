async function renovar() {
  event.preventDefault();
  
  const password = document.getElementById('password').value;
  const resetar = document.getElementById('resetar')
  var token = location.href.split("=").pop();
  resetar.disabled = true

  document.getElementById('campos').disabled = false
  await axios.put('/passwords', { "token": `${token}`,"password":`${password}` })
    .then(function (response) {
      let timerInterval
      Swal.fire({

        position: 'center',
        icon: 'success',
        title: 'Senha alterada com sucesso !',
        text:'Redirecionando para a página de login...',
        showConfirmButton: false,
        timer: 5000

      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace("home");
        }
      })
    })
    .catch(function (error) {
      Swal.fire({

        position: 'center',
        icon: 'error',
        title: 'Problema com o token !',
        text:'Favor, checar o link no Email...',
        showConfirmButton: false,
        timer: 5000

      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.replace("home");
        }
      })
      document.getElementById("form").reset();
      resetar.disabled = false
    });
}
