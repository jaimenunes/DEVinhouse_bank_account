let lista = [];
const form = document.getElementById("form");

function checkConta(password, passwordVerify) {
  return password === passwordVerify;
}

function capturarDados(event) {
  event.preventDefault();

  if (
    !checkConta(
      event.target.password.value,
      event.target.password_confirm.value
    )
  ) {
    alert("Senhas informadas não conferem!");
    return;
  }

  const conta = {
    id: new Date().getTime(),
    name: event.target.name.value,
    CPF: parseInt(event.target.CPF.value),
    telefone: event.target.telefone.value,
    senha: event.target.password.value,
    conta: Math.floor(1000 + Math.random() * 9000),
    saldo: 0,
  };

  alert(
    `Parabéns conta criada com sucesso, o número da sua conta é ${conta.conta}`
  );
}
form.addEventListener("submit", capturarDados);
