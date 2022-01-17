//consts that query HTML elements, like buttons and divs that works as displays
const viewableButtons = document.querySelectorAll('.viewable')
const allClearButton = document.querySelector('.allClear')
const deleteButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equal')
const display = document.querySelector('.viewCurrentOperations')
const history = document.querySelector('.viewPreviousOperations')
const moreOrLess = document.querySelector('.moreOrLess')
const trigonometricButtons = document.querySelectorAll('.trigonometric')

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

//returns the squareroot value of the next value in the calculation array
//It takes the next value as a argument and delete value in the position
let squareRootValue = () => {
    let squareRoot = (index) => {
        let squareRootValue = `${Math.sqrt(calculation[++index])}`

        calculation.splice(index, 1);
        return squareRootValue
    }

    calculation = calculation.map((item, index) => item === '√' ? squareRoot(index): item);
}


let getTrigonometricValue = () => {

    let getRadiansValue = (index) => {      
        let radians = calculation[++index] * (Math.PI / 180)
        calculation.splice(index);

        return radians
    }

    calculation = calculation.map((item, index) => item === 'sin' ? 
    `${Math.sin(getRadiansValue(index))}`: item);

    calculation = calculation.map((item, index) => item === 'cos' ?
    `${Math.cos(getRadiansValue(index))}`: item);

    calculation = calculation.map((item, index) => item === 'tan' ?
    `${Math.tan(getRadiansValue(index))}`: item);

    console.log(calculation)
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
        updateScreen(viewCurrentOperationContent)
}

    if(button.classList.contains('numberButton')) {
        viewCurrentOperationContent = viewCurrentOperationContent.concat("", button.value)
        updateScreen(viewCurrentOperationContent)
    }
    
   })
})


//AllClear button clear the current operation and the history
allClearButton.addEventListener('click', () => {
    viewCurrentOperationContent = " "
    operationsHistory = []

    updateScreen(viewCurrentOperationContent)
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
updateScreen(viewCurrentOperationContent)

})


//Add a (–) in last value, alternating between positive and negative
moreOrLess.addEventListener('click', () => {
    let viewCurrentArrayContent = viewCurrentOperationContent.split(' ')
    let lastIndex = (viewCurrentArrayContent.length) - 1

    viewCurrentArrayContent[lastIndex] = - (viewCurrentArrayContent[lastIndex])
    viewCurrentOperationContent = viewCurrentArrayContent.join(' ')

    updateScreen(viewCurrentOperationContent)
})

//This function updates the calculator's display
let updateScreen = content => {
    return display.textContent = content
}


//Equal button returns the result of the operation and updates the history list
equalButton.addEventListener('click', () => {
    calculation = viewCurrentOperationContent.split(' ')

    getNewOperators() 
    squareRootValue()
    getTrigonometricValue()
    
    result = eval(calculation.join(' '))
    updateScreen(result)
    
    getHistoryContent()
    
    newCalculation = String(result)
    viewCurrentOperationContent = newCalculation
})