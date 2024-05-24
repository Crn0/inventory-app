/* eslint-disable no-undef */
const button = document.querySelector('.add')
const fieldset = document.querySelector('.form-group')

let count = 0

button.addEventListener('click', () => {
    const label = document.createElement('label')
    const textArea = document.createElement('textarea');

    label.textContent = 'Description:'
    textArea.name = 'descriptions'
    textArea.setAttribute('id', `descriptions${count++}`)
    textArea.setAttribute('cols', '38');
    textArea.setAttribute('rows', '10');


    label.appendChild(textArea);
    fieldset.appendChild(label);
})