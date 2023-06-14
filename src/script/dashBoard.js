import { renderUserProfile, renderDepartmentInfo } from "./render.js"
import { requestUserProfile, findDepartment } from "./request.js"

const user = await requestUserProfile()
const department = await findDepartment(user.department_id)
const token = localStorage.getItem('KenzieEmpresas@token')

const verificationToken = () => {
    if(token){
        if(user.is_admin) {
            location.replace("./admPage.html")
        }
    } else {
        location.replace("../../index.html")
    }
}

const verificationDepartment = () => {
    const divEmployee = document.querySelector(".div-employee")
    const divEmpty = document.querySelector(".div-employee--empty")

    if(user.company_id === null){
        divEmployee.classList.add("hidden")
        divEmpty.classList.remove("hidden")
    } else {
        divEmployee.classList.remove("hidden")
        divEmpty.classList.add("hidden")

    }
}


const Logout = () => {
    const btn = document.querySelector(".header > div > .button--outline")
    btn.addEventListener('click', () => {
        localStorage.removeItem("KenzieEmpresas@token")
        location.replace("../../index.html")
    })
}

verificationToken()
Logout()
verificationDepartment()
renderUserProfile(user)
renderDepartmentInfo(department)