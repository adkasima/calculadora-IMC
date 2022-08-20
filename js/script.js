import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { calculateIMC, notANumber } from './utils.js'
// variáveis

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

form.onsubmit = function (event) {
    event.preventDefault()

    const weight = inputWeight.value
    const height = inputHeight.value
    let state

    const weightOrheightIsNotANumber = notANumber(weight) || notANumber(height)

    if(weightOrheightIsNotANumber){
        AlertError.open()
        return;
    }

    const result = calculateIMC(weight, height)

    if(result < 18.5){
        state = 'Abaixo do peso'
    }else if(result <= 24.9){
        state = 'Peso ideal'
    }else if(result <= 29.9){
        state = 'Acima do peso'
    }else if(result <= 34.9){
        state = 'Obesidade grau 1'
    }else if(result <= 39.9){
        state = 'Obesidade grau 2 (severa)'
    }else if(result > 40.0){
        state = 'Obesidade grau 3 (mórbida)'
    }


    displayResultMessage(result, state)
    
}

function displayResultMessage(result, state){
    const message =  `Seu IMC é de ${result}`
    const desc = `Estado: ${state}`

    Modal.desc.innerText = desc
    Modal.message.innerText = message
    Modal.open()
}

inputHeight.oninput = () => AlertError.close()
inputWeight.oninput = () => AlertError.close()

