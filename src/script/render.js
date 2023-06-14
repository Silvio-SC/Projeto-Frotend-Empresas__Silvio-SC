import {requestAllCategorys, requestAllCompanies, findDepartment} from "./request.js"

export const urlBase = 'http://localhost:3333'

export const renderSelectIndex = (array) => {
    const select = document.getElementsByTagName('select')[0]

    array.forEach((obj) => {
        const option = document.createElement('option')

        option.innerText = obj.name
        option.value = obj.name

        select.appendChild(option)
    })
    return select
}

export const renderSelectAdmPage = (array) => {
    const select = document.getElementsByTagName('select')[0]

    array.forEach((obj) => {
        const option = document.createElement('option')

        option.innerText = obj.name
        option.value = obj.id

        select.appendChild(option)
    })
    return select
}

export const renderCategorysInIndex = async (array) => {
    const divHome = document.querySelector(".home__list")
    const categoryList = await requestAllCategorys()

    divHome.innerHTML = ''

    const h2 = document.createElement("h2")
    h2.innerText = 'Lista de Empresas'
    divHome.appendChild(h2)

    array.forEach((obj, i) => {
        const div = document.createElement("div")
        const h3 = document.createElement("h3")
        const span = document.createElement("span")

        categoryList.forEach(category => {
            if(category.id === obj.category_id) {
                span.innerText = category.name
            }
        })


        div.classList.add("home__card")
        span.classList.add("chip--blue")
        h3.innerText = obj.name

        div.append(h3, span)
        divHome.appendChild(div)
    })
}

export const renderUserProfile = async (user) => {
    const h2 = document.querySelector(".div-user > h2")
    const p = document.querySelector(".div-user > p")

    h2.innerText = user.name
    p.innerText = user.email
}

export const renderDepartmentInfo = (obj) => {
    const departmentName = document.querySelector(".div-employee__header > h2")
    const departmentEmployee = document.querySelector(".div-employee__cards")

    departmentName.innerText = `${obj.company.name} - ${obj.name}`
    departmentEmployee.innerHTML = ''

    let employees = obj.employees

    employees.forEach((employee) => {
        const div = document.createElement("div")
        const h3 = document.createElement("h3")

        h3.innerText = employee.name
        
        div.appendChild(h3)
        departmentEmployee.appendChild(div)
    })

}

export const renderDepartment = async (array) => {
    const allCompanies = await requestAllCompanies()
    const cards = document.querySelector(".department > .cards")
    const cardsEmpty = document.querySelector(".cards-empty")

    if(array.length === 0){
        cardsEmpty.classList.remove('hidden')
        cards.classList.add('hidden')
    }else {
        cardsEmpty.classList.add('hidden')
        cards.classList.remove('hidden')
    }

    cards.innerHTML = ''
    
    array.forEach((department) => {
        const divCard = document.createElement("div")
        const divInfo = document.createElement("div")
        const divBtn = document.createElement("div")
        const h3 = document.createElement("h3")
        const pDescription = document.createElement("p")
        const pCompany = document.createElement("p")
        const spanView = document.createElement("span")
        const spanEdit = document.createElement("span")
        const spanDelete = document.createElement("span")

        divCard.classList.add("card")
        spanView.classList.add("department__view")
        spanEdit.classList.add("department__edit")
        spanDelete.classList.add("department__delete")

        spanView.innerHTML = '<img src="../assets/icon/olho.svg" alt=""></img>'
        spanEdit.innerHTML = '<img src="../assets/icon/editar.svg" alt=""></img>'
        spanDelete.innerHTML = '<img src="../assets/icon/remover.svg" alt=""></img>'

        h3.innerText = department.name
        pDescription.innerText = department.description

        allCompanies.forEach((company) => {
            if(company.id === department.company_id){
                pCompany.innerText = company.name
            }
        })

        spanView.dataset.id = department.id
        spanEdit.dataset.id = department.id
        spanDelete.dataset.id = department.id

        divCard.append(divInfo, divBtn)
        divInfo.append(h3, pDescription, pCompany)
        divBtn.append(spanView, spanEdit, spanDelete)

        cards.appendChild(divCard)
    })
}

export const renderAllEmployeers = async (array) => {
    const allCompanies = await requestAllCompanies()
    const cards = document.querySelector(".registered-users > .cards")
    cards.innerHTML = ''

    array.forEach((employee) => {
        const divCard = document.createElement("div")
        const divInfo = document.createElement("div")
        const divBtn = document.createElement("div")
        const h3 = document.createElement("h3")
        const pCompany = document.createElement("p")
        const spanEdit = document.createElement("span")
        const spanDelete = document.createElement("span")

        divCard.classList.add("card")
        
        spanEdit.classList.add("registered-users__edit")
        spanDelete.classList.add("registered-users__delete")

        spanEdit.dataset.id = employee.id
        spanDelete.dataset.id = employee.id

        spanEdit.innerHTML = '<img src="../assets/icon/editar.svg" alt=""></img>'
        spanDelete.innerHTML = '<img src="../assets/icon/remover.svg" alt=""></img>'

        h3.innerText = employee.name
        allCompanies.forEach((company) => {
            if(company.id === employee.company_id){
                pCompany.innerText = company.name
            }
        })
        if (employee.company_id === null){
            pCompany.innerText = "Não contratado"
        }

        divCard.append(divInfo, divBtn)
        divInfo.append(h3, pCompany)
        divBtn.append(spanEdit, spanDelete)

        cards.appendChild(divCard)
    })
}

export const renderModalAllEmployeers = async (array) => {
    const allCompanies = await requestAllCompanies()
    const cards = document.querySelector(".modal__view-department__cards")
    cards.innerHTML = ''
    
    array.forEach((employee) => {
        const divCard = document.createElement("div")
        const h3 = document.createElement("h3")
        const p = document.createElement("p")
        const button = document.createElement("button")

        divCard.classList.add("modal-card")
        button.classList.add("button--action2-outline")

        button.innerText = 'Desligar'
        button.dataset.id = employee.id
        h3.innerText = employee.name
        allCompanies.forEach((company) => {
            if(company.id === employee.company_id){
                p.innerText = company.name
            }
        })
        if (employee.company_id === null){
            p.innerText = "Não contratado"
        }else {
            divCard.append(h3, p, button)
            cards.appendChild(divCard)
        }
    })
    
    return cards
}

export const renderModalView = async (obj) => {
    const dialog = document.getElementsByTagName('dialog')[1]

    const divModal = document.createElement('div')
    const span = document.createElement('span')
    const h2Department = document.createElement('h2')
    const h3Department = document.createElement('h3')
    const pDepartment = document.createElement('p')
    const divBtn = document.createElement('div')
    const btn = document.createElement('button')
    const select = document.createElement('select')
    const option = document.createElement('option')
    let divCards = document.createElement('div')    


    divModal.classList.add('modal__view-department')
    span.classList.add('close-btn')
    btn.classList.add('button--action1')
    divCards.classList.add('modal__view-department__cards')
    
    const department = obj
    span.innerHTML = '<img src="../assets/icon/close.svg">'
    h2Department.innerText = department.name
    h3Department.innerText = department.description
    pDepartment.innerText = department.company.name
    option.innerText = 'Selecionar usuário'
    btn.innerText = 'Contratar'
    divCards = await renderModalAllEmployeers(obj.employees)
     
    dialog.innerHTML = '' 

    select.appendChild(option)
    divBtn.append(select ,btn)
    divModal.append(span, h2Department, h3Department, divBtn, divCards)
    dialog.appendChild(divModal)
}

export const renderToast = (result, status, message) => {
    const divToast = document.querySelector('.toast')

    divToast.innerHTML = ''
    
    const div = document.createElement('div')
    const divTitle = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const img = document.createElement('img')

    h2.innerText = status

    if(message){
        p.innerText = message
    } else {
        p.innerText = ''
    }

    if(result === 'sucess'){
        img.src = '../assets/icon/sucess.svg'
        div.style.backgroundColor = '#36B37E'
    } else {
        img.src = '../assets/icon/error.svg'
        div.style.backgroundColor = '#FF5630'
    }

    divTitle.append(img, h2)
    div.append(divTitle, p)
    divToast.appendChild(div)
}

export const renderModalEdit = (obj) => {
    const dialog = document.getElementsByTagName('dialog')[2]

    const divModal = document.createElement('div')
    const span = document.createElement('span')
    const h2 = document.createElement('h2')
    const btn = document.createElement('button')
    const input = document.createElement('input') 


    divModal.classList.add('modal__edit-department')
    span.classList.add('close-btn')
    btn.classList.add('button--action1')
    
    input.type = "text"
    
    span.innerHTML = '<img src="../assets/icon/close.svg">'
    h2.innerText = 'Editar Departamento'
    input.value = obj.description
    btn.innerText = 'Salvar'
     
    dialog.innerHTML = '' 

    divModal.append(span, h2, input, btn)
    dialog.appendChild(divModal)
}