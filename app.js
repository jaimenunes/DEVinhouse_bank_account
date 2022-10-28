let lista = [];
const formCadastro = document.getElementById("form");
const footer = document.getElementById('footer')



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
  limpaForm(formCadastro)
  createNewform(conta) // passa a variavel como parametro para esta função
}

// Evento disparado ao clicar em enviar no formulário de cadastro
formCadastro.addEventListener("submit", capturarDados);

// Cria novos elementos e o adionam no DOM 
function createNewform(conta){

  const divider = document.createElement('hr')
  const section = document.createElement('section')
  const title = document.createElement('h3')
  const form =  document.createElement('form')
  section.classList.add('center')
  form.id="formTransacaoformTransacao"
  form.innerHTML = `
  <h3>Acesse sua conta</h3>
  <div>
      <label for="">Operação *</label>
      <select id="operacao">
        <option value='1' disabled>Escolha uma operação</option>
        <option value='2'>Saque</option>
        <option value='3'>Depósito</option>
        <option value='4'>Consulta saldo</option>
      </select>
  </div>
  <div>
      <label for="">Valor</label>
      <input type="number" placeholder="a partir de R$ 10" min="10" id='saldo'>
  </div>
  <div>
      <label for="">Conta *</label>
      <input type="number" placeholder="99900">
  </div>
  <div>
      <label for="">Senha</label>
      <input type="password" placeholder="" minlength="8" maxlength="12" name="password">
  </div>
  <div class="btn-form">
      <button type="reset" class="clean" type="button">LIMPAR</button>
      <button type="submit">ENVIAR</button>
  </div>
  `
  title.textContent = `Conta criada com sucesso, seu conta é ${conta.conta}`
  section.append(title)
  section.append(form)
  footer.before(divider)
  footer.before(section)

  const getOption = document.getElementById('operacao')
  const getSaldo= document.getElementById('saldo')
  // verifica se o option selecionado é a consulta e bloquei o campo de valor se for verdadeiro
  getOption.addEventListener('change', ()=>{
    if(getOption.value == 4){
      getSaldo.disabled =true
    }else{
      getSaldo.disabled =false
    }
  })
  // dispara o evento no submit
  form.addEventListener('submit', (event)=>{
    event.preventDefault()
    vericaConta(conta)
    verificaOperacao()
    chameOperacao()
  })
}

function vericaConta(conta){
  console.log(conta)
}
function verificaOperacao(){
  console.log('passou operacao')
}
function chameOperacao(){
  console.log('chamou')
}

function limpaForm(form){
  const elements = Array.from(form.elements)
  elements.filter((items)=> items.tagName == "INPUT").map((input) => input.value = '')
}