function renderTransference(financeData) {
  const finance = document.createElement('div')
  finance.classList.add('finance')
  finance.id = `finance-${financeData.id}`

  const name = document.createElement('span')
  name.classList.add('finance-list')
  name.textContent = financeData.name

  const value = document.createElement('span')
  value.classList.add('finance-value')
  value.textContent = financeData.value

  const id = document.createElement('span')
  id.classList.add('id')
  id.textContent = financeData.id

  const deleteButton = document.createElement('button')
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', async () => {
    await deleteFinance(financeData.id)
    finance.remove()
  })
  const editButton = document.createElement('button')
  editButton.textContent = 'edit'
  editButton.addEventListener('click',async ()=>{
     document.querySelector('#name').value = financeData.name
     document.querySelector('#value').value = financeData.value 
     document.querySelector('#id').value = financeData.id
     
     isEditing = true
     editingId = financeData.id
  })
  finance.append(name, value, id, deleteButton)
  document.querySelector("#transition").append(finance)
}

async function fetchFinance() {
  const finance = await fetch('http://localhost:3000/finances').then(res => res.json())
  finance.forEach(renderTransference)
}

document.querySelector('form').addEventListener('submit', async (ev) => {
  ev.preventDefault()

  const name = document.querySelector('#name').value
  const value = document.querySelector('#value').value
  const id = document.querySelector('#id').value

  const financeData = { id, name, value }
  renderTransference(financeData)

  const response = await fetch('http://localhost:3000/finances', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(financeData),
  })

  const savedFinance = await response.json()
  document.querySelector('form').reset()
})

async function deleteFinance(id) {
  await fetch(`http://localhost:3000/finances/${id}`, {
    method: 'DELETE',
  })
}
let isEditing = false
let editingId = null

if(isEditing){
  const response = await fetch(`http://localhost:3000/finances/${editing}`,{
    method: 'PUT',
    headers:{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(financeData),
  })

  const updateFinance= await response.json()

  document.querySelector(`finance-${editingId} .finance-list` .finance-list).textContent= updatedFinance.name
  document.querySelector(`#finance-${editingId} .finance-value`).textContent= updatedFinance.value

  isEditing = false
  editingId = null
}else{
  renderTransference(financeData)
  const response = await fetch('http://localhost:3000/finances',{
    method : 'POST',
    headers:{
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(financeData),
  })
  const savedFinace = await response.json()
}
document.querySelector('form').reset()

