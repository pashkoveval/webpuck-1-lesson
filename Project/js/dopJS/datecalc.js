import {
    errorFunction
} from './errorMSG.js';
import {
    diffDates,
    diffToHTML
} from './diffDate.js';

const datecalcForm = document.getElementById('datecalc');
const datecalcFresalt = document.getElementById('datecalc__res');
datecalcForm.addEventListener('submit', handlCalcDates);

function handlCalcDates(event) {
    event.preventDefault();
    datecalcFresalt.innerHTML = '';
    let {
        firstDate,
        secondDate
    } = event.target.elements;
    firstDate = firstDate.value;
    secondDate = secondDate.value;

    if (firstDate && secondDate) {
        const result = diffDates(firstDate, secondDate);
        datecalcFresalt.innerHTML = diffToHTML(result);
    } else {
        datecalcFresalt.innerHTML = errorFunction('Все поля должны бить заполнены!');
    };



}