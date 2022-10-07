require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

// Объединяем файлы, заимпортировав их в главный
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {
    openModal
} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {
    // ЧТОБЫ МОДАЛЬНОЕ ОКНО ПОЯВЛЯЛОСЬ ЧЕРЕЗ ОПРЕДЕЛЕННЫЙ ПРОМЕЖУТОК ВРЕМЕНи
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
    // Вызываем эти функции
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-10-25');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    // в конце после сборки вебпаком не забыть изменить пути в индекс html со script.js на bundle.js
});

// После всего не забыть вызвать вебпак чтобы модули собрались