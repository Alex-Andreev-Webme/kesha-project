"use strict";

import "./index.css";
import "../utils/constants";
import Section from "../components/Section";
import { reviews, VALIDATION_SETTINGS } from "../utils/constants";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";

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
if (window.location.pathname.indexOf("reviews.html") != -1) {
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

// Попап c формой обратной связи

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
   disableScroll();
}

function closePopup(popupEl) {
   popupEl.classList.remove("popup_visible");
   document.removeEventListener("keydown", handleEscClose);
   ableScroll();
   callbackForm.reset();
   formOneValidator.clearValidation();
}

function handleEscClose(event) {
   if (event.key === ESCAPE_KEY) {
      const popup = document.querySelector(".popup_visible");
      closePopup(popup);
   }
}

// Отключаем скролл на бади
function disableScroll() {
   body.classList.add("page_noscroll");
}

function ableScroll() {
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

// Попап с документами/проверкой кандидатов

const docsPopupTrigger = document.querySelector(".span-accent_type_docs");
const docsPopup = document.querySelector(".popup_type_docs");

if (docsPopupTrigger) {
   docsPopupTrigger.addEventListener("click", () => {
      openPopup(docsPopup);
   });
}

const checkPopupTrigger = document.querySelector(".span-accent_type_check");
const checkPopup = document.querySelector(".popup_type_check");

if (checkPopupTrigger) {
   checkPopupTrigger.addEventListener("click", () => {
      openPopup(checkPopup);
   });
}

// Таб на странице «О нас»

const tabTitles = document.querySelectorAll(".about__question");

if (tabTitles) {
   tabTitles.forEach((item) => {
      item.addEventListener("click", () => {
         item.classList.toggle("about__question_opened");
         item.nextElementSibling.classList.toggle("about__answer_visible");
      });
   });
}

// Мобильное меню

const burgerBtn = document.querySelector(".header__burger");
const responseList = document.querySelector(".header__list-response");

if (burgerBtn) {
   burgerBtn.addEventListener("click", handleBurgerMenu);
}

function handleBurgerMenu() {
   burgerBtn.classList.toggle("header__burger_opened");
   responseList.classList.toggle("header__list-response_opened");
   if (
      burgerBtn.classList.contains("header__burger_opened") &&
      responseList.classList.contains("header__list-response_opened")
   ) {
      disableScroll();
   } else {
      ableScroll();
   }
}

// Валидация форм

const formOne = document.querySelector("#callback-form-1");
const formOneValidator = new FormValidator(VALIDATION_SETTINGS, formOne);

const formTwo = document.querySelector("#callback-form-2");
const formTwoValidator = new FormValidator(VALIDATION_SETTINGS, formTwo);

const formThree = document.querySelector("#callback-form-3");
const formThreeValidator = new FormValidator(VALIDATION_SETTINGS, formThree);

const currentPage = window.location.pathname;

switch (currentPage) {
   case "/services.html":
      formOneValidator.enableValidation();
      formTwoValidator.enableValidation();
      break;
   case "/reviews.html":
      formOneValidator.enableValidation();
      break;
   case "/vacancies.html":
      formOneValidator.enableValidation();
      break;
   case "/contacts.html":
      formOneValidator.enableValidation();
      formTwoValidator.enableValidation();
      break;
   case "/about.html":
      formOneValidator.enableValidation();
      break;
   default:
      formOneValidator.enableValidation();
      formTwoValidator.enableValidation();
      formThreeValidator.enableValidation();
      break;
}

// Валидация форм
