"use strict";

import "./index.css";
import "../utils/constants";
import Section from "../components/Section";
import { reviews } from "../utils/constants";
import Card from "../components/Card";

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
function getInputValues(form) {
  const inputValues = {};
  const inputList = form.querySelectorAll(".callback__form-field");

  inputList.forEach((input) => {
    inputValues[input.name] = input.value;
  });

  return inputValues;
}

function sendData(data) {
  // return fetch(`http://localhost:5000/api/send`, {
  return fetch(`http://84.38.180.241/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function submitHandle(evt) {
  const form = evt.target.closest(".callback__form");
  const data = getInputValues(form);

  sendData(data)
    .then((res) => {
      if (res.ok) {
        form.reset();
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
    .catch((err) => console.log(err));
}

const buttons = document.querySelectorAll(".callback__submit-btn");

buttons.forEach((btn) => {
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    submitHandle(evt);
  });
});
// - Обработка сабмита формы -

// reviews
if (window.location.pathname === "/reviews.html") {
  function getCard(data) {
    const card = new Card(data);
    return card.generateCard();
  }

  const reviewsSection = new Section(getCard, ".reviews__list");

  reviewsSection.setItems(reviews);
  reviewsSection.renderItems();
}
// reviews
