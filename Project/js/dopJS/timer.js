let intervalHandle;
let secondsRemaining;

function errorHide() {
    document.getElementById("errorMessage").style.display = "none";
}

function resetPage() {
    // обнуление таймера
    document.getElementById("timerClock").innerHTML = `00:00`;    
    //показываем ввод
    document.getElementById("inputArea").style.display = "flex";
    //спрятаная кнопка паузы
    document.getElementById("pauseArea").style.display = "none";
    //спрятаная кнопка продолжить
    document.getElementById("resumeArea").style.display = "none";
    //спрятаная кнопка обновить
    document.getElementById("refresh").style.display = "none";
    //обнуление
    document.getElementById("minutes").value = "";
    setTimeout(errorHide, 10000);
}

function resumeCountdown() {
    tick();
    intervalHandle = setInterval(tick, 1000);
    //прячем продолжить
    document.getElementById("resumeArea").style.display = "none";
    //показ паузы
    document.getElementById("pauseArea").style.display = "flex";
    return;
}

function pauseCountdown() {
    clearInterval(intervalHandle);
    document.getElementById("pauseArea").style.display = "none";
    document.getElementById("resumeArea").style.display = "flex";
    return;
}

function tick() {
    let timeDisplay = document.getElementById("timerClock");

    let min = Math.floor(secondsRemaining / 60);
    let sec = secondsRemaining - (min * 60);

    if (min < 10) {
        min = "0" + min;
    }

    if (sec < 10) {
        sec = "0" + sec;
    }

    let message = min + ":" + sec;
    timeDisplay.innerHTML = message;

    if (secondsRemaining === 0) {
        document.getElementById("errorMessage").innerHTML = "<strong>БРРРРРР!</strong>";
        document.getElementById("errorMessage").setAttribute("class", "alert alert-success text-center");
        clearInterval(intervalHandle);
        resetPage();
    }
    secondsRemaining--;
}

function startCountdown() {
    let minutes = document.getElementById("minutes").value;

    //проверка на число
    if (isNaN(minutes) || minutes == "") {
        document.getElementById("errorMessage").innerHTML = "Хорошая попытка но я понимаю только цифры=). <strong>Попробуй снова=)</strong>";
        //прячит ошибку через 10 сек.
        setTimeout(errorHide, 10000);
        resetPage();
        return;
    }
    //получаем секунды
    secondsRemaining = minutes * 60;
    //рекурсия
    intervalHandle = setInterval(tick, 1000);
    //прячем input
    document.getElementById("inputArea").style.display = "none";
    //показываем паузу
    document.getElementById("pauseArea").style.display = "flex";
    //показываем сброс
    document.getElementById("refresh").style.display = "flex";
}
//обновление сраницы
document.getElementById("refresh").onclick = function () {
    resetPage();
    clearInterval(intervalHandle);
}
window.onload = function () {
    //кнопка старт
    let startButton = document.getElementById("breakBtn");
    startButton.onclick = function () {
        startCountdown();
    };
    //кнопка паузы
    let pauseButton = document.getElementById("pauseBtn");
    pauseButton.onclick = function () {
        pauseCountdown();
    };

    //кнопка продолжить
    let resumeButton = document.getElementById("resumeBtn");
    resumeButton.onclick = function () {
        resumeCountdown();
    };
    document.getElementById("inputArea").appendChild(startButton);
    document.getElementById("pauseArea").appendChild(pauseButton);
    document.getElementById("resumeArea").appendChild(resumeButton);

    //спрятаная кнопка паузы
    document.getElementById("pauseArea").style.display = "none";
    //спрятаная кнопка продолжить
    document.getElementById("resumeArea").style.display = "none";
    //спрятаная кнопка сброса
    document.getElementById("refresh").style.display = "none";
};