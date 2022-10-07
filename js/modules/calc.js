function calc() {
    // Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    // Если в локал сторадже есть какая то информация, то мы берем и помещаем ее в sex, если нет, то установим ее по умолчанию с заданными данными

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }
    // Если в локал сторадже есть какая то информация, то мы берем и помещаем ее в ratio, если нет, то установим ее по умолчанию с заданными данными
    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    // Функция инициализации калькулятора при первом открытии
    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass); // убираем класс актвиности всем элементам

            // Если элемент имеет тот же id что и в значении sex localStorage, то установить ему класс активности
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
            // Если значение data-ratio будет такое же что и в localStorage, то установить ему класс активности
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcTotal() {
        //  Условие - если хоть одно поле не заполнено (false) прекратить выполнение функции
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '___';
            result.style.fontSize = '18px';
            return;
        }
        // Условие - если выбран женский пол то считать по одной формуле, если мужской то по другой формуле
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    //  Функция по получению данных из статических элементов верстки (интенсивность активности)
    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector); // получили все дивы внутри родительского селектора

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                // проверяем если есть аттрибут data-ratio то берем значение этого аттрибута
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio'); // если в объекте события есть дата атрибут то его значение передаем в ratio (коэффициент)
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // записываем в localStorage значение ratio
                } else {
                    sex = e.target.getAttribute('id'); // если в объекте события есть идентификатор id то получаем его значение
                    localStorage.setItem('sex', e.target.getAttribute('id')); // записываем в localStorage значение sex
                }

                // Назначаем класс активности только нужному элементу
                elements.forEach(elem => {
                    elem.classList.remove(activeClass); // сначала убираем класс активности со всех элементов
                });

                e.target.classList.add(activeClass); // добавляем класс активности объекту события

                calcTotal(); // вызываем функцию пересчета каждый раз после изменения класса активности
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    //  Функция по получению данных из динамических элементов верстки (инпутов)
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector); // получаем селектор инпута


        input.addEventListener('input', () => {

            // Если в значении инпута вводятся не цифры то окрашиваем поле интпута в красный, иначе убираем окраску
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            // Проверяем если в инпуте есть идентификатор height то присваиваем height значение которое введено в инпуте
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal(); // вызываем функцию пересчета каждый раз после изменения инпута
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;