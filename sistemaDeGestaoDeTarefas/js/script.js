async function carregarTarefas() {
   try {
    const response = await fetch('http://localhost:3000/tarefas');
    const tarefas = await response.json();

    tarefas.forEach(tarefa => {
      adicionarTarefaNaInterface(tarefa);
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
  }
}

function adicionarTarefaNaInterface(tarefa) {
  let lista;

  if (tarefa.status === 'pendente') {
    lista = document.getElementById('lista-pendentes');
  } else if (tarefa.status === 'em progresso') {
    lista = document.getElementById('lista-em-progresso');
  } else if (tarefa.status === 'concluida') {
    lista = document.getElementById('lista-concluidas');
  }

  const item = document.createElement('li');
  item.textContent = `${tarefa.titulo}: ${tarefa.descricao}`;
  item.setAttribute('data-id',tarefa.id)
  const editarBtn = document.createElement('button');
  editarBtn.textContent = 'Editar';
  editarBtn.onclick = function() {
    editarTarefa(tarefa);
  };

  const excluirBtn = document.createElement('button');
  excluirBtn.textContent = 'Excluir';
  excluirBtn.onclick = function() {
    excluirTarefa(tarefa.id);
  };

  item.appendChild(editarBtn);
  item.appendChild(excluirBtn);

  lista.appendChild(item);
}

window.onload = function() {
  carregarTarefas();
}
async function excluirTarefa(tarefaId){
  try {
    const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}`,{
      method: 'DELETE',
    })
    if(response.ok){
      document.querySelector(`li[data-id="${tarefaId}"]`).remove()
    }else{
      console.error('Falha ao excluir a tarefa')
    }
  }catch(error){
    console.error('Erro ao excluir tarefa:',error)
  }
}
function editarTarefa(tarefa) {
  // Preenche os campos do formulário com os valores da tarefa
  document.getElementById('task-title').value = tarefa.titulo;
  document.getElementById('task-description').value = tarefa.descricao;
  document.getElementById('task-status').value = tarefa.status;

  // Adiciona um atributo ao formulário com o ID da tarefa que está sendo editada
  document.getElementById('task-form').setAttribute('data-edit-id', tarefa.id);
}

document.getElementById('task-form').addEventListener('submit', async function(ev) {
  ev.preventDefault();

  const titulo = document.getElementById('task-title').value;
  const descricao = document.getElementById('task-description').value;
  const status = document.getElementById('task-status').value;
  const editId = this.getAttribute('data-edit-id');  // Obtém o ID da tarefa a ser editada

  if (editId) {
    // Se houver um ID de edição, atualize a tarefa existente
    await atualizarTarefa(editId, { titulo, descricao, status });
  } else {
    // Caso contrário, adicione uma nova tarefa
    await adicionarTarefa({ titulo, descricao, status });
  }

  document.getElementById('task-form').reset();
  document.getElementById('task-form').removeAttribute('data-edit-id');  // Remove o ID de edição
});

document.getElementById('task-form').addEventListener('submit', async function(ev) {
  ev.preventDefault();

  const titulo = document.getElementById('task-title').value;
  const descricao = document.getElementById('task-description').value;
  const status = document.getElementById('task-status').value;

  await adicionarTarefa({ titulo, descricao, status });
  document.getElementById('task-form').reset();
});

async function adicionarTarefa(tarefa) {
  try {
    const response = await fetch('http://localhost:3000/tarefas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarefa)
    });

    const novaTarefa = await response.json();
    adicionarTarefaNaInterface(novaTarefa);
  } catch (error) {
    console.error('Erro ao adicionar tarefa:', error);
  }
}
async function atualizarTarefa(tarefaId, tarefa) {
  try {
    const response = await fetch(`http://localhost:3000/tarefas/${tarefaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tarefa)
    });

    if (response.ok) {
      const tarefaAtualizada = await response.json();
      atualizarTarefaNaInterface(tarefaAtualizada);
    } else {
      console.error('Falha ao atualizar a tarefa');
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
  }
}

function atualizarTarefaNaInterface(tarefa) {
  const item = document.querySelector(`li[data-id="${tarefa.id}"]`);
  if (item) {
    item.textContent = `${tarefa.titulo}: ${tarefa.descricao}`;

    // Recria os botões
    const editarBtn = document.createElement('button');
    editarBtn.textContent = 'Editar';
    editarBtn.onclick = function() {
      editarTarefa(tarefa);
    };

    const excluirBtn = document.createElement('button');
    excluirBtn.textContent = 'Excluir';
    excluirBtn.onclick = function() {
      excluirTarefa(tarefa.id);
    };

    // Remove os botões antigos e adiciona os novos
    item.innerHTML = '';
    item.appendChild(editarBtn);
    item.appendChild(excluirBtn);
  }
}
