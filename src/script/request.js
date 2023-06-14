import { renderToast } from "./render.js"

const urlBase = 'http://localhost:3333'

const token = localStorage.getItem('KenzieEmpresas@token')

export const requestAllCategorys = async () => {
    const categorys = await fetch(`${urlBase}/categories/readAll` , {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(async (res) => {
        if(res.ok) {
            const response = res.json()
            return response
        } 
    })

    return categorys
}

export const requestAllCompanies = async () => {
    const companies = await fetch(`${urlBase}/companies/readAll` , {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(async (res) => {
        if(res.ok) {
            const response = res.json()
            return response
        } 
    })

    return companies
}

export const requestSelectedCompanies = async (category) => {
    if(category === '') {
        return await requestAllCompanies()
    }
    const companies = await fetch(`${urlBase}/companies/readBycategory/${category}` , {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    }).then(async (res) => {
        if(res.ok) {
            const response = res.json()
            return response
        }else {
            return null
        }
    })

    return companies
}

export const requestLogin = async (bodyRequest) => {
    const tokenLogin = await fetch(`${urlBase}/auth/login`, {
        method: "POST", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(bodyRequest)
    }).then(async(res) => {
        const response = await res.json()
        if(res.ok){
            localStorage.setItem('KenzieEmpresas@token', response.authToken)
            renderToast('sucess', 'Concluido', 'Login feito com sucesso')
            setTimeout(() => {
                location.replace('./dashboard.html')
            }, 5100)
        } else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestRegister = async (bodyRequest) => {
    const register = await fetch(`${urlBase}/employees/create`, {
        method: "POST", 
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(bodyRequest)
    }).then(async(res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', "Registrado", 'Seu cadastro foi concluido com sucesso')
            setTimeout(() => {
                location.replace('./login.html')
            }, 5500)
        } else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestUserProfile = async () => {
    const user = await fetch(`${urlBase}/employees/profile`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return user
}

export const requestAllDepartment = async () => {
    const departments = await fetch(`${urlBase}/departments/readAll`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return departments
}

export const findDepartment = async (id) => {
    const department = await fetch(`${urlBase}/departments/readById/${id}`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return department
}

export const requestAllEmployeers = async () => {
    const Employeers = await fetch(`${urlBase}/employees/readAll`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return Employeers
}

export const requestCompaniesById = async (id) => {
    const Companie = await fetch(`${urlBase}/companies/readById/${id}`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return Companie
}

export const createDepartment = async (obj) => {
    const Department = await fetch(`${urlBase}/departments/create`, {
        method: "POST", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    }).then (async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })

    return Department
}

export const requestEmployeesOutOfWork = async () => {
    const Employees = await fetch(`${urlBase}/employees/outOfWork`, {
        method: "GET", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        return response
    })

    return Employees
}

export const requestHireEmployee = async (department_id , employee_id) => {
    const hire = await fetch(`${urlBase}/employees/hireEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({"department_id": department_id})
    }).then(async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestDismissEmployee = async (employee_id) => {
    const dismiss = await fetch(`${urlBase}/employees/dismissEmployee/${employee_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestUpdateDepartment = async (obj, department_id) => {
    const update = await fetch(`${urlBase}/departments/update/${department_id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    }).then (async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestDeleteDepartment = async (department_id) => {
    const DeleteDepartment = await fetch(`${urlBase}/departments/delete/${department_id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestUpdateEmployee = async (obj, employee_id) => {
    const update = await fetch(`${urlBase}/employees/updateEmployee/${employee_id}`, {
        method: "PATCH", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(obj)
    }).then (async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, 'Informações atualizadas com sucesso')
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}

export const requestDeleteEmployee = async (Employee_id) => {
    const deleteEmployee = await fetch(`${urlBase}/Employees/deleteEmployee/${Employee_id}`, {
        method: "DELETE", 
        headers: {
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then (async (res) => {
        const response = await res.json()
        if(res.ok){
            renderToast('sucess', res.status, response.message)
        }else {
            renderToast('error', res.status, response.message)
        }
    })
}