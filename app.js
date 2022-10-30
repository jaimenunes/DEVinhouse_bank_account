let listaContas = [];
const formCadastro = document.getElementById("form");
const formOperacao = document.getElementById("formTransacao");
const entrar = document.getElementById("entrar");
const resultadoOperacao = document.getElementById("resultadoOperacao");
const contaCheck = document.getElementById("contaCheck");
const spanResult = document.getElementById("closeResult");
const spanForm = document.getElementById("closeForm");
contaCheck;
function checkConta(password, passwordVerify) {
  return password === passwordVerify;
}

// Pega os valores dos campos de inputs a partir do evento passado como parametro
// Coloca os valores em uma variavel no formato de objeto
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
  listaContas.push(conta);
  alert(`Conta criada com sucesso, o número da sua conta é: ${conta.conta}`);
  console.log(listaContas);
  limpaForm(formCadastro);
  getOperacao(conta); // passa a variavel como parametro para esta função
}

// Evento disparado ao clicar em enviar no formulário de cadastro
formCadastro.addEventListener("submit", capturarDados);
entrar.addEventListener("click", getOperacao);

function getOperacao() {
  formOperacao.style.display = "block";
  const getOption = document.getElementById("operacao");
  const getSaldo = document.getElementById("saldo");
  // verifica se o option selecionado é a consulta e bloquei o campo de valor se for verdadeiro
  getOption.addEventListener("change", () => {
    if (getOption.value == 4) {
      getSaldo.disabled = true;
    } else {
      getSaldo.disabled = false;
    }
  });

  // dispara o evento no submit
  formOperacao.addEventListener("submit", efetuarOperacao);
}

function obterConta(conta) {
  const contaCliente = listaContas.find((c) => conta === conta);
  return contaCliente;
}

const validarConta = (conta, senha) => {
  const contaCliente = obterConta(conta);
  return contaCliente && contaCliente.senha === senha ? true : false;
};

const consultarSaldo = (conta) => {
  const contaCliente = obterConta(conta);
  contaCheck.style.display = "block";
  resultadoOperacao.innerHTML = `O seu saldo atual é de: R$ ${contaCliente.saldo}`;
  return contaCliente.saldo;
};

const depositar = (conta, valor) => {
  if (validarValor(valor)) {
    const contaCliente = { ...obterConta(conta) };
    contaCliente.saldo += valor;

    const contasAtualizadas = listaContas.filter((c) => c.conta !== conta);
    contasAtualizadas.push(contaCliente);
    listaContas = contasAtualizadas;
    contaCheck.style.display = "block";
    resultadoOperacao.innerHTML = `Operação realizada com sucesso! Saldo atual é de: R$ ${contaCliente.saldo}`;
  } else {
    alert("Valor informado incorretamente");
  }
};

const sacar = (conta, valor) => {
  if (!validarValor(valor)) {
    alert("Valor informado incorretamente");
    return;
  }
  if (consultarSaldo(conta) < valor) {
    contaCheck.style.display = "block";
    resultadoOperacao.innerHTML = `Saldo insuficiente`;
    return;
  } else {
    const contaCliente = { ...obterConta(conta) };
    contaCliente.saldo -= valor;

    const contasAtualizadas = listaContas.filter((c) => c.conta !== conta);
    contasAtualizadas.push(contaCliente);
    listaContas = contasAtualizadas;
    contaCheck.style.display = "block";
    resultadoOperacao.innerHTML = `Operação realizada com sucesso! Saldo atual é de: R$ ${contaCliente.saldo}`;
  }
};

const validarValor = (valor) => {
  return !isNaN(valor) && valor > 0;
};

const efetuarOperacao = (evento) => {
  evento.preventDefault();
  const conta = parseInt(evento.target.conta.value);
  const senha = evento.target.senha.value;
  const valor = parseInt(evento.target.valor.value);
  const contaValida = validarConta(conta, senha);

  if (contaValida) {
    console.log(evento.target.operacao.value);
    switch (evento.target.operacao.value) {
      case "2":
        sacar(conta, valor);
        break;
      case "3":
        depositar(conta, valor);
        break;
      case "4":
        consultarSaldo(conta);
        break;
      default:
        alert("Operação inválida");
    }
  } else {
    alert("Conta ou senha inválida");
  }
};

function limpaForm(form) {
  const elements = Array.from(form.elements);
  elements
    .filter((items) => items.tagName == "INPUT")
    .map((input) => (input.value = ""));
}
spanForm.addEventListener("click", () => {
  formOperacao.style.display = "none";
});

spanResult.addEventListener("click", () => {
  contaCheck.style.display = "none";
});

window.onclick = function (event) {
  if (event.target == contaCheck) {
    contaCheck.style.display = "none";
  }
  if (event.target == formOperacao) {
    formOperacao.style.display = "none";
  }
};
