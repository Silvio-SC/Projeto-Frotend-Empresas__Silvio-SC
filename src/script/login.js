import {requestLogin, requestUserProfile} from "./request.js"

const token = localStorage.getItem('KenzieEmpresas@token')
const verificationToken = () => {
    if(token){
        location.replace("./dashboard.html")
    }
}

const login = () => {
    const inputs = document.querySelectorAll("input") 
    const btn = document.querySelector('.login > .button--blue')
    let bodyLogin = {}

    btn.addEventListener('click', async () => {
        inputs.forEach((input) => {
            let name = input.name
            bodyLogin[name] = input.value.toLowerCase() 
        })
        await requestLogin(bodyLogin)
    })
}

const redictPages = () => {
    const btnRegister1 = document.querySelector('.header > div > .button--blue')
    const btnRegister2 = document.querySelector('.login >.button--outline')
    const btnHome = document.querySelector('.header > div > .button--outline')

    btnRegister1.addEventListener('click', () => {
        location.replace("./register.html")
    })

    btnRegister2.addEventListener('click', () => {
        location.replace("./register.html")
    })

    btnHome.addEventListener('click', () => {
        location.replace("../../index.html")
    })
}

login()
redictPages()
verificationToken()