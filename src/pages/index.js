"use strict";

// import { forEach } from "core-js/core/array";
import "./index.css";

// -- Плавная прокрутка до элемента --
const header = document.querySelector(".header");
const anchors = document.querySelectorAll('.header a[href^="#"]');

// Цикл по всем ссылкам
for (let anchor of anchors) {
  anchor.addEventListener("click", function (evt) {
    evt.preventDefault(); // Предотвратить стандартное поведение ссылок
    // Атрибут href у ссылки, если его нет то перейти к body (наверх не плавно)
    const goto = anchor.hasAttribute("href")
      ? anchor.getAttribute("href")
      : "body";
    // Плавная прокрутка до элемента с i d = href у ссылки
    const gotoBlock = document.querySelector(goto);
    const gotoBlockValue =
      gotoBlock.getBoundingClientRect().top + pageYOffset - header.offsetHeight;
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth",
    });
  });
}
// -- Плавная прокрутка до элемента --

// -- Обработка сабмита формы --
function getInputValues(evt) {
  const inputValues = {}
  const form = evt.target.closest('.callback__form')
  const inputList = form.querySelectorAll('.callback__form-field')

  inputList.forEach((input) => {
    inputValues[input.name] = input.value
  })

  return inputValues
}

function sendData(data) {
  return fetch(`http://localhost:3000/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
}

function submitHandle(evt) {
  const data = getInputValues(evt)
  console.log(data)

  sendData(data)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
}

const buttons = document.querySelectorAll('.callback__submit-btn')

buttons.forEach(btn => {
  btn.addEventListener('click', evt => {
    evt.preventDefault()
    submitHandle(evt)
  })
})
// -- Обработка сабмита формы --

// -- Попап c формой обратной связи -- //

const callBtns = document.querySelectorAll('.call-btn')
const popups = document.querySelectorAll('.popup')
const popupCallback = document.querySelector('.popup_type_callback')
const popupCloseBtns = document.querySelectorAll('.popup__close-btn')
const body = document.querySelector('.page')
const ESCAPE_KEY = 'Escape'

function openPopup(popupEl) {
  popupEl.classList.add('popup_visible')
  document.addEventListener('keydown', handleEscClose)
  ableScroll()
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_visible')
  document.removeEventListener('keydown', handleEscClose)
  disableScroll()
}

function handleEscClose(event) {
  if (event.key === ESCAPE_KEY) {
    const popup = document.querySelector('.popup_visible')
    closePopup(popup)
  }
}

function ableScroll() {
  body.classList.add('page_noscroll')
}

function disableScroll() {
  body.classList.remove('page_noscroll')
}

callBtns.forEach((button) => {
  button.addEventListener('click', () => {
    openPopup(popupCallback)
  })
})

popupCloseBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    const popup = event.target.closest('.popup')
    closePopup(popup)
  })
})

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(popup)
    }
  })
})

// -- Попап c формой обратной связи -- //

// -- Попап с документами/проверкой кандидатов -- //

const docsPopupTrigger = document.querySelector('.span-accent_type_docs')
const docsPopup = document.querySelector('.popup_type_docs')

docsPopupTrigger.addEventListener('click', () => {
  openPopup(docsPopup)
})

// -- Попап с документами/проверкой кандидатов -- //