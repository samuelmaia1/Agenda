const form = document.querySelector('#form')
const inputNome = form.querySelector('#inputNome')
const inputContato = form.querySelector('#inputContato')
const botaoAdd = form.querySelector('#add-botao')
const lista = document.querySelector('#lista')

let listaContatos = []

botaoAdd.addEventListener('click', function(e){
    e.preventDefault()
    const contato = criaContato()
    const item = setContato(contato)
    lista.appendChild(item)
    limpaImput()
    salvaLista()
})

document.addEventListener('click', function(e){
    const elemento = e.target
    if (elemento.classList.contains('excluir')){
        const div = criaDivConfirmacao()
        const elementoPai = elemento.parentElement
        elementoPai.appendChild(div)
    }
})

document.addEventListener('click', function(e){
    const elemento = e.target
    if (elemento.classList.contains('botao-sim')){
        const divPai = elemento.parentElement
        divPai.parentElement.remove()
    }
    if (elemento.classList.contains('botao-nao')){
        elemento.parentElement.remove()
    }
    salvaLista()
})

document.addEventListener('click', function(e){
    const elemento = e.target
    if (elemento.classList.contains('editar')){
        const formEdicao = criaFormEdicao()
        const elementoPai = elemento.parentElement
        elementoPai.appendChild(formEdicao)
    }
})

document.addEventListener('click', function(e){
    e.preventDefault()
    const elemento = e.target
    if (elemento.classList.contains('salvar')){
       editaContato()
    }
})

function criaContato(){
    if (!inputNome.value){
        alert('Favor preencher o campo "Nome"')
        return
    }
    if (!inputContato.value){
        alert('Favor preencher o campo "Contato"')
        return
    }

    const contato = {
        nome: inputNome.value,
        contato: inputContato.value 
    }

    listaContatos.push(contato)

    return contato
}

function setContato(contato){
    const li = document.createElement('li')
    const p = document.createElement('p')
    p.innerHTML += `<p>${contato.nome}</p>`
    p.innerHTML += `${contato.contato}`
    li.appendChild(p)
    li.classList.add('li-contato')
    criaBtnEditar(li)
    criaBtnExcluir(li)
    return li
}

function editaContato(antigoContato){
    let inputNomeNovo = document.querySelector('.nome-novo')
    let inputContatoNovo = document.querySelector('contato-novo')
    antigoContato.nome = inputNomeNovo.value
    antigoContato.contato = inputContatoNovo.value
    criaContato(antigoContato)
    setContato(antigoContato)
}

function criaBtnExcluir(contato){
    const btnExcluir = document.createElement('button')
    btnExcluir.classList.add('btn')
    btnExcluir.classList.add('btn-danger')
    btnExcluir.classList.add('excluir')
    btnExcluir.innerText = 'Excluir'
    contato.appendChild(btnExcluir)
    return btnExcluir
}

function criaBtnEditar(contato){
    const btnEditar = document.createElement('button')
    btnEditar.classList.add('btn')
    btnEditar.classList.add('btn-warning')
    btnEditar.classList.add('editar')
    btnEditar.innerText = 'Editar'
    contato.appendChild(btnEditar)
    return btnEditar
}

function criaBtnSalvar(){
    const botaoSalvar = document.createElement('button')
    botaoSalvar.classList.add('btn')
    botaoSalvar.classList.add('btn-primary')
    botaoSalvar.classList.add('salvar')
    botaoSalvar.innerText = 'Salvar'
    return botaoSalvar
}

function criaDivConfirmacao() {
    const div = document.createElement('div')
        div.classList.add('div-confirmacao')
        const botaoSim = document.createElement('button')
        botaoSim.classList.add('botao-sim')
        botaoSim.classList.add('btn')
        botaoSim.classList.add('btn-light')
        botaoSim.innerText = 'Sim'
        const botaoNao = document.createElement('button')
        botaoNao.classList.add('botao-nao')
        botaoNao.classList.add('btn')
        botaoNao.classList.add('btn-light')
        botaoNao.innerText = 'Não'
        const mensagem = document.createElement('p')
        mensagem.innerText = 'Deseja realmente excluir este contato?'
        div.appendChild(mensagem)
        div.appendChild(botaoNao)
        div.appendChild(botaoSim)
        return div
}

function criaFormEdicao(){
    const form = document.createElement('form')
    form.classList.add('form-edicao')
    const inputNomeNovo = document.createElement('input')
    inputNomeNovo.classList.add('nome-novo')
    inputNomeNovo.setAttribute('placeholder','Novo nome')
    const inputContatoNovo = document.createElement('input')
    inputContatoNovo.classList.add('contato-novo')
    inputContatoNovo.setAttribute('placeholder','Novo número')
    const botaoSalvar = criaBtnSalvar()
    form.appendChild(inputNomeNovo)
    form.appendChild(inputContatoNovo)
    form.appendChild(botaoSalvar)
    return form
}

function limpaImput() {
    inputContato.value = ''
    inputNome.value = ''
    inputNome.focus()
}

function salvaLista() {
    let listaJSON = []

    for (let elemento of listaContatos){
        listaJSON.push(elemento)
    }

    let contatosJSON = JSON.stringify(listaJSON)
    console.log(contatosJSON)
    localStorage.setItem('contatos',contatosJSON)
}

function recuperaLista() {
    let contatos = localStorage.getItem('contatos')
    let contatosRecuperados = JSON.parse(contatos)

    for (let contato of contatosRecuperados){
        const item = setContato(contato)
        lista.appendChild(item)
    }
}

recuperaLista()