export default class Card {
   constructor(card) {
      this._card = card;
   }

   _getTemplate() {
      return document
         .querySelector(".review-template")
         .content.querySelector(".reviews__item")
         .cloneNode(true);
   }

   _getFio() {
      const lastName = this._card.lastName ? this._card.lastName[0] + "." : "";
      return this._card.firstName + " " + lastName;
   }

   generateCard() {
      this._element = this._getTemplate();

      this._element.querySelector(".reviews__name").textContent =
         this._getFio();
      // this._element.querySelector(".reviews__rank").textContent =
      //   "Оценка " + this._card.rank;
      this._element.querySelector(".reviews__date").textContent =
         this._card.created;

      this._element.querySelector(".reviews__text").textContent =
         this._card.text;

      this._element.querySelector(".reviews__answer").textContent =
         this._card.answer;

      return this._element;
   }
}
