//consts that query HTML elements, like buttons and divs that works as displays
const html = document.querySelector('html')
const checkBox = document.querySelector('input[name=theme]')
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


//Swicth Mode algorithm (White -> Dark)
let getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)


let whiteMode = {
    bg: getStyle(html, '--bg'),
    top: getStyle(html, '--top'),
    operation: getStyle(html, '--operation'),
    fontColor: getStyle(html, '--fontColor'),
    boxShadow: getStyle(html, '--boxShadow'),
    boxShadowActivated: getStyle(html, '--boxShadowActived'),
    boxShadowHover: getStyle(html, '--boxShadowHover'),
    boxShadowPreviousOperations: getStyle(html, '--boxShadowPreviousOperations')

}

let darkMode = {
    bg: '#1F1F1F',
    top: '#262626',
    operation: '#13141A',
    fontColor: '#E3EDF7',
    boxShadow: '4px 4px 8px rgba(6, 6, 6, 0.4), -4px -4px 8px #2E2E2E',
    boxShadowActivated: 'inset 4px 4px 8px rgba(6, 6, 6, 0.4), inset -4px -4px 8px #252525',
    boxShadowHover: '4px 4px 8px rgba(6, 6, 6, 0.4), -4px -4px 8px #383636',
    boxShadowPreviousOperations: 'inset 4px 4px 8px rgba(6, 6, 6, 0.25), inset -4px -4px 8px rgba(54, 53, 53, 0.25)'
}

let transformKey = key => `--${key}`


let darkModeActivated = false
document.querySelector('img').addEventListener('click', (e) => {
    darkModeActivated = darkModeActivated === false ? true : false

    darkModeActivated ?
    e.target.src = 'icons/whiteModeMoon.svg': 
    e.target.src = 'icons/darkModeMoon.svg'

    
}) 

let changeColors = (colors) => {
    Object.keys(colors).map(key => 
        html.style.setProperty(transformKey(key), colors[key]) 
    )
}


checkBox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors(whiteMode)
})

//End of swicth mode algorithm


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