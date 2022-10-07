function timer(id, deadline) {
    //Timer

    // функция которая будет определять разницу между дедлайном и нашим текущим временем

    function getTimeRemaining(endtime) {

        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date()); // получаем количество миллисекунд которое будет в нашем конечном времени (до которого нам нужно дойти,досчитать)

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            // ДАлее эту разницу которую мы получаем в строке 57 необходимо превратить в количество дней часов минут и сек
            days = Math.floor(t / (1000 * 60 * 60 * 24)), // общее количество дней до конца таймера
                hours = Math.floor((t / (1000 * 60 * 60) % 24)), //общее количество часов до конца таймера
                minutes = Math.floor((t / 1000 / 60) % 60), //общее количество минут до конца таймера
                seconds = Math.floor((t / 1000) % 60); //общее количество минут до конца таймера
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // функция помощник, -чтобы ставился 0 перед цифрой до 10 в таймере
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // функция установки нашего таймера на страницу

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock(); //запускаем функции здесь чтобы при запуске страницы таймер не ждал 1 секунду и не было мигания цифр (сначала появляются цифры из верстки а потом актуальный таймер)

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;