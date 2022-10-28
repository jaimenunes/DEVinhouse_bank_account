let lista = [];
const form = document.getElementById("form");
const footer = document.getElementById('footer')
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

  createNewform(conta)
}
form.addEventListener("submit", capturarDados);


function createNewform(conta){
  const divider = document.createElement('hr')
  const section = document.createElement('section')
  const title = document.createElement('h3')
  const form =  document.createElement('form')
  section.classList.add('center')
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
      <label for="">Senha (min. 8 caracteres) *</label>
      <input type="password" placeholder="" minlength="8" maxlength="12" name="password">
  </div>
  <div class="btn-form">
      <input value="LIMPAR" id="limpar" type="button">
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
  getOption.addEventListener('change', ()=>{
    if(getOption.value == 2){
      getSaldo.disabled =true
    }else{
      getSaldo.disabled =false
    }
  })
}