const viewableButtons = document.querySelectorAll('.viewable')
const allClearButton = document.querySelector('.allClear')
const deleteButton = document.querySelector('.delete')
const equalButton = document.querySelector('.equal')
const display = document.querySelector('.viewCurrentOperations')

let viewCurrentOperationContent = " "
let result 

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
    display.textContent = viewCurrentOperationContent
})

deleteButton.addEventListener('click', () => {
    viewCurrentOperationContent = viewCurrentOperationContent.slice(0, viewCurrentOperationContent.length - 1)
    display.textContent = viewCurrentOperationContent
})

equalButton.addEventListener('click', () => {

    
})