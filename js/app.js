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
  document.querySelectorAll(".adicionarSub").forEach(botao => botao.remove());
  const bloco = document.getElementById("blocoSubtitulos");

  const grupo = document.createElement("div");
  grupo.className = "grupoSubtitulo";

  const h2Sub = document.createElement("h2");
  h2Sub.textContent = "Subtítulo da Notícia";

  const inputSub = document.createElement("input");
  inputSub.type = "text";
  inputSub.placeholder = "Insira aqui o subtítulo...";
  inputSub.id = "inputSubNovo";

  const h2Corpo = document.createElement("h2");
  h2Corpo.textContent = "Insira o Corpo da Notícia"

  const inputCorpo = document.createElement("input");
  inputCorpo.type = "text";
  inputCorpo.placeholder = "Insira o corpo da notícia...";
  inputCorpo.id = "inputCorpoSub";

  const h2Img = document.createElement("h2");
  h2Img.textContent = "Insira uma imagem complementar"

  const inputImg = document.createElement("input");
  inputImg.type = "file";
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

/* Função para criar noticia */
function criarNoticia() {
  const inputImagem = document.getElementById("imagemBanner");
  const arquivo = inputImagem.files[0];

  if (arquivo) {
    const leitor = new FileReader();

    leitor.onload = async function (evento) {
      const imagemBase64 = evento.target.result;
      let htmlTexto = `<p>${document.getElementById("inputCorpo").value}</p><br>`;

      const grupos = document.querySelectorAll("#blocoSubtitulos .grupoSubtitulo");

      for (let grupo of grupos) {
        const subtitulo = grupo.querySelector("#inputSubNovo")?.value;
        const corpo = grupo.querySelector("#inputCorpoSub")?.value;
        const imagemInput = grupo.querySelector("#imagemInput");

        if (subtitulo) {
          htmlTexto += `<h2>${subtitulo}</h2>`;
        }

        if (corpo) {
          htmlTexto += `<p>${corpo}</p><br>`;
        }

        if (imagemInput && imagemInput.files.length > 0) {
          const imgFile = imagemInput.files[0];
          const base64 = await lerImagemComoBase64(imgFile);
          htmlTexto += `<img src="${base64}" style="max-width:100%;"/><br>`;
        }
      }

      const noticiasSalvas = JSON.parse(localStorage.getItem("noticias") || "[]");

      const noticia = {
        id: (noticiasSalvas.length + 1),
        titulo: document.getElementById("inputTitulo").value,
        resumo: document.getElementById("inputResumo").value,
        texto: htmlTexto,
        data: document.getElementById("inputData").value,
        autor: document.getElementById("inputAutor").value,
        banner: imagemBase64,
        tipo: document.getElementById("inputCat").textContent.trim(),
        iframe: document.getElementById("inputIframe").value
      };


      alert("Notícia criada com sucesso!");

      noticiasSalvas.push(noticia);
      localStorage.setItem("noticias", JSON.stringify(noticiasSalvas));
    };

    leitor.readAsDataURL(arquivo);
  } else {
    alert("Por favor, selecione uma imagem de banner.");
  }
}

/* Carregar imagem */
function lerImagemComoBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

window.onload = () => {
  if (!localStorage.getItem("noticias")) {
    let todasNoticias = [];

    for (let categoria in itens) {
      todasNoticias = todasNoticias.concat(itens[categoria]);
    }

    localStorage.setItem("noticias", JSON.stringify(todasNoticias));
  }
  const btnEnviar = document.getElementById("btnEnviar");
  if (btnEnviar) {
    btnEnviar.addEventListener("click", criarNoticia);
  }
};

/* Ler no LocalStorage */
function carregarNoticiasLocalStorage() {
  return JSON.parse(localStorage.getItem("noticias") || "[]");
}


