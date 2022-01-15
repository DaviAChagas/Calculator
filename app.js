const viewableButtons = document.querySelectorAll('.viewable')
const allClearButton = document.querySelector('.allClear')
const deleteButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equal')
const display = document.querySelector('.viewCurrentOperations')
const history = document.querySelector('.viewPreviousOperations')

let viewCurrentOperationContent = ""
let calculation, result, newCalculation
let operationsHistory = [], historyList

viewableButtons.forEach(button => {
    button.addEventListener('click', () => {

        if(button.classList.contains('numberButton') !== true) {
        viewCurrentOperationContent = viewCurrentOperationContent.concat(" ", button.value, " ")
        display.textContent = viewCurrentOperationContent
}

    if(button.classList.contains('numberButton')) {
        viewCurrentOperationContent = viewCurrentOperationContent.concat("", button.value)
        display.textContent = viewCurrentOperationContent
    }
    
   })
})


allClearButton.addEventListener('click', () => {
    viewCurrentOperationContent = " "
    operationsHistory = []

    display.textContent = viewCurrentOperationContent
    history.innerHTML = " "
})


deleteButton.addEventListener('click', () => {
    if(viewCurrentOperationContent[viewCurrentOperationContent.length - 1] === ' ') {
      viewCurrentOperationContent = viewCurrentOperationContent.slice(0, viewCurrentOperationContent.length - 2)
    }

    if(viewCurrentOperationContent[viewCurrentOperationContent.length - 1] !== ' ') {
        viewCurrentOperationContent = viewCurrentOperationContent.slice(0, viewCurrentOperationContent.length - 1)
}
display.textContent = viewCurrentOperationContent

})


equalButton.addEventListener('click', () => {
    calculation = viewCurrentOperationContent.split(' ')

    calculation = calculation.map(item => item === '×' ? '*' : item);
    calculation = calculation.map(item => item === '÷' ? '/' : item);
    calculation = calculation.map(item => item === '–' ? '-' : item);

    result = eval(calculation.join(' '))
    display.textContent = result

    operationsHistory.push(viewCurrentOperationContent)


    historyList = operationsHistory.join("<li>", "</li>")
    history.innerHTML = historyList

    
    newCalculation = String(result)
    viewCurrentOperationContent = newCalculation
})