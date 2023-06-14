import { renderSelectIndex, renderCategorysInIndex } from "./render.js" 
import {requestAllCategorys, requestAllCompanies, requestSelectedCompanies} from "./request.js"


export const getCategory = () => {
    const select = document.getElementsByTagName('select')[0]   

    select.addEventListener("change", async () => {
        let value = select.value
        let list = await requestSelectedCompanies(value)

        await renderCategorysInIndex(list)
    })

}

const redictLogin = () => {
    const btn = document.querySelector('.button--outline')

    btn.addEventListener('click', () => {
        location.replace("./src/pages/login.html")
    })
}
const redictRegister = () => {
    const btn = document.querySelector('.button--blue')

    btn.addEventListener('click', () => {
        location.replace("./src/pages/register.html")
    })
}



const AllCompaniesList = await requestAllCompanies()

renderSelectIndex(await requestAllCategorys())
renderCategorysInIndex(AllCompaniesList)
redictLogin()
redictRegister()
getCategory()