let imagensJSON = [];

/* DropDown do botão de categoria */
function abrirDropDown() {
  const abrirDrop = document.getElementById("conteudoDropDown");
  const botao = document.getElementById("inputCat");

  const estaAberto = abrirDrop.style.display === "block"
  abrirDrop.style.display = estaAberto ? "none" : "block";

  if (!estaAberto) {
    botao.style.borderRadius = "18px 18px 0 0 ";
  } else {
    botao.style.borderRadius = "18px"
  }
}
/* Fecahr o Dropdrown clicando na tela */
window.addEventListener('click', function (event) {
  const dropdown = document.getElementById("dropDownCategoria");
  const botao = document.getElementById("inputCat");

  if (!dropdown.contains(event.target)) {
    document.getElementById("conteudoDropDown").style.display = "none";
    botao.style.borderRadius = "18px";
  }
});
/* As bordas debaixo deixando de ter curvatura e somente as de cima possuem do botão de categoria */
function selecionarCategoria(botao) {
  const categoriaEscolhida = botao.textContent;
  const botaoPrincipal = document.getElementById("inputCat");

  document.getElementById("inputCat").textContent = categoriaEscolhida;
  document.getElementById("conteudoDropDown").style.display = "none";

  botaoPrincipal.style.borderRadius = "18px";
}
/* Criar o campo de subtítulo/corpo notícia/imagem complementar */
function adicionarSubtitulo() {
  const bloco = document.getElementById("blocoSubtitulos");

  const grupo = document.createElement("div");
  grupo.className = "grupoSubtitulo";

  const h2Sub = document.createElement("h2");
  h2Sub.textContent = "Subtítulo da Notícia";

  const inputSub = document.createElement("input");
  inputSub.type = "text";
  inputSub.placeholder = "Insira aqui o subtítulo...";
  inputSub.id = "inputInfo";

  const h2Corpo = document.createElement("h2");
  h2Corpo.textContent = "Insira o Corpo da Notícia"

  const inputCorpo = document.createElement("input");
  inputCorpo.type = "text";
  inputCorpo.placeholder = "Insira o corpo da notícia...";
  inputCorpo.id = "inputInfo";

  const h2Img = document.createElement("h2");
  h2Img.textContent = "Insira uma imagem complementar"

  const inputImg = document.createElement("input");
  inputImg.type = "file";
  inputImg.placeholder = "Insira aqui o título...";
  inputImg.accept = "image/*";
  inputImg.name = "Imagem Complementar";
  inputImg.id = "imagemInput";

  const divBtn = document.createElement("div");
  divBtn.className = "container-flex";

  const novoBtn = document.createElement("button");
  novoBtn.textContent = "Adicionar Subtítulo";
  novoBtn.className = "adicionarSub";
  novoBtn.onclick = adicionarSubtitulo;

  grupo.appendChild(h2Sub);
  grupo.appendChild(inputSub);
  grupo.appendChild(h2Corpo);
  grupo.appendChild(inputCorpo);
  grupo.appendChild(h2Img);
  grupo.appendChild(inputImg);
  divBtn.appendChild(novoBtn);
  grupo.appendChild(divBtn);

  bloco.appendChild(grupo);
}