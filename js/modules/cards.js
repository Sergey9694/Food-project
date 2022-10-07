import {
    getResource
} from '../services/services';

function cards() {
    // Используем классы для карточек

    //1) Понадобиться src для каждой картинки (путь по которому будем получать изображения), кроме того понадобится альтернативный текст если картинка както сломалась
    // 2) Тайтл (заголовок)
    // 3) Описание
    // 4) Цена
    // 5) метод конвертации в валюту

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector); // получаем родителя куда все это будем пихать
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() { // нужно создать Элемент, в него поместиьт верстку, дополнить данными которые приходят как элементы и поместить элемент на страницу
            const element = document.createElement('div'); // создали элемент в скрипте
            element.innerHTML = `
                <div class="menu__item">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>
                `; // создаем новый блок верстки
            this.parent.append(element); // вставляем элемент на страницу
        }
    }



    // Стандартный способ создания экземпляра 
    // const div = new MenuCard();
    // div.render();

    // АЛЬТЕРНАТИВНЫЙ СПОСОБ (ФИШКА)
    // Чтобы использовать объект НА МЕСТЕ (т.е. он вызовется 1 раз и потом удалится)

    // ПОЛУЧАЕМ МАССИВ который содержит меню(массив с объектами), перебираем его и объект внутри деструктуризируем по отдельным частям, эти же части передаем во внутрь конструктора, который создает новую карточку на странице и рендерит ее

    // 1-ый ВАРИАНТ СОЗДАНИЯ ДИНАМИЧ ЭЛ-тОВ


    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
}

export default cards;