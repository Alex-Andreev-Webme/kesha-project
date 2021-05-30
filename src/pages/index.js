"use strict";

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
const popup = document.querySelector('.popup')
const popupCloseBtns = popup.querySelectorAll('.popup__close-btn')
const body = document.querySelector('.page')
const ESCAPE_KEY = 'Escape'

function openPopup(popupEl) {
  popupEl.classList.add('popup_visible')
  document.addEventListener('keydown', handleEscClose)
  switchScroll()
}

function closePopup(popupEl) {
  popupEl.classList.remove('popup_visible')
  document.removeEventListener('keydown', handleEscClose)
  switchScroll()
}

function handleEscClose(event) {
  if (event.key === ESCAPE_KEY) {
    closePopup(popup)
  }
}

function switchScroll() {
  body.classList.toggle('page_noscroll')
}

callBtns.forEach((button) => {
  button.addEventListener('click', () => {
    openPopup(popup)
  })
})

popupCloseBtns.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(popup)
  })
})

popup.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('popup') || event.target.classList.contains('popupCloseBtns')) {
    closePopup(popup)
  }
})

// -- Попап c формой обратной связи -- //