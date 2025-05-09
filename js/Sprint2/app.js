let imagensJSON = [];

function enviarImagem() {
  const input = document.getElementById("imagemInput");
  const file = input.files[0];

  if (!file) {
    alert("Selecione uma imagem primeiro!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const imagemBase64 = e.target.result;

    const novaImagem = {
      nome: file.name,
      tipo: file.type,
      conteudo: imagemBase64,
    };

    imagensJSON.push(novaImagem);

    console.log("Imagem adicionada ao JSON:", novaImagem);
    alert("Imagem adicionada ao JSON com sucesso! 🎉");
  };

  reader.readAsDataURL(file);
}