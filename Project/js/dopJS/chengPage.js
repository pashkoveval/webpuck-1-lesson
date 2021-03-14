const btnDate = document.getElementById('date');
const btnTime = document.getElementById('time');
const DATEBLOCK = document.querySelector('.colendar-calc');
const TIMERBLOCK = document.querySelector('.timer');
const hidengElements = (el) => {
    el.style.display = "none";
};
const showengElements = (el) => {
    el.style.display = "flex";
};
btnTime.addEventListener('click', () => {
    hidengElements(DATEBLOCK);
    showengElements(TIMERBLOCK);
})
btnDate.addEventListener('click', () => {
    hidengElements(TIMERBLOCK);
    showengElements(DATEBLOCK);
})