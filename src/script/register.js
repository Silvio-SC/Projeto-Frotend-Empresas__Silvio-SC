import { requestRegister } from "./request.js"

const token = localStorage.getItem('KenzieEmpresas@token')
const verificationToken = () => {
    if(token){
        location.replace("./dashboard.html")
    }
}

const redictPages = () => {
    const btnlogin = document.querySelector('.header > div > .button--blue')
    const btnRetorn = document.querySelector('.register >.button--outline')
    const btnHome = document.querySelector('.header > div > .button--outline')

    btnlogin.addEventListener('click', () => {
        location.replace("./login.html")
    })

    btnRetorn.addEventListener('click', () => {
        location.replace("./login.html")
    })

    btnHome.addEventListener('click', () => {
        location.replace("../../index.html")
    })
}

const register = () => {
    const inputs = document.querySelectorAll('.register__form > input')
    const btn = document.querySelector('.register > .button--blue')
    let bodyRegister = {}

    btn.addEventListener('click', async() => {
        inputs.forEach((input) => {
            let name = input.name
            bodyRegister[name] = input.value 
        })

        requestRegister(bodyRegister)
    })
}




register()
redictPages()
verificationToken()