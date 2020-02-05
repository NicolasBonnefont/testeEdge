function carregaCards() {
  var temp = document.getElementsByTagName("template")[0];
  var clon = temp.content.cloneNode(true);
  document.body.appendChild(clon);
  console.log(temp)
}
carregaCards()