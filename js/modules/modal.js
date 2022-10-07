function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //когда закрывается модальное окно, пустая строка поджставляет параметр нужный автоматически
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden'; //когда открываем модальное окно, появляется стиль который не позволяет прокручивать страницу 

    // Если есть модал таймер ид, то только в таком случае запускать очистку таймера
    console.log(modalTimerId); //следить за модал тайм ид на всякий случай
    if (modalTimerId) {
        clearInterval(modalTimerId); // если пользователь уже открыл модалку то очищаем интервал, чтобы окно его не доставало
    }

}


function modal(triggerSelector, modalSelector, modalTimerId) {
    // MODAL

    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    // Когда в обработчик события передаем каллбэк функцию, мы не должны ее сразу вызывать, а должны ее просто объявить, она уже сама вызовется, когда будет произведен клик и только после него. Тут мы нарушаем этот принцип так как функция вызовется сразу же, когда страница загрузится - openModal(modalSelector)). Чтобы обойти это ограничение чаще всего создают стрелочную функцию, которая оборачивает нашу вызывающуюся функцию ('click', () => openModal(modalSelector));
    modalTrigger.forEach((i) => {
        i.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    // ФУНКЦИОНАЛ чтобы диалоговое окно закрывалось при нажатии на темную область

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == "") {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // закрытие модала по нажатию escape
            closeModal(modalSelector);
        }
    });



    // Функционал если пользователь дослитал страницу до конца, то показывать ему модальное окно

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) { //берем прокрутку справа и тот контент, который мы прямо сейчас видим и сравниваем с полной прокруткой (полным сайтом), как только они совпадают, значит что пользователь долистал страницу до конца, т.е. ПРОКРУЧЕННАЯ ЧАСТЬ + КДИЕНТ КОТОРЫЙ Я СЕЙЧАС ВИЖУ = ПОЛНОСТЬЮ ВСЕМУ САЙТУ; -1px стоит т.к. бывает баг что в некотых браузерах при прокрутке до конца модальное окно не покажется, поэтому как бы делаем -1 px до конца и окно покажется
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); // удаляем обработчик события, чтобы каждый раз не выскакивало., для этого нужно четко указать то событие которое хотим удалить и ту функцию , в нашем случае 'scroll', showModalByScroll
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    closeModal
};
export {
    openModal
};