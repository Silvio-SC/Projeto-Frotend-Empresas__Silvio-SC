import { requestAllCompanies, createDepartment, findDepartment, requestEmployeesOutOfWork, requestHireEmployee, requestDismissEmployee, requestUpdateDepartment, requestDeleteDepartment, requestUpdateEmployee, requestDeleteEmployee } from "./request.js"
import { renderModalAllEmployeers, renderModalView, renderModalEdit } from "./render.js" 


const allCompanies = await requestAllCompanies()

export const openModalCreate = () => {
    const modal = document.getElementsByTagName('dialog')[0]
    const btn = document.querySelector('.department__title > button')

    btn.addEventListener('click', () => {
        modal.showModal()
        closeModal(0)
        renderSelectCreateModal()
        getModalCreate()
    })
}

const closeModal = (modalPosition) => {
    const modal = document.getElementsByTagName('dialog')[modalPosition]
    const btns = document.querySelectorAll('.close-btn')

    btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
                modal.close()
            })
    })
}

const getModalCreate = () => {
    const inputs = document.querySelectorAll('.modal__create-department > form > input')
    const select = document.querySelector('.modal__create-department > form > select')
    const btn = document.querySelector('.modal__create-department > .button--action1')
    const modal = document.getElementsByTagName('dialog')[0]
    
    btn.addEventListener('click', async () => {
        let info = {}
    
        inputs.forEach((input) => {
            let name = input.name
    
            info[name] = input.value
        })
        
        allCompanies.forEach((company) => {
            if(company.id === select.value){
                info.company_id = company.id
            }
        })
    
        await createDepartment(info)
        setTimeout(() => {
            location.reload()
            modal.close()
        }, 5200)        
    })
}

export const renderSelectCreateModal = async () => {
    const select = document.querySelector('.modal__create-department > form > select')

    select.innerHTML = ''

    const firstOption = document.createElement('option')
    firstOption.innerText = 'Selecionar empresa'
    select.appendChild(firstOption)
    
    allCompanies.forEach((obj) => {
        const option = document.createElement('option')

        option.innerText = obj.name
        option.value = obj.id

        select.appendChild(option)
    })
    return select
}

export const renderSelectViewModal = async () => {
    const select = document.querySelector('.modal__view-department > div > select')
    const employeesOutOfWork = await requestEmployeesOutOfWork()

    select.innerHTML = ''

    const firstOption = document.createElement('option')
    firstOption.innerText = 'Selecionar usuário'
    select.appendChild(firstOption)
    
    employeesOutOfWork.forEach((obj) => {
        const option = document.createElement('option')

        option.innerText = obj.name
        option.value = obj.id

        select.appendChild(option)
    })
    return select
}

const dismissEmployee = (department) => {
    const btns = document.querySelectorAll('.modal-card > .button--action2-outline')
    const modal = document.getElementsByTagName('dialog')[1]

    btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            await requestDismissEmployee(btn.dataset.id)
            modal.close()
        })
    })
}

const hireEmployee = (id) => {
    const btn = document.querySelector('.modal__view-department > div > .button--action1')
    const select = document.querySelector('.modal__view-department > div > select')
    const modal = document.getElementsByTagName('dialog')[1]

    btn.addEventListener('click', async () => {
        await requestHireEmployee(id, select.value)
        await renderSelectViewModal() 
        let department = await findDepartment(id)
        console.log(await renderModalAllEmployeers(department.employees))
    })
}

const updateDepartment = (department) => {
    const input = document.querySelector('.modal__edit-department > input')
    const btn = document.querySelector('.modal__edit-department > .button--action1')

    input.value = department.description
    let infoUpdate = {}

    btn.addEventListener('click', async () => {
        infoUpdate.description = input.value
        infoUpdate.name = department.name
        
        await requestUpdateDepartment(infoUpdate, department.id)
        setTimeout(() => {
            location.reload()
        }, 3000)
    })
}

const deleteDepartment = (department_id, department_name) => {
    const modal = document.getElementsByTagName('dialog')[3]
    const btn = document.querySelector('.modal__delete-department > .button--action2')
    const h2 = document.querySelector('.modal__delete-department > h2')
    h2.innerText = `Realmente deseja remover o Departamento ${department_name} e demitir seus funcionários?`;

    btn.addEventListener('click', async () => {
        await requestDeleteDepartment(department_id)
        modal.close()
        
        setTimeout(() => {
            location.reload()
        }, 5200)
    })
}

const updateEmployee = (employee_id) => {
    const inputs = document.querySelectorAll('.modal__edit-registered-users > form > input')
    const btn = document.querySelector('.modal__edit-registered-users > .button--action1')

    let infoUpdate = {}

    btn.addEventListener('click', async () => {
        inputs.forEach((input) => {
            let name = input.name
            if(input.value.trim() === ''){
                infoUpdate[name] = null
                return console.log("Preencha todos os campos")
            }else {
                infoUpdate[name] = input.value
            }
        })
        
        await requestUpdateEmployee(infoUpdate ,employee_id)
        setTimeout(() => {
            location.reload()
        }, 5200)
    })
}

const deleteEmployee = (employee_id, employeeName) => {
    const btn = document.querySelector('.modal__delete-registered-users > .button--action2')
    const h2 = document.querySelector('.modal__delete-registered-users > h2')
    h2.innerText = `Realmente deseja remover o usuário ${employeeName}?`;

    btn.addEventListener('click', async () => {
        await requestDeleteEmployee(employee_id)
        
        setTimeout(() => {
            location.reload()
        }, 5200)    
    })
}


export const openModalView = () => {
    const btnsView = document.querySelectorAll('.department__view')
    const modal = document.getElementsByTagName('dialog')[1]
    
    btnsView.forEach((btnView) => {
        btnView.addEventListener('click', async () => {
            modal.showModal()
            let department = await findDepartment(btnView.dataset.id)
            await renderModalView(department)
            await renderSelectViewModal()
            closeModal(1)
            
            hireEmployee(btnView.dataset.id)
            dismissEmployee(department)
        })
    })
}

export const openModalEdit = () => {
    const btns = document.querySelectorAll('.department__edit')
    const modal = document.getElementsByTagName('dialog')[2]
    
    btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            modal.showModal()
            
            let department = await findDepartment(btn.dataset.id)
            renderModalEdit(department)
            updateDepartment(department)
            closeModal(2)
        })
    })
}


export const openModalDelete = () => {
    const btns = document.querySelectorAll('.department__delete')
    const modal = document.getElementsByTagName('dialog')[3]
    
    btns.forEach((btn) => {
        btn.addEventListener('click', async () => {
            modal.showModal()
            closeModal(3)

            let department = await findDepartment(btn.dataset.id)
            deleteDepartment(department.id, department.name)
        })
    })
}

export const openModalEditEmployee = () => {
    const btns = document.querySelectorAll('.registered-users__edit')
    const modal = document.getElementsByTagName('dialog')[4]
    
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.showModal()
            closeModal(4)
            
            updateEmployee(btn.dataset.id)
        })
    })
}

export const openModalDeleteEmployee = (AllEmployeersList) => {
    const btns = document.querySelectorAll('.registered-users__delete')
    const modal = document.getElementsByTagName('dialog')[5]
    
    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.showModal()
            closeModal(5)
            let name = ''
            AllEmployeersList.forEach((employee) => {
                if(employee.id === btn.dataset.id){
                    name = employee.name
                }
            })
            
            deleteEmployee(btn.dataset.id, name)
        })
    })
}

