"use strict";

// import { forEach } from "core-js/core/array";
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
  const filterBtns = document.querySelectorAll(".reviews__filter-btn");
  const reviewsSection = new Section(getCard, ".reviews__list");

  function getCard(data) {
    const card = new Card(data);
    return card.generateCard();
  }

  function filterCards(evt) {
    const filter = evt.target.dataset.filter;
    let cards = [];

    switch (filter) {
      case "good":
        cards = reviews.filter((review) => review.rank > 3);
        break;
      case "neutral":
        cards = reviews.filter((review) => review.rank === 3);
        break;
      case "negative":
        cards = reviews.filter((review) => review.rank < 3);
        break;
      default:
        cards = reviews;
        break;
    }
    reviewsSection.setItems(cards);
    reviewsSection.renderItems();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", filterCards);
  });

  reviewsSection.setItems(reviews);
  reviewsSection.renderItems();
}
// reviews

// -- Попап c формой обратной связи -- //

const callBtns = document.querySelectorAll(".call-btn");
const popups = document.querySelectorAll(".popup");
const callbackPopup = document.querySelector(".popup_type_callback");
const popupCloseBtns = document.querySelectorAll(".popup__close-btn");
const body = document.querySelector(".page");
const ESCAPE_KEY = "Escape";
const callbackForm = document.querySelector(".callback__form");

function openPopup(popupEl) {
  popupEl.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscClose);
  ableScroll();
}

function closePopup(popupEl) {
  popupEl.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscClose);
  disableScroll();
  callbackForm.reset();
}

function handleEscClose(event) {
  if (event.key === ESCAPE_KEY) {
    const popup = document.querySelector(".popup_visible");
    closePopup(popup);
  }
}

function ableScroll() {
  body.classList.add("page_noscroll");
}

function disableScroll() {
  body.classList.remove("page_noscroll");
}

callBtns.forEach((button) => {
  button.addEventListener("click", () => {
    openPopup(callbackPopup);
  });
});

popupCloseBtns.forEach((button) => {
  button.addEventListener("click", (event) => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
      closePopup(popup);
    }
  });
});

// -- Попап c формой обратной связи -- //

// -- Попап с документами/проверкой кандидатов -- //

const docsPopupTrigger = document.querySelector(".span-accent_type_docs");
const docsPopup = document.querySelector(".popup_type_docs");

docsPopupTrigger.addEventListener("click", () => {
  openPopup(docsPopup);
});

const checkPopupTrigger = document.querySelector(".span-accent_type_check");
const checkPopup = document.querySelector(".popup_type_check");

checkPopupTrigger.addEventListener("click", () => {
  openPopup(checkPopup);
});

// -- Попап с пользовательским соглашением -- //

const privacyPopupTriggers = document.querySelectorAll(".callback__info");
const privacyPopup = document.querySelector(".popup_type_privacy");

privacyPopupTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    openPopup(privacyPopup);
  });
});


// -- Бургер меню -- //

const burgerBtn = document.querySelector(".header__burger");
const responseMenu = document.querySelector(".header__response-menu");

burgerBtn.addEventListener("click", handleBurgerMenu);

function handleBurgerMenu() {
  responseMenu.classList.toggle("header__response-menu_opened");
  burgerBtn.classList.toggle("header__burger_opened");
}