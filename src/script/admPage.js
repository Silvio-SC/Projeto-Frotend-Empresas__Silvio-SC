import { requestAllCompanies, requestAllDepartment, requestAllEmployeers, requestCompaniesById, requestUserProfile } from "./request.js"
import { renderSelectAdmPage, renderDepartment, renderAllEmployeers } from "./render.js" 
import { openModalCreate, openModalView, openModalEdit, openModalDelete, openModalEditEmployee, openModalDeleteEmployee } from "./modal.js" 

const token = localStorage.getItem('KenzieEmpresas@token')
const user = await requestUserProfile()

const verificationToken = () => {
    if(token){
        if(!user.is_admin) {
            location.replace("./dashboard.html")
        } else { }
    } else {
        location.replace("../../index.html")
    }
}

const renderCompaniesBySelect = async () => {
    const select = document.getElementsByTagName('select')[0]

    
    select.addEventListener('change', async () => {
        
        if(select.value === ''){
            await renderDepartment(AllDepartmentList)
        }else {
            const companie = await requestCompaniesById(select.value)
            await renderDepartment(companie.departments)
        }
    })
}

const Logout = () => {
    const btn = document.querySelector(".header > div > .button--outline")
    btn.addEventListener('click', () => {
        localStorage.removeItem("KenzieEmpresas@token")
        location.replace("../../index.html")
    })
}

const AllCompaniesList = await requestAllCompanies()
const AllDepartmentList = await requestAllDepartment()
const AllEmployeersList = await requestAllEmployeers()



verificationToken()
renderSelectAdmPage(AllCompaniesList)
await renderDepartment(AllDepartmentList)
await renderAllEmployeers(AllEmployeersList)
await renderCompaniesBySelect()
Logout()


openModalCreate()
openModalView()
openModalEdit()
openModalDelete(AllEmployeersList)
openModalEditEmployee()
openModalDeleteEmployee(AllEmployeersList)

