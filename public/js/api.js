const token = sessionStorage.getItem('sessao')
const config = {
  headers: { 
    Authorization: 'Bearer ' + token,
    'Content-Type': 'multipart/form-data'
  }
}
