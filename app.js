//consts that query HTML elements, like buttons and divs that works as displays
const viewableButtons = document.querySelectorAll('.viewable')
const allClearButton = document.querySelector('.allClear')
const deleteButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equal')
const display = document.querySelector('.viewCurrentOperations')
const history = document.querySelector('.viewPreviousOperations')

//viewCurrentOperationContent receives the values clicked by user
let viewCurrentOperationContent = ""
let calculation, result, newCalculation

let operationsHistory = [], historyList

//getNewOperators replace all the classic operators to js operators
let getNewOperators = () => {
    calculation = calculation.map(item => item === '×' ? '*' : item);
    calculation = calculation.map(item => item === '÷' ? '/' : item);
    calculation = calculation.map(item => item === '–' ? '-' : item);
    calculation = calculation.map(item => item === '%' ? '/100' : item);
}

let getHistoryContent = () => {
    //The operationsHistory is an array that accumulate the previous operations
    //The historyList takes the operationsHistory and transform in a String, wich each value inside a li element
    operationsHistory.push(viewCurrentOperationContent)

    historyList = operationsHistory.join("<li>", "</li>")
    history.innerHTML = historyList
}


//Shows in the display the value clicked by the user
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


//AllClear button clear the current operation and the history
allClearButton.addEventListener('click', () => {
    viewCurrentOperationContent = " "
    operationsHistory = []

    display.textContent = viewCurrentOperationContent
    history.innerHTML = " "
})

//Delete button delete the last digit in the viewCurrentOperationContent
deleteButton.addEventListener('click', () => {
//If the last digit is a space, the delete button delete the last 2 digits    
    if(viewCurrentOperationContent[viewCurrentOperationContent.length - 1] === ' ') {
      viewCurrentOperationContent = viewCurrentOperationContent.slice(0, viewCurrentOperationContent.length - 2)
    }

//If the last digit isn't a number, the delete button delete the last digit    
    if(viewCurrentOperationContent[viewCurrentOperationContent.length - 1] !== ' ') {
        viewCurrentOperationContent = viewCurrentOperationContent.slice(0, viewCurrentOperationContent.length - 1)
}
display.textContent = viewCurrentOperationContent

})

//Equal button returns the result of the operation and updates the history list
equalButton.addEventListener('click', () => {
    calculation = viewCurrentOperationContent.split(' ')

    getNewOperators() 

    result = eval(calculation.join(' '))
    display.textContent = result

    getHistoryContent()
    
    newCalculation = String(result)
    viewCurrentOperationContent = newCalculation
})