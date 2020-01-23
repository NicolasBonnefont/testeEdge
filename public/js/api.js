const token = sessionStorage.getItem('sessao')
export const config = {
  headers: { 
    Authorization: 'Bearer ' + token
  }
}
