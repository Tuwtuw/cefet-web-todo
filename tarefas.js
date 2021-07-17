class Tarefa {
    constructor(nome, categoria, realizada){
        this.nome = nome;
        this.categoria = categoria;
        this.realizada = realizada;
    }

    adicionaNaPagina(containerEl){
        const tarefaToDo = document.createElement('li');
        
        tarefaToDo.classList.add('item-tarefa', `categoria-${this.categoria}`);
        this.realizada ? tarefaToDo.classList.add('marcado'):null;

        const nomeTarefa = document.createTextNode(this.nome);
        tarefaToDo.appendChild(nomeTarefa);
        containerEl.appendChild(tarefaToDo);

        tarefaToDo.addEventListener( 'click',
            (evt) => {
                evt.currentTarget.classList.toggle('marcado');
            }
        )
    }
}

const tarefas = [ new Tarefa('Comprar Leite', 'compras', false), new Tarefa('Escutar Chimbinha', 'lazer', true)];

const listaTarefasEl = document.querySelector('#lista-tarefas');
listaTarefasEl.innerHTML = '';
tarefas.map((tarefa) => {tarefa.adicionaNaPagina(listaTarefasEl)});

//--------------------------------- // -----------------------------------------

const botaoAdicionarEl = document.querySelector('#incluir-nova-tarefa');
const selectCategoriaEl = document.querySelector('#nova-tarefa-categoria');
const campoNomeTarefaEl = document.querySelector('#nova-tarefa-nome');

function adicionaNovaTarefa(){
    const nomeTarefa = campoNomeTarefaEl.value;
    const categoriaTarefa = selectCategoriaEl.value;
    
    const novaTarefa = new Tarefa(nomeTarefa, categoriaTarefa, false);
    tarefas.push(novaTarefa);
    novaTarefa.adicionaNaPagina(listaTarefasEl);

    campoNomeTarefaEl.value = '';
    campoNomeTarefaEl.focus();
}


botaoAdicionarEl.addEventListener('click', adicionaNovaTarefa);
campoNomeTarefaEl.addEventListener('keyup', (evt) => {evt.key === 'Enter'? adicionaNovaTarefa():null});

//--------------------------------- // -----------------------------------------


const filtroCategoriaEl = document.querySelector('#filtro-de-categoria');

filtroCategoriaEl.addEventListener('change', () => {
    const tarefasEl = document.querySelectorAll('.item-tarefa');

    tarefasEl.forEach((tarefa) => tarefa.classList.remove('retido-no-filtro'));
    if(filtroCategoriaEl.value !== '')
        Array.from(tarefasEl).filter((tarefa) => {
            //Se possuir a classe categoria-Filtro adiciona o filtro
            let filtered = true;
            //Itera pelas classes do elemento em busca de categoria-{filtro}
            tarefa.classList.forEach((classeTarefa) => { classeTarefa === `categoria-${filtroCategoriaEl.value}` ? filtered=false:null})
            return filtered;
        }).forEach((x) => x.classList.add('retido-no-filtro'));
});

